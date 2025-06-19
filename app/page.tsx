import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn | Trang Chủ",
  description:
    "Mỗi người là một hộp bí ẩn, hãy khám phá và bạn sẽ hiểu về chính mình. Dịch vụ bói toán, giải mơ, phong thủy online chính xác nhất Việt Nam.",
  keywords: "trang chủ bóc mệnh, khám phá vận mệnh, bói toán online, giải mơ, phong thủy, tarot, thần số học",
  openGraph: {
    title: "Bóc Mệnh - Khám Phá Vận Mệnh Của Bạn",
    description: "Mỗi người là một hộp bí ẩn, hãy khám phá và bạn sẽ hiểu về chính mình",
    url: "https://bocmenh.com",
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
    canonical: "https://bocmenh.com",
    languages: {
      vi: "https://bocmenh.com",
      en: "https://bocmenh.com/en",
    },
  },
}

// Add structured data for homepage
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Bóc Mệnh - Trang Chủ",
  description: "Khám phá vận mệnh, giải mơ, xem tướng số online",
  url: "https://bocmenh.com",
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
        url: "https://bocmenh.com/destiny",
      },
      {
        "@type": "Service",
        position: 2,
        name: "Giải Mơ",
        description: "Giải thích ý nghĩa giấc mơ",
        url: "https://bocmenh.com/dreams",
      },
      {
        "@type": "Service",
        position: 3,
        name: "Thần Số Học",
        description: "Phân tích số may mắn",
        url: "https://bocmenh.com/numerology",
      },
      {
        "@type": "Service",
        position: 4,
        name: "Tarot",
        description: "Bói bài Tarot online",
        url: "https://bocmenh.com/tarot",
      },
      {
        "@type": "Service",
        position: 5,
        name: "Phong Thủy",
        description: "Tư vấn phong thủy",
        url: "https://bocmenh.com/fengshui",
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
        item: "https://bocmenh.com",
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
