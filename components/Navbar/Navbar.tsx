"use client"
import * as React from "react";
import Link from "next/link";
import Image from "next/image";


const pages = ["About", "Lyrics", "Merch", "Music", "Who are we?"];

export default function Navbar(): React.JSX.Element {
    return (
        <nav>
            <div className="flex items-center justify-between p-6 mx-auto text-gray-600 dark:text-gray-300">
                <div className="flex w-screen gap-3">
                    <Link href="/">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                    </Link>
                    <div className="flex items-center w-screen justify-center gap-10">
                        {pages.map((page) => (
                            <Link href={"/" + page.toLowerCase()}>
                                {page}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
