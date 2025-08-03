import type { Metadata } from "next"
import TermsPageClient from "./TermsPageClient"
import { createSEOMetadata } from "@/lib/seo/metadata"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl()

export const metadata: Metadata = createSEOMetadata({
  title: "Điều Khoản Dịch Vụ - Bóc Mệnh | Quy Định Và Điều Kiện Sử Dụng",
  description: "📜 Điều khoản và điều kiện sử dụng dịch vụ Bóc Mệnh. Quy định pháp lý, quyền và nghĩa vụ của người dùng khi sử dụng các dịch vụ bói toán, phong thủy online.",
  keywords: "điều khoản dịch vụ, điều kiện sử dụng, quy định pháp lý, thỏa thuận người dùng, quyền và nghĩa vụ",
  ogImage: "/og-terms.jpg",
  canonicalUrl: "/terms",
  alternateLanguages: {
    vi: `/terms`,
    en: `/terms`,
  },
})

// Structured data cho trang terms
const termsStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Điều Khoản Dịch Vụ",
  description: "Điều khoản và điều kiện sử dụng dịch vụ Bóc Mệnh",
  url: `${baseUrl}/terms`,
  mainEntity: {
    "@type": "Article",
    name: "Điều Khoản Dịch Vụ Bóc Mệnh",
    description: "Quy định pháp lý về việc sử dụng các dịch vụ của Bóc Mệnh",
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
        name: "Điều khoản dịch vụ",
        item: `${baseUrl}/terms`,
      },
    ],
  },
}

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(termsStructuredData),
        }}
      />
      <TermsPageClient />
    </>
  )
}
