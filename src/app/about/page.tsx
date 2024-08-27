"use client"
import Image from "next/image";
import { useEffect } from "react";

export default function About() {
    //useEffect(() => { 
    //     const location = window.location;
    //     const link = location.href;
    //     const safariLink = `x-web-search://?${link}`; 
    //     window.location.href = safariLink; 
    // }, []);
    const redirect = () => {
        const location = window.location;
        const link = location.href;
        const safariLink = `x-web-search://?${link}`; 
        window.location.href = safariLink;
        setTimeout(() => {
            window.location = location;
        }, 10);
    }
    return (
        <div className="flex h-screen items-center justify-center">
            Just 3 guys making music for u
            <hr />
            <button onClick={redirect}>Click here to redirect</button>
        </div>
    );
}