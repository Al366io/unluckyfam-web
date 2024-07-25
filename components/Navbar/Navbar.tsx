"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import SignWhiteNoBCK from "../../public/SignWhiteNoBCK.png";
import FamWhiteNoBCK from "../../public/FamWhiteNoBCK.png";
import navbarStyles from "./Navbar.module.css";
import FadeMenu from "./FadeMenu/FadeMenu";

const pages = ["HOME", "STORE", "MUSIC", "CONTACT", "ABOUT"];

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
                    <Image
                        src={FamWhiteNoBCK}
                        alt="UF"
                        className={navbarStyles.unluckySignLogo2}
                    />
                </Link>
                <div className={navbarStyles.innerNavbarContainer}>
                    <div className={navbarStyles.menuContainer}>
                        {pages.map((page) => (
                            <Link
                                key={page}
                                className={navbarStyles.link}
                                href={page === "HOME" ? "/" : "/" + page.toLowerCase().replace(/[\s?]/g, "")}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                </div>
                <FadeMenu />
            </div>
        </nav>
    );
}
