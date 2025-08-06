import type { Metadata } from "next"
import { getBaseUrl } from "@/lib/infra/utils"
import { getFeatureConfig } from "@/lib/features/feature-flags"
import { ComingSoonPage } from "@/components/features/ComingSoonPage"
import DreamForm from "@/components/forms/DreamForm"
import DreamJournal from "@/components/sections/DreamJournal"
import DreamTips from "@/components/sections/DreamTips"
import { createSEOMetadata } from "@/lib/seo/metadata"

const baseUrl = getBaseUrl();

export const metadata: Metadata = createSEOMetadata({
  title: "Giải Mơ AI - Khám Phá Ý Nghĩa Giấc Mơ Với Trí Tuệ Nhân Tạo | Bóc Mệnh", 
  description: "🌙 Giải mã giấc mơ của bạn với AI thông minh nhất! Khám phá thông điệp từ tiềm thức, ý nghĩa tâm linh và lời khuyên từ giấc mơ. Dịch vụ giải mơ online chính xác #1 VN.",
  keywords: "giải mơ AI, giấc mơ, ý nghĩa giấc mơ, phân tích giấc mơ, giải mơ online, thông điệp tiềm thức, chiêm bao, mơ thấy gì, giải mơ miễn phí",
  ogImage: "/og-dreams.jpg",
  canonicalUrl: "/dreams",
  alternateLanguages: {
    vi: `/dreams`,
    en: `/dreams`,
  },
})

export default function DreamsPage() {
  const featureConfig = getFeatureConfig('/dreams');
  
  // Structured data cho trang giải mơ
  const dreamsStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Giải Mơ AI",
    description: "Dịch vụ giải mơ bằng trí tuệ nhân tạo",
    url: `${baseUrl}/dreams`,
    mainEntity: {
      "@type": "Service",
      name: "Dịch vụ Giải Mơ AI",
      description: "Phân tích và giải thích ý nghĩa giấc mơ bằng AI",
      provider: {
        "@type": "Organization",
        name: "Bóc Mệnh"
      },
      serviceType: "Dream Interpretation",
      areaServed: "VN",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "VND",
        description: "Dịch vụ giải mơ miễn phí"
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
          name: "Giải Mơ",
          item: `${baseUrl}/dreams`,
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
            __html: JSON.stringify(dreamsStructuredData),
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
          __html: JSON.stringify(dreamsStructuredData),
        }}
      />
      <main className="min-h-screen pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">Giải Mơ AI</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Khám phá ý nghĩa sâu xa của giấc mơ với công nghệ AI tiên tiến. Mỗi giấc mơ đều mang thông điệp từ tiềm thức
              của bạn.
            </p>
          </div>

          <DreamForm />
        </div>

        {/* Dream Journal Section */}
        <DreamJournal />

        {/* Dream Tips Section */}
        <DreamTips />
      </main>
    </>
  )
}
