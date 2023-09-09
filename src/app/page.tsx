import Image from "next/image";
import styles from "./default.module.css"
import ThreeScene from '../../components/ThreeScene/ThreeScene'

export default function Home() {
    return (
        <div className={styles.logoContainer3D}>
            <ThreeScene />
        </div>
    );
}
