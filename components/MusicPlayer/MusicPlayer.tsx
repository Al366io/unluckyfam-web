import * as React from "react";
import MusicPlayerStyles from "./MusicPlayer.module.css";

export default function MusicPlayer(): React.JSX.Element {
    return (
        <div className={MusicPlayerStyles.wrapper}>
            <iframe
                className={MusicPlayerStyles.iframe}
                src="https://open.spotify.com/embed/artist/1toypnVY7Dbdp6VHDJRpxL?utm_source=generator"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="eager"
            ></iframe>
        </div>
    );
}
