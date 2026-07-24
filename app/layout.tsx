import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      className={`${geistSans.variable} ${geistMono.variable} ${pixeboy.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
         <Navbar /> 

        <main className="flex-1">
          {children}
        </main>

      
      </body>
    </html>
  );
}