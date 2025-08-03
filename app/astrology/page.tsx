import type { Metadata } from "next"
import AstrologyForm from "@/components/forms/AstrologyForm"
import { createSEOMetadata } from "@/lib/seo/metadata"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl()

export const metadata: Metadata = createSEOMetadata({
  title: "Biểu Đồ Sao Cá Nhân - Chiêm Tinh Học AI | Khám Phá Bản Đồ Sao Của Bạn",
  description: "⭐ Tạo biểu đồ sao cá nhân chi tiết với AI chiêm tinh học. Phân tích cung hoàng đạo, hành tinh, góc độ để hiểu rõ tính cách, vận mệnh và tiềm năng của bạn.",
  keywords: "biểu đồ sao, chiêm tinh học, astrology, cung hoàng đạo, bản đồ sao, natal chart, hành tinh, góc độ chiêm tinh, tính cách theo sao, vận mệnh theo sao",
  ogImage: "/og-astrology.jpg",
  canonicalUrl: "/astrology",
  alternateLanguages: {
    vi: `/astrology`,
    en: `/astrology`,
  },
})

export default function AstrologyPage() {
  // Structured data cho trang astrology
  const astrologyStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Biểu Đồ Sao Cá Nhân",
    description: "Dịch vụ tạo biểu đồ sao và chiêm tinh học cá nhân",
    url: `${baseUrl}/astrology`,
    mainEntity: {
      "@type": "Service",
      name: "Dịch vụ Chiêm Tinh Học AI",
      description: "Tạo biểu đồ sao cá nhân và phân tích chiêm tinh học",
      provider: {
        "@type": "Organization",
        name: "Bóc Mệnh"
      },
      serviceType: "Astrology Reading",
      areaServed: "VN",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "VND",
        description: "Dịch vụ biểu đồ sao miễn phí"
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
          name: "Biểu đồ sao",
          item: `${baseUrl}/astrology`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(astrologyStructuredData),
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
              Biểu Đồ Sao Cá Nhân
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá bản đồ sao của bạn và hiểu rõ hơn về tính cách, vận mệnh và tiềm năng của mình
            </p>
          </div>

          <AstrologyForm />
        </div>
      </div>
    </>
  )
}
