import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { LanguageProvider } from "@/contexts/LanguageContext"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer" // Thêm import Footer

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn",
  description: "Mỗi người là một hộp bí ẩn, hãy khám phá và bạn sẽ hiểu về chính mình",
  keywords: "bóc mệnh, vận mệnh, tarot, thần số học, giải mơ, phong thủy",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-black text-white`}>
        <LanguageProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-grow pt-16 relative">
                {" "}
                {/* Thêm pt-16 để tránh bị che bởi Nav, và relative */}
                {/* Starry background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                  {" "}
                  {/* Đảm bảo sao ở lớp dưới cùng */}
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
                <div className="relative z-0">
                  {" "}
                  {/* Nội dung chính */}
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
