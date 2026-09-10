import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/components/AuthProvider";
import { ToastProvider } from "@/components/ToastProvider";
import localFont from "next/font/local";
import SiteLoader from "@/components/SiteLoader";
import RequestActivity from "@/components/RequestActivity";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("hackbattle-intro-seen-v2")==="1")document.documentElement.dataset.hackbattleIntroSeen="true"}catch{}`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <ToastProvider>
            <SiteLoader>{children}</SiteLoader>
            <RequestActivity />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
