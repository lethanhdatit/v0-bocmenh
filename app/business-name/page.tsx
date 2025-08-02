import type { Metadata } from "next"
import { getTranslations } from "@/i18n/server"
import { createSEOMetadata } from "@/lib/seo/metadata"
import BusinessNameForm from "@/components/forms/BusinessNameForm"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo")
  
  return createSEOMetadata({
    title: "Phân Tích Tên Doanh Nghiệp - Thần Số Học Kinh Doanh | Bóc Mệnh",
    description: "Phân tích tên doanh nghiệp theo thần số học miễn phí. Khám phá năng lượng cốt lõi, tiềm năng thành công và chiến lược phát triển tối ưu cho công ty của bạn.",
    keywords: "phân tích tên doanh nghiệp, thần số học kinh doanh, tên công ty, phong thủy doanh nghiệp, số định mệnh công ty, marketing thần số học, chiến lược kinh doanh, thần số học vietnam, business numerology",
    ogImage: "/imgs/business-name-og.jpg",
    canonicalUrl: "/business-name"
  })
}

export default function BusinessNamePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://bocmenh.com/business-name#service",
        "name": "Phân Tích Tên Doanh Nghiệp",
        "description": "Dịch vụ phân tích tên doanh nghiệp theo thần số học, đánh giá tiềm năng kinh doanh và tư vấn chiến lược phát triển",
        "provider": {
          "@type": "Organization",
          "name": "Bóc Mệnh",
          "url": "https://bocmenh.com"
        },
        "serviceType": "Business Name Analysis",
        "areaServed": "Vietnam",
        "availableLanguage": ["vi", "en", "zh"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND",
          "description": "Phân tích tên doanh nghiệp miễn phí với AI"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Dịch Vụ Phân Tích Doanh Nghiệp",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Phân Tích Số Định Mệnh Công Ty",
                "description": "Tính toán và giải thích số định mệnh của doanh nghiệp"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Tư Vấn Chiến Lược Marketing",
                "description": "Đưa ra lời khuyên marketing phù hợp với đặc tính thần số học"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Dự Báo Tiềm Năng Thành Công",
                "description": "Đánh giá khả năng phát triển và thách thức của doanh nghiệp"
              }
            }
          ]
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://bocmenh.com/business-name",
        "name": "Phân Tích Tên Doanh Nghiệp - Thần Số Học Kinh Doanh",
        "description": "Trang phân tích tên doanh nghiệp theo thần số học, tư vấn chiến lược kinh doanh và marketing",
        "url": "https://bocmenh.com/business-name",
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
              "name": "Phân Tích Tên Doanh Nghiệp",
              "item": "https://bocmenh.com/business-name"
            }
          ]
        },
        "mainEntity": {
          "@id": "https://bocmenh.com/business-name#service"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Phân tích tên doanh nghiệp theo thần số học có hiệu quả không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Thần số học đã được sử dụng trong kinh doanh hàng ngàn năm. Việc phân tích tên doanh nghiệp giúp hiểu rõ năng lượng cốt lõi và định hướng chiến lược phù hợp."
            }
          },
          {
            "@type": "Question",
            "name": "Những yếu tố nào được phân tích trong tên doanh nghiệp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Chúng tôi phân tích Số Định Mệnh, Số Cá Tính, Số Linh Hồn của tên công ty, cùng với tương tác giữa các con số này để đưa ra lời khuyên toàn diện."
            }
          },
          {
            "@type": "Question",
            "name": "Có cần cung cấp ngày sinh chủ doanh nghiệp không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ngày sinh chủ doanh nghiệp là thông tin tùy chọn nhưng sẽ giúp phân tích chính xác hơn về sự tương thích giữa người lãnh đạo và doanh nghiệp."
            }
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Phân Tích Tên Doanh Nghiệp
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Khám phá năng lượng thần số học của tên doanh nghiệp, tiềm năng thành công và những yếu tố quan trọng cho sự
              phát triển bền vững
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <BusinessNameForm />
          </div>

          {/* Benefits Section */}
          <div className="mt-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Lợi Ích Của Phân Tích Tên Doanh Nghiệp</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Định Hướng Chiến Lược</h3>
                <p className="text-gray-600">
                  Hiểu rõ năng lượng cốt lõi của doanh nghiệp để xây dựng chiến lược kinh doanh phù hợp
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Tối Ưu Marketing</h3>
                <p className="text-gray-600">
                  Nhận được lời khuyên marketing và branding phù hợp với đặc tính thần số học
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">📈</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Dự Báo Thành Công</h3>
                <p className="text-gray-600">Đánh giá tiềm năng thành công và những thách thức cần vượt qua</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Cách Thức Hoạt Động</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Nhập Thông Tin</h3>
                  <p className="text-gray-600">
                    Cung cấp tên doanh nghiệp, loại hình kinh doanh và ngày sinh chủ doanh nghiệp (tùy chọn)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Tính Toán Thần Số</h3>
                  <p className="text-gray-600">
                    Hệ thống tính toán các con số quan trọng: Số Định Mệnh, Số Cá Tính, Số Linh Hồn
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Phân Tích Toàn Diện</h3>
                  <p className="text-gray-600">
                    Nhận được báo cáo chi tiết về tiềm năng, thách thức, lời khuyên marketing và chiến lược
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
