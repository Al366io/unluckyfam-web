"use client"
import Image from "next/image";
import MusicPlayer from "../../../components/MusicPlayer/MusicPlayer";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";

export default function Music() {
    return (
        <div className="flex h-screen items-center justify-center">
            <MusicPlayer />
        </div>
    );
}