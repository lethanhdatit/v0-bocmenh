import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { isValidLocale, type Locale } from "@/lib/i18n"
import { generateSEOMetadata } from "@/lib/metadata"
import { notFound } from "next/navigation"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = params.locale as Locale

  if (!isValidLocale(locale)) {
    return {}
  }

  return generateSEOMetadata({
    locale,
    pathname: `/${locale}`,
    titleKey: "site.title",
    descriptionKey: "site.description",
  })
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = params.locale as Locale

  if (!isValidLocale(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <LanguageProvider initialLocale={locale}>
          <AuthProvider>
            <div className="relative">
              {/* Starry background */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0">
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={`gold-${i}`}
                      className="absolute w-1.5 h-1.5 bg-yellow-500 rounded-full animate-twinkle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="relative z-10">
                {children}
                <Footer />
              </div>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return [{ locale: "vi" }, { locale: "en" }]
}
