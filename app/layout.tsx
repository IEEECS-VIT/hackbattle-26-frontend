import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/shared/footer";
import { pixeboy } from "@/app/font";
import Navbar from "@/app/components/shared/navbar";

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
        {/* <Navbar /> */}

        <main className="flex-1">
          {children}
        </main>

        {/* <Footer /> */}
      </body>
    </html>
  );
}