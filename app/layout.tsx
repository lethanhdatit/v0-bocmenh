import "@/lib/infra/disableConsole"
import type React from "react"
import type { Metadata } from "next"
import { Noto_Serif, Inter } from "next/font/google"
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
import GlobalLoadingWrapper from "@/components/ui/GlobalLoadingWrapper"
import { cn } from "@/lib/utils"

const baseUrl = getBaseUrl()

const fontSans = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
})

const fontSerif = Noto_Serif({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  variable: "--font-serif",
})

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
  twitter: {
    card: "summary_large_image",
    site: "@bocmenh",
    creator: "@bocmenh",
    title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn",
    description: "Khám phá vận mệnh, giải mơ, xem tướng số online chính xác nhất",
    images: ["/twitter-image.jpg"],
  },
  category: "Entertainment",
  classification: "Astrology, Fortune Telling, Feng Shui",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "facebook-domain-verification": "your-facebook-verification-code",
    },
  },
}

export const viewport = {
  colorScheme: "light",
  themeColor: "#FDF6E9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

const OrientalBackground = () => (
  <div className="fixed inset-0 -z-50 overflow-hidden">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/imgs/oriental-bg.png)" }} />
    <div
      className="absolute inset-0 opacity-50 mix-blend-multiply"
      style={{ backgroundImage: "url(/imgs/oriental-pattern-dark.png)", backgroundSize: "500px" }}
    />
  </div>
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="light">
      <head>
        <link rel="canonical" href="https://bocmenh.com" />
        <link rel="alternate" hrefLang="vi" href="https://bocmenh.com" />
        <link rel="alternate" hrefLang="en" href="https://bocmenh.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://bocmenh.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Bóc Mệnh",
              url: "https://bocmenh.com",
            }),
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontSerif.variable)}>
        <LanguageProvider>
          <SWRProvider>
            <AuthProvider>
              <AuthSetup />
              <GlobalLoadingWrapper />
              <div className="relative flex min-h-screen flex-col">
                <OrientalBackground />
                <Navigation />
                <main className="flex-1 pt-16">{children}</main>
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
