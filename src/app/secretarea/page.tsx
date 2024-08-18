"use client";
import Image from "next/image";
import MusicPlayer from "../../../components/MusicPlayer/MusicPlayer";
import React, { useEffect } from "react";
import SecretAreaStyles from "./secret.module.css";

export default function SecretArea() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className={SecretAreaStyles.container}>
                <h1>Looks like you wanna enter the secret area</h1>
                <h2>But you can&#39;t</h2>
                <h3>Because it&#39;s a secret</h3>
                <h4>Unless...</h4>
                <button className={SecretAreaStyles.button}>I know the key</button>
            </div>
        </div>
    );
}
