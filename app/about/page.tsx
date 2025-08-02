import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"
import { getTranslations } from "@/i18n/server"
import { createSEOMetadata } from "@/lib/seo/metadata"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl()

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslations(["common"])

  return createSEOMetadata({
    title: "Về Chúng Tôi - Bóc Mệnh | Nền Tảng AI Bói Toán Hàng Đầu Việt Nam",
    description: "🌟 Tìm hiểu về Bóc Mệnh - Nền tảng AI tiên phong trong lĩnh vực bói toán, phong thủy, tarot tại Việt Nam. Đội ngũ chuyên gia giàu kinh nghiệm, công nghệ AI hiện đại.",
    keywords: "về bóc mệnh, AI bói toán, công ty phong thủy, đội ngũ chuyên gia, công nghệ AI, lịch sử phát triển, tầm nhìn sứ mệnh, nền tảng uy tín",
    ogImage: "/og-about.jpg",
    canonicalUrl: `${baseUrl}/about`,
    alternateLanguages: {
      vi: `${baseUrl}/about`,
      en: `${baseUrl}/about`,
    },
  })
}

// Structured data cho trang About
const aboutStructuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Về Bóc Mệnh",
  description: "Thông tin về công ty Bóc Mệnh - nền tảng AI bói toán hàng đầu Việt Nam",
  url: `${baseUrl}/about`,
  mainEntity: {
    "@type": "Organization",
    name: "Bóc Mệnh",
    alternateName: "BMP - Boc Menh Platform",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    foundingDate: "2024",
    foundingLocation: {
      "@type": "Place",
      name: "Việt Nam"
    },
    description: "Nền tảng AI tiên phong trong lĩnh vực bói toán, phong thủy, tarot tại Việt Nam",
    slogan: "Mỗi người là một hộp bí ẩn",
    mission: "Mang đến những dịch vụ bói toán chính xác, hiện đại nhất cho người Việt",
    areaServed: {
      "@type": "Country",
      name: "Vietnam"
    },
    knowsAbout: [
      "Bói toán",
      "Phong thủy", 
      "Tarot",
      "Thần số học",
      "Giải mơ",
      "Chiêm tinh",
      "Xem tướng",
      "Trí tuệ nhân tạo"
    ],
    serviceType: [
      "Fortune Telling",
      "Feng Shui Consultation", 
      "Tarot Reading",
      "Dream Interpretation",
      "Numerology",
      "Astrology"
    ],
    technology: [
      "Artificial Intelligence",
      "Machine Learning", 
      "Natural Language Processing"
    ]
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Về chúng tôi",
        item: `${baseUrl}/about`,
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutStructuredData),
        }}
      />
      <AboutPageClient />
    </>
  )
}
