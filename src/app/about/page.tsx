"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function About() {
    //useEffect(() => {
    //     const location = window.location;
    //     const link = location.href;
    //     const safariLink = `x-web-search://?${link}`;
    //     window.location.href = safariLink;
    // }, []);
    const isAppleDevice = () => {
        return /iPhone|iPad|iPod/.test(navigator.userAgent);
    }

    const redirect = () => {
        // see if it's ios
        const isIOS = isAppleDevice();
        if (!isIOS) return;

        // if it's ios, redirect to the safari link
        const location = window.location;

        // remove the protocol
        const link = location.href.replace("http://", "").replace("https://", "");
        
        const safariLink = `x-safari-https:${link}`;
        window.location.href = safariLink;
    };
    return (
        <div className="flex h-screen items-center justify-center">
            Just 3 guys making music for u
            <hr />
            <button onClick={redirect}>Click here to redirect</button>
        </div>
    );
}
