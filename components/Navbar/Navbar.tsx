"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import SignWhiteNoBCK from "../../public/SignWhiteNoBCK.png";
import FamWhiteNoBCK from "../../public/FamWhiteNoBCK.png";
import navbarStyles from "./Navbar.module.css";

const pages = ["HOME", "MUSIC", "LYRICS", "MERCH", "ABOUT"];

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
                                className={navbarStyles.link}
                                href={
                                    page === "HOME" ? "/" : "/" + page.toLowerCase().replace(/[\s?]/g, "")
                                }>
                                {page}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={navbarStyles.burgerContainer}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className={navbarStyles.burgerMenu}
                    > 
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </div>
            </div>
        </nav>
    );
}
