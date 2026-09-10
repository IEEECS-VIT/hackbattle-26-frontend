import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/components/AuthProvider";
import { ToastProvider } from "@/components/ToastProvider";
import localFont from "next/font/local";
import SiteLoader from "@/components/SiteLoader";

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
      className={`${pixeboy.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <ToastProvider>
            <SiteLoader>{children}</SiteLoader>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
