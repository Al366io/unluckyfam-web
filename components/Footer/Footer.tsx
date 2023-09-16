"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import footerStyles from "./Footer.module.css";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fab);

export default function Footer(): React.JSX.Element {

    const handleExternalRedirect = (site: string) => {
        let redirectResult: string;
    
        switch (site) {
            case 'ig':
                redirectResult = 'https://www.instagram.com/unlucky_fam';
                break;
            case 'yt': 
                redirectResult = 'https://www.youtube.com/@unluckyfam';
                break;
            case 'soundcloud':
                redirectResult = 'soundcloud.com/unluckyfam?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';
                break;
            case 'spotify':
                redirectResult = 'https://open.spotify.com/artist/1toypnVY7Dbdp6VHDJRpxL?flow_ctx=0a11f87a-869d-4f84-a3ac-b4c0a0288c27%3A1694898006';
                break;
            default:
                redirectResult = '';
                break;
        }
    
        if (redirectResult) {
            window.location.assign(redirectResult);
        }
    }

    return (
        <>
            <footer className={footerStyles.footer}>
                <div className={footerStyles.container}>
                    <InstagramIcon onClick={() => handleExternalRedirect('ig')} className={footerStyles.footerLink}/>
                    <YouTubeIcon onClick={() => handleExternalRedirect('yt')} className={footerStyles.footerLink}/>
                    <FontAwesomeIcon onClick={() => handleExternalRedirect('soundcloud')} icon={["fab", "soundcloud"]} className={footerStyles.footerLink}/>
                    <FontAwesomeIcon onClick={() => handleExternalRedirect('spotify')} icon={["fab", "spotify"]} className={footerStyles.footerLink}/>
                </div>
            </footer>
        </>
    );
}
