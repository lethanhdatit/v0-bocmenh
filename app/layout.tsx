import "@/lib/infra/disableConsole";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getLanguage as getServerLanguage } from "@/lib/i18n/server-utils";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bocmenh.com";
const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn",
  description:
    "Khám phá vận mệnh, giải mơ, xem tướng số và nhiều tính năng thú vị khác tại Bóc Mệnh. Dịch vụ huyền học online chính xác và uy tín nhất Việt Nam.",
  keywords:
    "bóc mệnh, vận mệnh, giải mơ, tướng số, phong thủy, tarot, thần số học, chiêm tinh, xem bói online",
  authors: [{ name: "Bóc Mệnh Team" }],
  creator: "Bóc Mệnh",
  publisher: "Bóc Mệnh",
  generator: "Next.js",
  applicationName: "Bóc Mệnh",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Open Graph
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: baseUrl,
    siteName: "Bóc Mệnh",
    title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn",
    description:
      "Khám phá vận mệnh, giải mơ, xem tướng số và nhiều tính năng thú vị khác. Dịch vụ huyền học online chính xác nhất.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bóc Mệnh - Khám Phá Vận Mệnh",
        type: "image/jpeg",
      },
    ],
  },
  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@bocmenh",
    creator: "@bocmenh",
    title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn",
    description:
      "Khám phá vận mệnh, giải mơ, xem tướng số online chính xác nhất",
    images: ["/twitter-image.jpg"],
  },
  // Additional
  category: "Entertainment",
  classification: "Astrology, Fortune Telling, Feng Shui",
  // Verification
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "facebook-domain-verification": "your-facebook-verification-code",
    },
  },
};

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
        {/* Canonical và hreflang sẽ được handle bởi locale layout */}
        <link rel="canonical" href="https://bocmenh.com" />

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
        {/* Alternate language links */}
        <link rel="alternate" hrefLang="vi" href={`https://bocmenh.com`} />
        <link rel="alternate" hrefLang="en" href={`https://bocmenh.com/en`} />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://bocmenh.com`}
        />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Bóc Mệnh",
              alternateName: "Boc Menh",
              url: "https://bocmenh.com",
              description:
                "Khám phá vận mệnh, giải mơ, xem tướng số và phong thủy online",
              inLanguage: ["vi", "en"],
              potentialAction: {
                "@type": "SearchAction",
                target: "https://bocmenh.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "Bóc Mệnh",
                url: "https://bocmenh.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://bocmenh.com/logo.png",
                  width: 512,
                  height: 512,
                },
                sameAs: [
                  "https://facebook.com/bocmenh",
                  "https://instagram.com/bocmenh",
                  "https://twitter.com/bocmenh",
                ],
              },
              mainEntity: {
                "@type": "Service",
                name: "Dịch vụ huyền học online",
                description:
                  "Cung cấp dịch vụ bóc mệnh, giải mơ, xem tướng số, phong thủy online",
                provider: {
                  "@type": "Organization",
                  name: "Bóc Mệnh",
                },
                areaServed: "VN",
                availableLanguage: ["vi", "en"],
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
