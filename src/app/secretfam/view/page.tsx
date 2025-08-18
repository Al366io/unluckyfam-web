// app/owncloud/view/page.tsx
import Link from "next/link";

function ext(path: string) {
  const m = path.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? m[1] : "";
}

const VIDEO = new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]);
const AUDIO = new Set(["mp3", "wav", "ogg", "oga", "m4a", "aac", "flac"]);
const IMAGE = new Set(["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"]);
const PDF   = new Set(["pdf"]);

export default async function View({ searchParams }: { searchParams: { path?: string, name?: string } }) {
  const path = searchParams?.path || "";
  const name = searchParams?.name || decodeURIComponent(path.split("/").pop() || "file");
  const fileUrl = `/api/owncloud/stream?path=${encodeURIComponent(path)}`;
  const e = ext(path);

  if (!path) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <p>Missing file path.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold break-words">{name}</h1>
        {/* <Link href={`/api/owncloud/stream?path=${encodeURIComponent(path)}`} className="underline" prefetch={false}>
          Open Raw
        </Link> */}
      </div>

      {/* Video */}
      {VIDEO.has(e) && (
        <video src={fileUrl} controls style={{ width: "100%" }} playsInline />
      )}

      {/* Audio */}
      {AUDIO.has(e) && (
        <audio src={fileUrl} controls style={{ width: "100%" }} />
      )}

      {/* Image */}
      {IMAGE.has(e) && (
        // Use <img> to keep it simple; could add a lightbox later
        <img src={fileUrl} alt={name} style={{ maxWidth: "100%", height: "auto" }} />
      )}

      {/* PDF */}
      {PDF.has(e) && (
        <iframe src={fileUrl} style={{ width: "100%", height: "80vh", border: 0 }} />
      )}

      {/* Fallback */}
      {!VIDEO.has(e) && !AUDIO.has(e) && !IMAGE.has(e) && !PDF.has(e) && (
        <p className="text-sm text-gray-600">
          Preview not available for .{e}.{" "}
          <a className="underline" href={fileUrl}>Open file</a>
        </p>
      )}

      <div>
        <Link href="/secretfam" className="underline">← Back to folder</Link>
      </div>
    </main>
  );
}
