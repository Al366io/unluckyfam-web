import React from "react";
import Link from "next/link";
import Image from "next/image";
import footerStyles from "./Footer.module.css";

export default function Footer(): React.JSX.Element {
    return (
        <>
            <footer className={footerStyles.footer}>
                <div className={footerStyles.container}>
                    <a className={footerStyles.footerLink}>Facebook</a>
                    <a className={footerStyles.footerLink}>YouTube</a>
                    <a className={footerStyles.footerLink}>Spotify</a>
                </div>
            </footer>
        </>
    );
}
