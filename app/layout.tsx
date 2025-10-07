import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { satoshi } from "../fonts/font"; // ensure this is a next/font (local) export with `.variable`

const karla = Karla({
    variable: "--font-karla",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SnapCast",
    description: "A Screen Sharing App",
    icons: { icon: "/assets/icons/logo.svg" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${karla.variable} ${satoshi.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
