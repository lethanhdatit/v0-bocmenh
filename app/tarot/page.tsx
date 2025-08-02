import type { Metadata } from "next"
import { getBaseUrl } from "@/lib/infra/utils"
import { getFeatureConfig } from "@/lib/features/feature-flags"
import { ComingSoonPage } from "@/components/features/ComingSoonPage"
import TarotForm from "@/components/forms/TarotForm"
import { createSEOMetadata } from "@/lib/seo/metadata"

const baseUrl = getBaseUrl();

export const metadata: Metadata = createSEOMetadata({
  title: "Bói Bài Tarot Online - Khám Phá Tương Lai Với AI Tarot | Bóc Mệnh",
  description: "🔮 Rút bài Tarot AI để khám phá tương lai, tình yêu, sự nghiệp chính xác nhất. Giải mã thông điệp từ vũ trụ với 78 lá bài Tarot mystical. Bói bài online miễn phí.",
  keywords: "bói tarot online, rút bài tarot, AI tarot, bói bài mystical, tương lai, tình yêu, sự nghiệp, tarot reading, lá bài tarot, bói toán tarot",
  ogImage: "/og-tarot.jpg",
  canonicalUrl: `${baseUrl}/tarot`,
  alternateLanguages: {
    vi: `${baseUrl}/tarot`,
    en: `${baseUrl}/tarot`,
  },
})

export default function TarotPage() {
  const featureConfig = getFeatureConfig('/tarot');
  
  // Structured data cho trang tarot
  const tarotStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Bói Bài Tarot",
    description: "Dịch vụ bói bài Tarot online với AI",
    url: `${baseUrl}/tarot`,
    mainEntity: {
      "@type": "Service",
      name: "Dịch vụ Bói Tarot AI",
      description: "Rút bài Tarot và giải mã thông điệp từ vũ trụ",
      provider: {
        "@type": "Organization",
        name: "Bóc Mệnh"
      },
      serviceType: "Tarot Reading",
      areaServed: "VN",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "VND",
        description: "Dịch vụ bói Tarot miễn phí"
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
          name: "Bói Tarot",
          item: `${baseUrl}/tarot`,
        },
      ],
    },
  };

  // Nếu feature coming soon, hiển thị coming soon page
  if (featureConfig?.status === 'coming-soon') {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(tarotStructuredData),
          }}
        />
        <ComingSoonPage 
          title={featureConfig.title}
          description={featureConfig.description}
          estimatedLaunch={featureConfig.estimatedLaunch}
        />
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tarotStructuredData),
        }}
      />
      <main className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">Bói Tarot Mystical</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Khám phá những bí ẩn của tương lai thông qua nghệ thuật Tarot cổ xưa. Mỗi lá bài mang một thông điệp từ vũ
              trụ dành riêng cho bạn.
            </p>
          </div>

          <TarotForm />
        </div>
      </main>
    </>
  )
}
