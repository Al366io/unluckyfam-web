import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../../components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Unlucky Fam",
    description: "u won't believe ur ears",
};

export default function RootLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="text-white bg-black">
                {/* <Navbar /> */}
                {children}
                <Footer />
            </body>
        </html>
    );
}
