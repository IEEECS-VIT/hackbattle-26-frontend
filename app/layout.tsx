import type { Metadata } from "next";


import { Geist, Geist_Mono, Jersey_20 } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import localFont from "next/font/local";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jersey20 = Jersey_20({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jersey-20",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HackBattle 2026",
  description: "IEEE CS VIT HackBattle",
};

export const pixeboy = localFont({
  src: "./fonts/Pixeboy.ttf",
  variable: "--font-pixeboy",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pixeboy.variable} ${jersey20.variable} antialiased`}
    >
      
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Navbar />

        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
