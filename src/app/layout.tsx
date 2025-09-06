import "./globals.css";
import { Albert_Sans, Inter } from "next/font/google";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./default.module.css";
import { Analytics } from "@vercel/analytics/next"

const inter = Albert_Sans({subsets: ["latin"], weight: '300'} )

export const metadata = {
    title: "Unlucky Fam",
    description: "u won't believe ur ears",
};

export default function RootLayout({ children }: {
    children: React.ReactNode;
}): React.JSX.Element {
    return (
        <html lang="en">
            <body>
                <Analytics />
                <main className={`${inter.className} ${styles.mainContainer}`}>
                    <Navbar />
                        {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}
