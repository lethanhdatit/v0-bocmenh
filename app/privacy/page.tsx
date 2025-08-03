import type { Metadata } from "next"
import PrivacyPageClient from "./PrivacyPageClient"
import { createSEOMetadata } from "@/lib/seo/metadata"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl()

export const metadata: Metadata = createSEOMetadata({
  title: "Chính Sách Bảo Mật - Bóc Mệnh | Cam Kết Bảo Vệ Thông Tin Cá Nhân",
  description: "📋 Tìm hiểu cách Bóc Mệnh thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn. Cam kết minh bạch về chính sách bảo mật và quyền riêng tư người dùng.",
  keywords: "chính sách bảo mật, quyền riêng tư, bảo vệ thông tin, GDPR, bảo mật dữ liệu, điều khoản sử dụng",
  ogImage: "/og-privacy.jpg",
  canonicalUrl: "/privacy",
  alternateLanguages: {
    vi: `/privacy`,
    en: `/privacy`,
  },
})

// Structured data cho trang privacy
const privacyStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Chính Sách Bảo Mật",
  description: "Chính sách bảo mật và quyền riêng tư của Bóc Mệnh",
  url: `${baseUrl}/privacy`,
  mainEntity: {
    "@type": "Article",
    name: "Chính Sách Bảo Mật Bóc Mệnh",
    description: "Thông tin chi tiết về cách thức thu thập, sử dụng và bảo vệ dữ liệu người dùng",
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split('T')[0],
    author: {
      "@type": "Organization",
      name: "Bóc Mệnh"
    },
    publisher: {
      "@type": "Organization", 
      name: "Bóc Mệnh"
    }
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
        name: "Chính sách bảo mật",
        item: `${baseUrl}/privacy`,
      },
    ],
  },
}

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyStructuredData),
        }}
      />
      <PrivacyPageClient />
    </>
  )
}
