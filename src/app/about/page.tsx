"use client";
import { PowerInputSharp } from "@mui/icons-material";
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

    useEffect(() => {
        if (isAppleDevice()) {
            window.alert("Looks like you're using an Apple device. Please open this page in Safari.");
        }});

    const redirectone = () => {
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

        // open window as a popup
        window.open(location.href, "_blank", "width=200,height=100");
    };

    const redirecttwo = () => {
        window.open(window.location.href, "popupWindow", "width=600,height=400,scrollbars=yes,resizable=yes");
    }

    return (
        <div className="flex h-screen items-center justify-center">
            Just 3 guys making music for u
            <hr />
            <button onClick={redirectone}>TRY ONE</button>
            <button onClick={redirecttwo}>TRY TWO</button>
        </div>
    );
}
