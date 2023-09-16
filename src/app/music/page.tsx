"use client"
import Image from "next/image";
import MusicPlayer from "../../../components/MusicPlayer/MusicPlayer";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";

export default function Music() {
    const [isLoaded, setIsLoaded] = React.useState(true); // TODO: wait for the iframe to load

    return (
        <div className="flex h-screen items-center justify-center">
            { isLoaded ? <MusicPlayer/> : <BarLoader color="hsla(168, 0%, 88%, 1)" /> }
        </div>
    );
}