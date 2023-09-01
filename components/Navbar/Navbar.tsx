"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import SignWhiteNoBCK from "../../public/SignWhiteNoBCK.png";
import navbarStyles from "./Navbar.module.css";

const pages = ["About", "Lyrics", "Merch", "Music", "Who are we?"];

export default function Navbar(): React.JSX.Element {
    return (
        <nav>
            <div className={navbarStyles.navbarContainer}>
                <Link className={navbarStyles.imgContainer} href="/">
                    <Image
                        src={SignWhiteNoBCK}
                        alt="Unlucky Fam"
                        className={navbarStyles.unluckySignLogo}
                    />
                </Link>
                <div className={navbarStyles.menuContainer}>
                    {pages.map((page) => (
                        <Link href={"/" + page.toLowerCase().replace(/[\s?]/g, '')}>{page}</Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
