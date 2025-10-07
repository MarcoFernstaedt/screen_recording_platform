import Navbar from "@/components/Navbar";
import React from "react";

export default function RootSectionLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}
