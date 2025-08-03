import type { Metadata } from "next"
import ClientPage from "./ClientPage"
import { getBaseUrl } from "@/lib/infra/utils"
import { createSEOMetadata, createServiceStructuredData, createBreadcrumbStructuredData } from "@/lib/seo/metadata"

const baseUrl = getBaseUrl();

export const metadata: Metadata = createSEOMetadata({
  title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn | Dịch Vụ Bói Toán Online #1 Việt Nam",
  description: "🔮 Mỗi người là một hộp bí ẩn - Khám phá vận mệnh qua AI bói toán ⭐ Giải mơ ⭐ Thần số học ⭐ Tarot ⭐ Phong thủy ⭐ Xem tướng số online chính xác nhất VN",
  keywords: "bóc mệnh, xem bói online, giải mơ, thần số học, tarot online, phong thủy, xem tướng, AI bói toán, vận mệnh, chiêm tinh, khám phá bản thân, bói bài online, tử vi",
  ogImage: "/og-home.jpg",
  canonicalUrl: "/",
  alternateLanguages: {
    vi: `/`,
    en: `/`,
  },
})

// Enhanced structured data for homepage
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Bóc Mệnh",
  alternateName: ["Boc Menh", "Khám phá vận mệnh"],
  url: baseUrl,
  description: "Nền tảng AI bói toán hàng đầu Việt Nam - Khám phá vận mệnh, giải mơ, thần số học, tarot, phong thủy online",
  inLanguage: ["vi", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "Bóc Mệnh",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    description: "Nền tảng bói toán AI hàng đầu Việt Nam",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: ["Vietnamese", "English"]
    },
    sameAs: [
      "https://facebook.com/bocmenh",
      "https://instagram.com/bocmenh",
      "https://twitter.com/bocmenh",
    ],
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Dịch vụ Bóc Mệnh",
    description: "Các dịch vụ bói toán và phong thủy AI hàng đầu",
    numberOfItems: 12,
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        name: "Bóc Mệnh Cá Nhân",
        description: "Khám phá vận mệnh và tính cách qua ngày sinh với AI",
        url: `${baseUrl}/destiny`,
        serviceType: "Fortune Telling",
        provider: { "@type": "Organization", name: "Bóc Mệnh" }
      },
      {
        "@type": "Service", 
        position: 2,
        name: "Giải Mơ AI",
        description: "Giải thích ý nghĩa giấc mơ bằng trí tuệ nhân tạo",
        url: `${baseUrl}/dreams`,
        serviceType: "Dream Interpretation",
        provider: { "@type": "Organization", name: "Bóc Mệnh" }
      },
      {
        "@type": "Service",
        position: 3,
        name: "Thần Số Học",
        description: "Phân tích số mệnh và đường đời qua ngày sinh",
        url: `${baseUrl}/numerology`,
        serviceType: "Numerology",
        provider: { "@type": "Organization", name: "Bóc Mệnh" }
      },
      {
        "@type": "Service",
        position: 4,
        name: "Bói Bài Tarot Online",
        description: "Xem bói tarot online với AI chính xác cao",
        url: `${baseUrl}/tarot`,
        serviceType: "Tarot Reading",
        provider: { "@type": "Organization", name: "Bóc Mệnh" }
      },
      {
        "@type": "Service",
        position: 5,
        name: "Tư Vấn Phong Thủy",
        description: "Phong thủy nhà cửa, văn phòng theo tuổi và mệnh",
        url: `${baseUrl}/fengshui`,
        serviceType: "Feng Shui Consultation",
        provider: { "@type": "Organization", name: "Bóc Mệnh" }
      },
      {
        "@type": "Service",
        position: 6,
        name: "Xem Tướng Số",
        description: "Phân tích tướng số, xem tướng mặt online",
        url: `${baseUrl}/palmistry`,
        serviceType: "Palmistry",
        provider: { "@type": "Organization", name: "Bóc Mệnh" }
      }
    ],
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
    ],
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "VND",
    lowPrice: "0",
    highPrice: "500000",
    offerCount: "50+",
    description: "Dịch vụ bói toán từ miễn phí đến cao cấp"
  }
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ClientPage />
    </>
  )
}
