import type { Metadata } from "next"
import { createSEOMetadata } from "@/lib/seo/metadata"
import WeddingDateForm from "@/components/forms/WeddingDateForm"
import { Calendar, Heart, Star, Sparkles } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  return createSEOMetadata({
    title: "Chọn Ngày Cưới Hợp Tuổi - Phong Thủy Ngày Cưới | Bóc Mệnh",
    description: "🎎 Chọn ngày cưới hợp tuổi theo thần số học và phong thủy. Phân tích ngày cưới tốt nhất cho cặp đôi, tính toán độ hợp và lời khuyên màu sắc, hướng cưới.",
    keywords: "chọn ngày cưới, ngày cưới hợp tuổi, phong thủy ngày cưới, thần số học cưới hỏi, tính ngày cưới, ngày tốt cưới hỏi, xem ngày cưới, wedding date vietnam",
    ogImage: "/imgs/wedding-date-og.jpg",
    canonicalUrl: "/wedding-date",
    alternateLanguages: {
      vi: `/wedding-date`,
      en: `/wedding-date`,
    },
  })
}

export default async function WeddingDatePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://bocmenh.com/wedding-date#service",
        "name": "Chọn Ngày Cưới Hợp Tuổi",
        "description": "Dịch vụ tư vấn chọn ngày cưới tốt nhất theo thần số học và phong thủy",
        "provider": {
          "@type": "Organization",
          "name": "Bóc Mệnh",
          "url": "https://bocmenh.com"
        },
        "serviceType": "Wedding Date Analysis",
        "areaServed": "Vietnam",
        "availableLanguage": ["vi", "en", "zh"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND",
          "description": "Phân tích ngày cưới miễn phí"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://bocmenh.com/wedding-date",
        "name": "Chọn Ngày Cưới Hợp Tuổi - Phong Thủy Ngày Cưới",
        "description": "Trang tư vấn chọn ngày cưới tốt nhất theo thần số học và phong thủy",
        "url": "https://bocmenh.com/wedding-date",
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
              "name": "Chọn Ngày Cưới",
              "item": "https://bocmenh.com/wedding-date"
            }
          ]
        },
        "mainEntity": {
          "@id": "https://bocmenh.com/wedding-date#service"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Tại sao cần chọn ngày cưới hợp tuổi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ngày cưới theo phong thủy và thần số học có thể ảnh hưởng đến vận mệnh hôn nhân. Chọn ngày tốt giúp cặp đôi có cuộc sống hạnh phúc và thuận hòa hơn."
            }
          },
          {
            "@type": "Question",
            "name": "Làm sao để biết ngày cưới có hợp tuổi không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Cần tính toán dựa trên ngày sinh của cả hai người, sau đó phân tích theo thần số học để tìm ra ngày có năng lượng tích cực nhất cho cặp đôi."
            }
          },
          {
            "@type": "Question",
            "name": "Có nên tránh những ngày nào để cưới?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Theo phong thủy, nên tránh những ngày có năng lượng tiêu cực, ngày xung khắc với tuổi của cô dâu chú rể, và những ngày đặc biệt theo tín ngưỡng dân gian."
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-800 dark:text-purple-300 mb-4">
              Chọn Ngày Cưới Hợp Tuổi
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Khám phá ngày cưới hoàn hảo cho bạn dựa trên thần số học và phong thủy cổ xưa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4 text-purple-600 dark:text-purple-400">
                <Calendar size={24} className="mr-3" />
                <h2 className="text-xl font-semibold">Lựa Chọn Khôn Ngoan</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Ngày cưới mang năng lượng mạnh mẽ có thể ảnh hưởng đến hôn nhân của bạn. Phân tích của chúng tôi giúp bạn chọn ngày phù hợp với năng lượng cá nhân và hỗ trợ sự hòa hợp.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4 text-purple-600 dark:text-purple-400">
                <Heart size={24} className="mr-3" />
                <h2 className="text-xl font-semibold">Phân Tích Cá Nhân Hóa</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Chúng tôi xem xét ngày sinh của cả hai người để cung cấp phân tích tương thích toàn diện, đảm bảo ngày cưới hòa hợp với động lực riêng của cặp đôi.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300 inline-flex items-center">
                <Sparkles size={24} className="mr-2 text-yellow-500" />
                Cách Thức Hoạt Động
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Nhập Thông Tin</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Cung cấp ngày cưới dự kiến và tùy chọn ngày sinh của cả hai để phân tích chi tiết hơn.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Nhận Phân Tích</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Hệ thống tính toán ý nghĩa thần số học và độ tương thích của ngày bạn chọn.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Lên Kế Hoạch Tự Tin</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Sử dụng gợi ý về màu sắc, nguyên tố và thời gian để tạo ra lễ cưới hài hòa.
                </p>
              </div>
            </div>
          </div>

          <WeddingDateForm className="mb-12" />

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4 text-purple-600 dark:text-purple-400">
              <Star size={24} className="mr-3" />
              <h2 className="text-xl font-semibold">Tại Sao Ngày Cưới Quan Trọng</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Trong nhiều truyền thống, ngày cưới được cho là ảnh hưởng đến tương lai của cuộc hôn nhân. Thần số học cung cấp cái nhìn sâu sắc về những phẩm chất năng lượng của các ngày khác nhau, giúp các cặp đôi chọn một ngày hỗ trợ sự kết hợp của họ.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Mỗi ngày mang một rung động độc đáo có thể tăng cường các khía cạnh nhất định trong mối quan hệ của bạn. Dù bạn đang tìm kiếm sự ổn định, đam mê, phát triển hay hài hòa, việc hiểu ý nghĩa thần số học của ngày cưới có thể giúp bạn điều chỉnh lễ kỷ niệm với mục tiêu mối quan hệ.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
