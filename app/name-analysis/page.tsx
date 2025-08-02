import type { Metadata } from "next"
import { getTranslations } from "@/i18n/server"
import { createSEOMetadata } from "@/lib/seo/metadata"
import NameAnalysisForm from "@/components/forms/NameAnalysisForm"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo")
  
  return createSEOMetadata({
    title: "Phân Tích Thần Số Học Tên - Khám Phá Bí Mật Trong Tên | Bóc Mệnh",
    description: "🔢 Phân tích thần số học tên miễn phí. Khám phá số định mệnh, số cá tính, số linh hồn từ tên của bạn. Hiểu rõ tính cách, tài năng và vận mệnh qua từng chữ cái.",
    keywords: "phân tích tên thần số học, số định mệnh tên, phân tích tên miễn phí, thần số học vietnam, numerology name, số cá tính, số linh hồn, bói tên, xem tên tuổi",
    ogImage: "/imgs/name-analysis-og.jpg",
    canonicalUrl: "/name-analysis"
  })
}

export default function NameAnalysisPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://bocmenh.com/name-analysis#service",
        "name": "Phân Tích Thần Số Học Tên",
        "description": "Dịch vụ phân tích tên theo thần số học, khám phá số định mệnh, cá tính và linh hồn từ tên",
        "provider": {
          "@type": "Organization",
          "name": "Bóc Mệnh",
          "url": "https://bocmenh.com"
        },
        "serviceType": "Name Numerology Analysis",
        "areaServed": "Vietnam",
        "availableLanguage": ["vi", "en", "zh"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND",
          "description": "Phân tích tên miễn phí với thần số học"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Dịch Vụ Phân Tích Tên",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Tính Số Định Mệnh",
                "description": "Tính toán số định mệnh từ tên đầy đủ"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Phân Tích Số Cá Tính",
                "description": "Phân tích hình ảnh bên ngoài qua số cá tính"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Khám Phá Số Linh Hồn",
                "description": "Tìm hiểu động lực nội tại qua số linh hồn"
              }
            }
          ]
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://bocmenh.com/name-analysis",
        "name": "Phân Tích Thần Số Học Tên - Khám Phá Bí Mật Trong Tên",
        "description": "Trang phân tích tên theo thần số học với các công cụ tính toán chuyên nghiệp",
        "url": "https://bocmenh.com/name-analysis",
        "inLanguage": "vi",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Bóc Mệnh",
          "url": "https://bocmenh.com"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Trang Chủ",
              "item": "https://bocmenh.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Phân Tích Tên",
              "item": "https://bocmenh.com/name-analysis"
            }
          ]
        },
        "mainEntity": {
          "@id": "https://bocmenh.com/name-analysis#service"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Thần số học tên có chính xác không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Thần số học tên dựa trên hệ thống tính toán cổ xưa đã được sử dụng hàng ngàn năm. Kết quả mang tính tham khảo để hiểu rõ hơn về bản thân và tiềm năng."
            }
          },
          {
            "@type": "Question",
            "name": "Tên tiếng Việt có thể phân tích được không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Có, hệ thống của chúng tôi hỗ trợ phân tích cả tên tiếng Việt và tiếng Anh. Mỗi chữ cái đều có giá trị số học riêng."
            }
          },
          {
            "@type": "Question",
            "name": "Nên sử dụng tên đầy đủ hay tên gọi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nên sử dụng tên đầy đủ như trong giấy khai sinh để có kết quả chính xác nhất. Tên gọi hàng ngày cũng có thể phân tích để xem ảnh hưởng khác nhau."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent mb-4">
              Phân Tích Thần Số Học Tên
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Khám phá những bí mật ẩn giấu trong tên của bạn. Mỗi chữ cái đều mang một năng lượng riêng, ảnh hưởng đến
              tính cách, số phận và con đường cuộc đời.
            </p>
          </div>

          {/* Main Form */}
          <NameAnalysisForm />

          {/* Information Section */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="mystical-card">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">🔢 Số Định Mệnh</h3>
              <p className="text-gray-300">
                Được tính từ tổng tất cả chữ cái trong tên, thể hiện sứ mệnh và mục đích cuộc đời của bạn.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">👤 Số Cá Tính</h3>
              <p className="text-gray-300">
                Được tính từ các phụ âm trong tên, thể hiện hình ảnh bên ngoài và cách người khác nhìn nhận bạn.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">💖 Số Linh Hồn</h3>
              <p className="text-gray-300">
                Được tính từ các nguyên âm trong tên, thể hiện mong muốn sâu thẳm và động lực nội tại của bạn.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">🔤 Chữ Cái Đặc Biệt</h3>
              <p className="text-gray-300">
                Chữ cái đầu (Cornerstone) và cuối (Capstone) trong tên có ý nghĩa đặc biệt về cách tiếp cận và hoàn thành
                công việc.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">🔥 Số Đam Mê Ẩn Giấu</h3>
              <p className="text-gray-300">
                Những con số xuất hiện nhiều nhất trong tên, thể hiện tài năng tự nhiên và đam mê của bạn.
              </p>
            </div>

            <div className="mystical-card">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">📚 Bài Học Nghiệp Quả</h3>
              <p className="text-gray-300">
                Những con số không có trong tên, thể hiện các bài học cần phát triển để hoàn thiện bản thân.
              </p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-16 mystical-card">
            <h3 className="text-2xl font-bold text-yellow-500 mb-6 text-center">💡 Mẹo Sử Dụng Kết Quả</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">🎯 Phát Triển Bản Thân:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Tập trung phát triển điểm mạnh từ số định mệnh</li>
                  <li>• Khắc phục thách thức được chỉ ra</li>
                  <li>• Sử dụng màu sắc may mắn trong trang phục</li>
                  <li>• Chọn ngày may mắn cho các quyết định quan trọng</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">💼 Ứng Dụng Thực Tế:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Chọn nghề nghiệp phù hợp với số định mệnh</li>
                  <li>• Hiểu rõ hơn về bản thân và người khác</li>
                  <li>• Cải thiện mối quan hệ qua tương hợp số học</li>
                  <li>• Đặt tên con em theo nguyên tắc thần số học</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
