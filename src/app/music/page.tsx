import Image from "next/image";
import MusicPlayer from "../../../components/MusicPlayer/MusicPlayer";

export default function Music() {
    return (
        <div className="flex h-screen items-center justify-center">
            <MusicPlayer/>
        </div>
    );
}