import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { LanguageProvider } from "@/contexts/LanguageContext"
import SWRProvider from "@/components/providers/SWRProvider"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import AuthModals from "@/components/auth/AuthModals"
import AuthSetup from "@/components/utils/AuthSetup"
import ScrollControls from "@/components/layout/ScrollControls"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl();
const inter = Inter({ subsets: ["latin", "vietnamese"] })

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn",
  description:
    "Khám phá vận mệnh, giải mơ, xem tướng số và nhiều tính năng thú vị khác tại Bóc Mệnh. Dịch vụ bói toán online chính xác và uy tín nhất Việt Nam.",
  keywords: "bóc mệnh, vận mệnh, giải mơ, tướng số, phong thủy, tarot, thần số học, chiêm tinh, xem bói online",
  authors: [{ name: "Bóc Mệnh Team" }],
  creator: "Bóc Mệnh",
  publisher: "Bóc Mệnh",
  generator: "Next.js",
  applicationName: "Bóc Mệnh",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  themeColor: "#EAB308", // yellow-500
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
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
      "Khám phá vận mệnh, giải mơ, xem tướng số và nhiều tính năng thú vị khác. Dịch vụ bói toán online chính xác nhất.",
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
    description: "Khám phá vận mệnh, giải mơ, xem tướng số online chính xác nhất",
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://bocmenh.com" />

        {/* Alternate Languages */}
        <link rel="alternate" hrefLang="vi" href="https://bocmenh.com" />
        <link rel="alternate" hrefLang="en" href="https://bocmenh.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://bocmenh.com" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Bóc Mệnh",
              alternateName: "Boc Menh",
              url: "https://bocmenh.com",
              description: "Khám phá vận mệnh, giải mơ, xem tướng số và phong thủy online",
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
                name: "Dịch vụ bói toán online",
                description: "Cung cấp dịch vụ bóc mệnh, giải mơ, xem tướng số, phong thủy online",
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
        <LanguageProvider>
          <SWRProvider>
            <AuthProvider>
              <AuthSetup />
              <div className="flex flex-col min-h-screen">
                <Navigation />
                <main className="flex-grow pt-16 relative">
                  {/* Optimized Starry background */}
                  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                    <div className="absolute inset-0">
                      {/* Reduced stars for better performance */}
                      {[...Array(60)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            willChange: "opacity", // Optimize animation
                          }}
                        />
                      ))}
                      {[...Array(25)].map((_, i) => (
                        <div
                          key={`gold-${i}`}
                          className="absolute w-1.5 h-1.5 bg-yellow-500 rounded-full animate-twinkle"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            willChange: "opacity", // Optimize animation
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative z-0">{children}</div>
                </main>
                <Footer />
              </div>
              <AuthModals />
              <ScrollControls />
            </AuthProvider>
          </SWRProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
