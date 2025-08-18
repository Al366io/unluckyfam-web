import Link from "next/link";

async function list(path = "") {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/owncloud/list${path ? `?path=${encodeURIComponent(path)}` : ""}`, {
        // Server Component fetch; enable ISR-ish caching
        next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error("Failed to load list");
    return res.json();
}

export default async function SecretFam({ searchParams }: { searchParams: { path?: string } }) {
    const path = searchParams?.path ?? "";
    const data = await list(path);

    const segments = (path || "").split("/").filter(Boolean);
    const crumb = [
        { name: "root", path: "" },
        ...segments.map((seg, i) => ({
            name: seg,
            path: segments.slice(0, i + 1).join("/"),
        })),
    ];

    return (
        <main className="mx-auto max-w-3xl p-6">
            <h1 className="text-2xl font-semibold mb-4">Secret Area</h1>
            <p className="text-sm text-gray-600 mb-4">
                This is a place strictly reserved for people inside the Unlucky Fam Community.
                <br />
                Enjoy the content and remember to keep it secret!
            </p>

            <ul className="divide-y border rounded">
                {data.items.length === 0 && <li className="p-4 text-sm text-gray-500">Empty folder</li>}
                {data.items.map((it: any) => {
                    const relPath = it.path.replace(/^\//, "");
                    const displaySize = it.size ? new Intl.NumberFormat(undefined, { notation: "compact" }).format(it.size) : "";
                    if (encodeURIComponent(it.name) === "webdav") {
                        // Skip webDAV resource types
                        return null;
                    }
                    return (
                        <li key={relPath} className="p-3 flex items-center gap-3">

                            <span>{it.isDir ? "📁" : "📄"}</span>
                            {it.isDir ? (
                                <Link href={`/secretfam?path=${encodeURIComponent(relPath)}`} className="underline">
                                    {it.name}
                                </Link>
                            ) : (
                                <Link
                                    href={`/secretfam/view?path=${encodeURIComponent(relPath)}&name=${encodeURIComponent(it.name)}`}
                                    className="underline"
                                >
                                    {it.name}
                                </Link>
                            )}
                            <span className="ml-auto text-sm text-gray-500">
                                {it.isDir ? "—" : displaySize}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
