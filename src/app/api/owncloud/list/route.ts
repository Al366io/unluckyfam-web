// app/api/owncloud/list/route.ts
import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    // optional subpath relative to ROOT (URL-encoded on the client)
    const sub = searchParams.get("path") ?? "";
    const davPath = joinDavPath(ROOT, decodeURIComponent(sub));

    const propfind = `<?xml version="1.0"?>
      <d:propfind xmlns:d="DAV:">
        <d:prop>
          <d:displayname/>
          <d:getcontentlength/>
          <d:getcontenttype/>
          <d:resourcetype/>
          <d:getlastmodified/>
          <d:getetag/>
        </d:prop>
      </d:propfind>`;

    const res = await fetch(`${WEBDAV_ROOT}${davPath}`, {
      method: "PROPFIND",
      headers: {
        Depth: "1",
        Authorization: authHeader(),
        "Content-Type": "application/xml",
      },
      body: propfind,
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `WebDAV error ${res.status}`, detail: text.slice(0, 500) },
        { status: res.status }
      );
    }

    const xml = await res.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      removeNSPrefix: true,
    });
    const data = parser.parse(xml);

    const responses = data?.multistatus?.response ?? [];
    const items = (Array.isArray(responses) ? responses : [responses])
      .map((r: any) => {
        const href: string = r.href;
        const prop = r?.propstat?.[0]?.prop ?? {};
        const isDir = !!prop?.resourcetype?.collection;
        const name =
          prop?.displayname ??
          decodeURIComponent(href).split("/").filter(Boolean).pop() ??
          "";

        return {
          name,
          isDir,
          size: isDir ? null : Number(prop?.getcontentlength ?? 0),
          type: isDir ? "directory" : (prop?.getcontenttype ?? "application/octet-stream"),
          modified: prop?.getlastmodified ?? null,
          etag: prop?.getetag ?? null,
          path: decodeURIComponent(href).replace(/^.*?public\.php\/webdav/, ""),
        };
      })
      // Drop the collection itself (the first entry equals the current path)
      .filter((it: any) => it.name && it.path !== joinDavPath(davPath));

    // Sort: folders first, then name
    items.sort((a: any, b: any) => {
      if (a.isDir && !b.isDir) return -1;
      if (!a.isDir && b.isDir) return 1;
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    });

    // Simple caching to reduce PROPFINDs (30s)
    const resp = NextResponse.json({ cwd: davPath || "/", items });
    resp.headers.set("Cache-Control", "public, max-age=30");
    return resp;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
