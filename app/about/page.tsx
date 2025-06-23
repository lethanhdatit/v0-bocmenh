import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "Về chúng tôi - Bóc Mệnh",
  description:
    "Tìm hiểu về Bóc Mệnh - nền tảng AI chuyên sâu về xem bói, phong thủy, tarot và tư vấn nhân sinh hàng đầu Việt Nam.",
  keywords: "về chúng tôi, bóc mệnh, AI xem bói, phong thủy, tarot, tư vấn nhân sinh",
  openGraph: {
    title: "Về chúng tôi - Bóc Mệnh",
    description:
      "Tìm hiểu về Bóc Mệnh - nền tảng AI chuyên sâu về xem bói, phong thủy, tarot và tư vấn nhân sinh hàng đầu Việt Nam.",
    type: "website",
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
