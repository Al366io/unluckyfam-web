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
        // const isIOS = isAppleDevice();
        // if (!isIOS) return;


        // // for android =  <a href={window.location.href} target='_blank' rel='noreferrer' download >
        // // if it's ios, redirect to the safari link
        const location = window.location;

        // // remove the protocol
        // const link = location.href.replace("http://", "").replace("https://", "");
        
        // const safariLink = `x-safari-https:${link}`;
        // window.location.href = safariLink;
        window.open(location.href, '_blank', 'location=yes, closebuttoncaption=Close, enableviewportscale=yes, toolbar=yes, closebuttoncaption=Close, popups=yes, toolbarcolor=#000000, closebuttoncolor=#ffffff, toolbartranslucent=no, closebuttontranslucent=no');
    };
    return (
        <div className="flex h-screen items-center justify-center">
            Just 3 guys making music for u
            <hr />
            <button onClick={redirect}>Click here to redirect</button>
        </div>
    );
}
