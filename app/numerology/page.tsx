import type { Metadata } from "next"
import NumerologyForm from "@/components/forms/NumerologyForm"
import { getBaseUrl } from "@/lib/infra/utils"
import { createSEOMetadata } from "@/lib/seo/metadata"

const baseUrl = getBaseUrl();

export const metadata: Metadata = createSEOMetadata({
  title: "Thần Số Học - Khám Phá Bí Mật Cuộc Đời Qua Con Số | Numerology Online",
  description: "🔢 Phân tích thần số học AI dựa trên tên và ngày sinh. Khám phá số đường đời, số định mệnh, số linh hồn, số may mắn và dự báo tương lai chính xác nhất.",
  keywords: "thần số học, numerology, số đường đời, số định mệnh, số linh hồn, số cá tính, số may mắn, phân tích tên, chu kỳ cá nhân, AI thần số",
  ogImage: "/og-numerology.jpg",
  canonicalUrl: `${baseUrl}/numerology`,
  alternateLanguages: {
    vi: `${baseUrl}/numerology`,
    en: `${baseUrl}/numerology`,
  },
})

export default function NumerologyPage() {
  // Structured data cho trang thần số học
  const numerologyStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Thần Số Học",
    description: "Dịch vụ phân tích thần số học online",
    url: `${baseUrl}/numerology`,
    mainEntity: {
      "@type": "Service",
      name: "Dịch vụ Thần Số Học",
      description: "Phân tích số đường đời, số định mệnh và các con số quan trọng trong cuộc đời",
      provider: {
        "@type": "Organization",
        name: "Bóc Mệnh"
      },
      serviceType: "Numerology",
      areaServed: "VN",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "VND",
        description: "Dịch vụ thần số học miễn phí"
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
          name: "Thần Số Học",
          item: `${baseUrl}/numerology`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(numerologyStructuredData),
        }}
      />
      <main className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">Thần Số Học</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Khám phá bí mật cuộc đời qua con số. Phân tích tên và ngày sinh để hiểu rõ về tính cách, vận mệnh và con
              đường phía trước.
            </p>
          </div>

          <NumerologyForm />

          {/* Information Section */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4">🔢 Số Đường Đời</h3>
              <p className="text-gray-300 text-sm">
                Được tính từ ngày sinh, cho biết mục đích cuộc đời và những bài học quan trọng bạn cần trải qua.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4">🎯 Số Định Mệnh</h3>
              <p className="text-gray-300 text-sm">
                Được tính từ tên đầy đủ, thể hiện tài năng tự nhiên và những gì bạn được sinh ra để làm.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4">💎 Số Linh Hồn</h3>
              <p className="text-gray-300 text-sm">
                Được tính từ các nguyên âm trong tên, thể hiện động lực sâu thẳm và mong muốn của trái tim.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4">🎭 Số Cá Tính</h3>
              <p className="text-gray-300 text-sm">
                Được tính từ các phụ âm trong tên, cho biết cách người khác nhìn nhận bạn và ấn tượng đầu tiên.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4">🍀 Số May Mắn</h3>
              <p className="text-gray-300 text-sm">
                Những con số mang lại may mắn và năng lượng tích cực cho bạn trong cuộc sống và công việc.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-lg font-semibold text-yellow-500 mb-4">📅 Chu Kỳ Cá Nhân</h3>
              <p className="text-gray-300 text-sm">
                Phân tích năm, tháng, ngày cá nhân hiện tại để biết thời điểm thuận lợi cho các hoạt động.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
