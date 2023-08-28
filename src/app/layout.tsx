import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Unlucky Fam",
    description: "u won't believe ur ears",
};

export default function RootLayout({ children }: {
    children: React.ReactNode;
}): React.JSX.Element {
    return (
        <>
            <main className="flex flex-col h-screen justify-between bg-black text-white">
                <Navbar />
                    {children}
                <Footer />
            </main>
        </>
    );
}
