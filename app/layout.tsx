import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/components/AuthProvider";
import { ToastProvider } from "@/components/ToastProvider";
import localFont from "next/font/local";
import SiteLoader from "@/components/SiteLoader";
import { NavigationLoaderProvider } from "@/components/NavigationLoader";

const INITIAL_LOADER_SCRIPT = `
  (() => {
    try {
      const key = "hackbattle-fancy-loader-seen-this-tab";
      const loader = window.sessionStorage.getItem(key) ? "simple" : "fancy";
      document.documentElement.dataset.initialLoader = loader;
      if (loader === "fancy") window.sessionStorage.setItem(key, "true");
    } catch {
      document.documentElement.dataset.initialLoader = "simple";
    }
  })();
`;

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
        <script dangerouslySetInnerHTML={{ __html: INITIAL_LOADER_SCRIPT }} />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <ToastProvider>
            <NavigationLoaderProvider>
              <SiteLoader>{children}</SiteLoader>
            </NavigationLoaderProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
