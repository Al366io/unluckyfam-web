import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer(): React.JSX.Element {
    return (
        <>
            <footer className="bg-white">
                <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 dark:text-gray-300">
                    <div className="flex items-center justify-center gap-3">
                        <a>something</a>
                        <a>something</a>
                        <a>something</a>
                    </div>
                </div>
            </footer>
        </>
    );
}
