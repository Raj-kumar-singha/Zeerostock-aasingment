import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Zeerostock Inventory Search",
    description: "Search surplus inventory across multiple suppliers",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
