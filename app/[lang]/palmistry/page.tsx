import { Metadata } from "next"
import { createSEOMetadata } from "@/lib/seo/metadata"
import PalmistryPageClient from "./PalmistryPageClient"

export async function generateMetadata(): Promise<Metadata> {
  return createSEOMetadata({
    title: "Xem Tướng Bàn Tay - Phán Đoán Vận Mệnh Qua Lòng Bàn Tay | Bóc Mệnh",
    description: "Xem tướng bàn tay miễn phí với AI. Phân tích 4 đường chính, dạng bàn tay, đoán tính cách và vận mệnh. Nghệ thuật xem tướng cổ xưa với công nghệ hiện đại.",
    keywords: "xem tướng bàn tay, phán đoán vận mệnh, đường đời, đường tình, đường trí, đường vận mệnh, xem tướng miễn phí, AI xem tướng, palmistry vietnam, dạng bàn tay, tính cách qua bàn tay, nghệ thuật xem tướng",
    ogImage: "/imgs/palmistry-og.jpg",
    canonicalUrl: "/palmistry",
    alternateLanguages: {
      vi: `/palmistry`,
      en: `/palmistry`,
    },
  })
}

export default function PalmistryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://bocmenh.com/palmistry#service",
        "name": "Xem Tướng Bàn Tay",
        "description": "Dịch vụ xem tướng bàn tay chuyên nghiệp, phân tích vận mệnh qua các đường nét trên lòng bàn tay",
        "provider": {
          "@type": "Organization",
          "name": "Bóc Mệnh",
          "url": "https://bocmenh.com"
        },
        "serviceType": "Palmistry Reading",
        "areaServed": "Vietnam",
        "availableLanguage": ["vi", "en", "zh"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND",
          "description": "Xem tướng bàn tay miễn phí với AI"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Dịch Vụ Xem Tướng Bàn Tay",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Phân Tích Đường Đời",
                "description": "Đọc và giải thích đường đời trên bàn tay"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Phân Tích Đường Tình",
                "description": "Đọc và giải thích đường tình yêu trên bàn tay"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Phân Tích Đường Trí",
                "description": "Đọc và giải thích đường trí tuệ trên bàn tay"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Phân Tích Đường Vận Mệnh", 
                "description": "Đọc và giải thích đường vận mệnh trên bàn tay"
              }
            }
          ]
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://bocmenh.com/palmistry",
        "name": "Xem Tướng Bàn Tay - Phán Đoán Vận Mệnh",
        "description": "Trang xem tướng bàn tay với AI, phân tích các đường chính và dạng bàn tay để đoán vận mệnh",
        "url": "https://bocmenh.com/palmistry",
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
              "name": "Xem Tướng Bàn Tay",
              "item": "https://bocmenh.com/palmistry"
            }
          ]
        },
        "mainEntity": {
          "@id": "https://bocmenh.com/palmistry#service"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Xem tướng bàn tay có chính xác không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Xem tướng bàn tay là nghệ thuật cổ xưa với độ chính xác phụ thuộc vào kinh nghiệm người đọc. AI của chúng tôi được huấn luyện trên dữ liệu lớn để đưa ra phân tích khách quan."
            }
          },
          {
            "@type": "Question", 
            "name": "Có mấy đường chính trên bàn tay?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Có 4 đường chính: Đường Đời (Life Line), Đường Tình (Heart Line), Đường Trí (Head Line) và Đường Vận Mệnh (Fate Line)."
            }
          },
          {
            "@type": "Question",
            "name": "Dạng bàn tay ảnh hưởng gì đến tính cách?",
            "acceptedAnswer": {
              "@type": "Answer", 
              "text": "Có 4 dạng bàn tay cơ bản theo nguyên tố: Đất (thực tế), Khí (giao tiếp), Hỏa (năng động), Thủy (nghệ thuật). Mỗi dạng thể hiện những đặc điểm tính cách khác nhau."
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
      <PalmistryPageClient />
    </>
  )
}
