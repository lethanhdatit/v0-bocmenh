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

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn",
  description: "Khám phá vận mệnh, giải mơ, xem tướng số và nhiều tính năng thú vị khác tại Bóc Mệnh",
  keywords: "bóc mệnh, vận mệnh, giải mơ, tướng số, phong thủy, tarot",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <LanguageProvider>
          <SWRProvider>
            <AuthProvider>
              <AuthSetup />
              <Navigation />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <AuthModals />
            </AuthProvider>
          </SWRProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
