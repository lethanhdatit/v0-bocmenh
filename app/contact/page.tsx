import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"
import { createSEOMetadata } from "@/lib/seo/metadata"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl()

export const metadata: Metadata = createSEOMetadata({
  title: "Liên Hệ - Bóc Mệnh | Kết Nối Với Chúng Tôi 24/7",
  description: "📞 Liên hệ với Bóc Mệnh qua Facebook, YouTube, Zalo, Email. Hỗ trợ khách hàng 24/7, cơ hội hợp tác đối tác và affiliate marketing. Đội ngũ tư vấn chuyên nghiệp.",
  keywords: "liên hệ bóc mệnh, hỗ trợ khách hàng, đối tác affiliate, hợp tác quảng cáo, tư vấn phong thủy, liên hệ hỗ trợ, customer service",
  ogImage: "/og-contact.jpg",
  canonicalUrl: "/contact",
  alternateLanguages: {
    vi: `/contact`,
    en: `/contact`,
  },
})

export default function ContactPage() {
  // Structured data cho trang contact
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Liên Hệ",
    description: "Thông tin liên hệ và hỗ trợ khách hàng",
    url: `${baseUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "Bóc Mệnh",
      url: baseUrl,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          areaServed: "VN",
          availableLanguage: ["Vietnamese", "English"],
          telephone: "+84-xxx-xxx-xxx",
          email: "support@bocmenh.com"
        },
        {
          "@type": "ContactPoint", 
          contactType: "sales",
          areaServed: "VN",
          availableLanguage: ["Vietnamese"],
          email: "sales@bocmenh.com"
        }
      ],
      sameAs: [
        "https://facebook.com/bocmenh",
        "https://youtube.com/bocmenh",
        "https://zalo.me/bocmenh"
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
          name: "Liên hệ",
          item: `${baseUrl}/contact`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData),
        }}
      />
      <ContactPageClient />
    </>
  )
}
