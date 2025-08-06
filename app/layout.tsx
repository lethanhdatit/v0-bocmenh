import "@/lib/infra/disableConsole";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getLanguage as getServerLanguage } from "@/lib/i18n/server-utils";
import { generateMultilingualMetadata } from "@/lib/seo/seo-helpers";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const { language } = await getServerLanguage();
  return generateMultilingualMetadata({
    pageKey: 'site',
    params: { lang: language },
  });
}

// ✅ Thêm export viewport riêng:
export const viewport = {
  colorScheme: "dark",
  themeColor: "#EAB308",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language: lang } = await getServerLanguage();
  
  return (
    <html lang={lang}>
      <head>
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
