"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import SignWhiteNoBCK from "../../public/sign-white-vec.svg";
import FamWhiteNoBCK from "../../public/FamWhiteNoBCK.png";
import navbarStyles from "./Navbar.module.css";
import FadeMenu from "./FadeMenu/FadeMenu";
import { pages } from "./constants";

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
                                <hr className={navbarStyles.divider} />
                            </Link>
                        ))}
                    </div>
                <FadeMenu />
                </div>
            </div>
        </nav>
    );
}
