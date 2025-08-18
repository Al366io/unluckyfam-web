// src/app/api/owncloud/download/route.ts
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

// ✅ Must be a NAMED export called GET (or POST/PUT/etc)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path") ?? "";
    if (!path) {
      return NextResponse.json({ error: "Missing ?path" }, { status: 400 });
    }

    const davPath = joinDavPath(ROOT, decodeURIComponent(path));
    const upstream = await fetch(`${WEBDAV_ROOT}${davPath}`, {
      headers: { Authorization: authHeader() },
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      return NextResponse.json(
        { error: `WebDAV error ${upstream.status}`, detail: text.slice(0, 500) },
        { status: upstream.status }
      );
    }

    const headers = new Headers();
    for (const [k, v] of upstream.headers.entries()) {
      if (/^(content-|last-modified|etag)/i.test(k)) headers.set(k, v);
    }
    // To force downloads instead of inline, uncomment:
    // headers.set("Content-Disposition", `attachment; filename="${encodeURIComponent(path.split("/").pop() || "file")}"`);

    return new NextResponse(upstream.body, { headers });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
