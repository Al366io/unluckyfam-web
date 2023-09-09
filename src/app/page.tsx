import Image from "next/image";
import styles from "./default.module.css"
import ThreeScene from '../../components/ThreeScene'

export default function Home() {
    return (
        <div className={styles.LogoContainer3D}>
            {/* <video className={styles.video} autoPlay loop playsInline muted src="/Logo3d.mp4"> </video> */}
            <ThreeScene></ThreeScene>
        </div>
    );
}
