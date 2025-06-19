import type { Metadata } from "next"
import ClientPage from "./ClientPage"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn | Trang Chủ",
  description:
    "Mỗi người là một hộp bí ẩn, hãy khám phá và bạn sẽ hiểu về chính mình. Dịch vụ bói toán, giải mơ, phong thủy online chính xác nhất Việt Nam.",
  keywords: "trang chủ bóc mệnh, khám phá vận mệnh, bói toán online, giải mơ, phong thủy, tarot, thần số học",
  openGraph: {
    title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn",
    description: "Mỗi người là một hộp bí ẩn, hãy khám phá và bạn sẽ hiểu về chính mình",
    url: baseUrl,
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Bóc Mệnh - Trang chủ khám phá vận mệnh",
      },
    ],
  },
  alternates: {
    canonical: "/",
    languages: {
      vi: "/",
      en: "/",
    },
  },
}

// Add structured data for homepage
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Bóc Mệnh - Trang Chủ",
  description: "Khám phá vận mệnh, giải mơ, xem tướng số online",
  url: baseUrl,
  mainEntity: {
    "@type": "ItemList",
    name: "Dịch vụ Bóc Mệnh",
    description: "Các dịch vụ bói toán và phong thủy online",
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        name: "Bóc Mệnh Cá Nhân",
        description: "Khám phá vận mệnh qua ngày sinh",
        url: `${baseUrl}/destiny`,
      },
      {
        "@type": "Service",
        position: 2,
        name: "Giải Mơ",
        description: "Giải thích ý nghĩa giấc mơ",
        url: `${baseUrl}/dreams`,
      },
      {
        "@type": "Service",
        position: 3,
        name: "Thần Số Học",
        description: "Phân tích số may mắn",
        url: `${baseUrl}/numerology`,
      },
      {
        "@type": "Service",
        position: 4,
        name: "Tarot",
        description: "Bói bài Tarot online",
        url: `${baseUrl}/tarot`,
      },
      {
        "@type": "Service",
        position: 5,
        name: "Phong Thủy",
        description: "Tư vấn phong thủy",
        url: `${baseUrl}/fengshui`,
      },
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
