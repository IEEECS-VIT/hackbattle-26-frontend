import localFont from "next/font/local";
import "./globals.css";

const pixeboy = localFont({
  src: "../public/fonts/pixeboy.ttf",
  variable: "--font-pixeboy",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pixeboy.variable}>{children}</body>
    </html>
  );
}