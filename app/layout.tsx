import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { LanguageProvider } from "@/contexts/LanguageContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn",
  description: "Khám phá vận mệnh, giải mơ, thần số học và nhiều hơn nữa",
  keywords: "bóc mệnh, vận mệnh, tarot, thần số học, giải mơ, phong thủy",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
