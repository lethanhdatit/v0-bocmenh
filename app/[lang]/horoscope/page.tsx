import { Metadata } from "next"
import { createSEOMetadata } from "@/lib/seo/metadata"
import HoroscopePageClient from "./HoroscopePageClient"

export async function generateMetadata(): Promise<Metadata> {
  return createSEOMetadata({
    title: "Bát Tự Hàng Ngày - Horoscope Cung Hoàng Đạo | Bóc Mệnh",
    description: "Xem bát tự hàng ngày miễn phí theo 12 cung hoàng đạo. Dự báo tình yêu, sự nghiệp, sức khỏe và tài chính. Khám phá vận mệnh và nhận lời khuyên hữu ích.",
    keywords: "bát tự hàng ngày, horoscope vietnam, cung hoàng đạo, dự báo bát tự, bát tự miễn phí, zodiac signs, astrology vietnam, bát tự tình yêu, bát tự sự nghiệp, bát tự tài chính",
    ogImage: "/imgs/horoscope-og.jpg",
    canonicalUrl: "/horoscope",
    alternateLanguages: {
      vi: `/horoscope`,
      en: `/horoscope`,
    },
  })
}

export default function HoroscopePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://bocmenh.com/horoscope#service",
        "name": "Bát Tự Hàng Ngày",
        "description": "Dịch vụ xem bát tự hàng ngày theo 12 cung hoàng đạo, dự báo vận mệnh và đưa ra lời khuyên",
        "provider": {
          "@type": "Organization",
          "name": "Bóc Mệnh",
          "url": "https://bocmenh.com"
        },
        "serviceType": "Horoscope Reading",
        "areaServed": "Vietnam",
        "availableLanguage": ["vi", "en", "zh"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND",
          "description": "Xem bát tự hàng ngày miễn phí"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Dịch Vụ Bát Tự",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Bát Tự Tình Yêu",
                "description": "Dự báo và lời khuyên về chuyện tình cảm"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Bát Tự Sự Nghiệp",
                "description": "Dự báo về công việc và cơ hội thăng tiến"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Bát Tự Tài Chính",
                "description": "Dự báo về vận may tài lộc và đầu tư"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Bát Tự Sức Khỏe",
                "description": "Lời khuyên về sức khỏe và tinh thần"
              }
            }
          ]
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://bocmenh.com/horoscope",
        "name": "Bát Tự Hàng Ngày - Horoscope Cung Hoàng Đạo",
        "description": "Trang xem bát tự hàng ngày theo 12 cung hoàng đạo với dự báo chi tiết",
        "url": "https://bocmenh.com/horoscope",
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
              "name": "Bát Tự Hàng Ngày",
              "item": "https://bocmenh.com/horoscope"
            }
          ]
        },
        "mainEntity": {
          "@id": "https://bocmenh.com/horoscope#service"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Bát tự hàng ngày có chính xác không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bát tự chỉ mang tính chất tham khảo và hướng dẫn. Độ chính xác phụ thuộc vào nhiều yếu tố và cuộc sống của bạn vẫn do chính bạn quyết định."
            }
          },
          {
            "@type": "Question",
            "name": "Có bao nhiêu cung hoàng đạo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Có 12 cung hoàng đạo: Bạch Dương, Kim Ngưu, Song Tử, Cự Giải, Sư Tử, Xử Nữ, Thiên Bình, Thiên Yết, Nhân Mã, Ma Kết, Bảo Bình và Song Ngư."
            }
          },
          {
            "@type": "Question",
            "name": "Bát tự dự báo những gì?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bát tự thường dự báo về tình yêu, sự nghiệp, sức khỏe, tài chính và các xu hướng tổng quát trong cuộc sống dựa trên cung hoàng đạo của bạn."
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
      <HoroscopePageClient />
    </>
  )
}
