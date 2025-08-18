// app/api/owncloud/stream/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BASE = process.env.OWNCLOUD_BASE_URL!;
const TOKEN = process.env.OWNCLOUD_SHARE_TOKEN!;
const PASS  = process.env.OWNCLOUD_SHARE_PASSWORD ?? "";
const ROOT  = process.env.OWNCLOUD_SHARE_ROOT ?? "";

const WEBDAV_ROOT = `${BASE.replace(/\/+$/, "")}/public.php/webdav`;

function authHeader() {
  const cred = Buffer.from(`${TOKEN}:${PASS}`).toString("base64");
  return `Basic ${cred}`;
}

function joinDavPath(...parts: string[]) {
  const p = parts
    .filter(Boolean)
    .map(s => s.replace(/^\/+|\/+$/g, ""))
    .join("/");
  return p ? `/${p}` : "";
}

// Stream with Range passthrough so <video>/<audio> can seek.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path") ?? "";
  if (!path) {
    return NextResponse.json({ error: "Missing ?path" }, { status: 400 });
  }
  const davPath = joinDavPath(ROOT, decodeURIComponent(path));

  // Pass through Range header if present
  const range = req.headers.get("range") ?? undefined;

  const upstream = await fetch(`${WEBDAV_ROOT}${davPath}`, {
    method: "GET",
    headers: {
      Authorization: authHeader(),
      ...(range ? { Range: range } : {}),
    },
  });

  if (!upstream.ok && upstream.status !== 206) {
    // ownCloud returns 206 for partial content when Range is used.
    const msg = await upstream.text();
    return NextResponse.json(
      { error: `WebDAV error ${upstream.status}`, detail: msg.slice(0, 500) },
      { status: upstream.status }
    );
  }

  // Build response with important streaming headers
  const headers = new Headers();
  for (const [k, v] of upstream.headers.entries()) {
    if (/^(content-|last-modified|etag|accept-ranges|content-range)/i.test(k)) {
      headers.set(k, v);
    }
  }

  // Make sure it renders inline in the browser
  if (!headers.has("Content-Disposition")) {
    const filename = decodeURIComponent(path.split("/").pop() || "file");
    headers.set("Content-Disposition", `inline; filename*=UTF-8''${encodeURIComponent(filename)}`);
  }

  // Helpful cache (tune as you prefer)
  if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "public, max-age=300");
  }

  // Pass through 206 Partial Content when seeking
  const status = upstream.status === 206 ? 206 : 200;
  return new NextResponse(upstream.body, { headers, status });
}
