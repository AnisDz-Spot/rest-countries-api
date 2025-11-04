import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ThemeInitializer from "@/components/ThemeInitializer";
import Header from "@/components/Header";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WorldLens",
  description:
    "Bright or dark, explore the globe your way — built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${nunito.variable} antialiased max-w-screen overflow-x-hidden`}
      >
        <ThemeInitializer />
        <Header />
        {children}
      </body>
    </html>
  );
}
