import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { code } = await req.json();
    const codes = ['pippo', 'pluto', 'paperino']; // Example codes, replace with your own logic

    //   if (code === process.env.SECRET_CODE) {
    //     return NextResponse.json({ ok: true });
    //   }

    if (codes.includes(code)) {
        return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "Invalid code" }, { status: 401 });
}
