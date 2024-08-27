"use client"
import Image from "next/image";

export default function About() {
    return (
        <div className="flex h-screen items-center justify-center">
            Just 3 guys making music for u
            <hr />
            <a href={location.href} target='_blank' download>Open in browser</a>
        </div>
    );
}