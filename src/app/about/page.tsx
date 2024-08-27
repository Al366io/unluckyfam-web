"use client"
import Image from "next/image";

export default function About() {
    const openInBrowser = () => {
        const url = window.location.href;
        window.open(url, '_blank');
      };
    return (
        <div className="flex h-screen items-center justify-center">
            Just 3 guys making music for u
            <hr />
            <button onClick={openInBrowser} style={{ zIndex: 1000 }}>
              Open in Browser
            </button>
        </div>
    );
}