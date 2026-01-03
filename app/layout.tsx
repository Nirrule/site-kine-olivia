import type { Metadata } from "next";
import { Oswald, Montserrat } from "next/font/google";
import type React from "react";
import "./globals.css";

// Import des fonts utilisées dans le site
const oswald = Oswald({
 subsets: ["latin"],
 display: "swap",
 weight: ["400", "600", "700"],
 variable: "--font-oswald",
});

const montserrat = Montserrat({
 subsets: ["latin"],
 display: "swap",
 weight: ["400", "500", "600", "700"],
 variable: "--font-montserrat",
});

export const metadata: Metadata = {
 title: "Olivia Jaumain - Kinésithérapeute",
 description:
  "Kinésithérapeute spécialisée en sport, troubles musculo-squelettiques et mâchoire (ATM). Consultations sur rendez-vous.",
 icons: {
  icon: "/OJ.svg",
  shortcut: "/OJ.svg",
  apple: "/OJ.svg",
 },
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="fr" className={`${oswald.variable} ${montserrat.variable}`}>
   <body className="antialiased bg-background text-foreground">{children}</body>
  </html>
 );
}
