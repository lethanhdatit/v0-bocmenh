import type { Metadata } from "next"
import { createSEOMetadata } from "@/lib/seo/metadata"
import MovingDateForm from "@/components/forms/MovingDateForm"

export async function generateMetadata(): Promise<Metadata> {
  return createSEOMetadata({
    title: "Chọn Ngày Chuyển Nhà Tốt - Phong Thủy Chuyển Nhà | Bóc Mệnh",
    description: "🏠 Chọn ngày chuyển nhà tốt theo phong thủy và thần số học. Tính toán dựa trên ngày sinh để tìm ngày chuyển nhà may mắn, thuận lợi nhất cho gia đình.",
    keywords: "chọn ngày chuyển nhà, phong thủy chuyển nhà, ngày tốt chuyển nhà, xem ngày chuyển nhà, tính ngày chuyển nhà hợp tuổi, ngày lành chuyển nhà",
    ogImage: "/imgs/moving-date-og.jpg",
    canonicalUrl: "/moving-date",
    alternateLanguages: {
      vi: `/moving-date`,
      en: `/moving-date`,
    },
  })
}

export default function MovingDatePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://bocmenh.com/moving-date#service",
        "name": "Chọn Ngày Chuyển Nhà Tốt",
        "description": "Dịch vụ tư vấn chọn ngày chuyển nhà theo phong thủy và thần số học",
        "provider": {
          "@type": "Organization",
          "name": "Bóc Mệnh",
          "url": "https://bocmenh.com"
        },
        "serviceType": "Moving Date Consultation",
        "areaServed": "Vietnam",
        "availableLanguage": ["vi", "en", "zh"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND",
          "description": "Tư vấn ngày chuyển nhà miễn phí"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://bocmenh.com/moving-date",
        "name": "Chọn Ngày Chuyển Nhà Tốt - Phong Thủy Chuyển Nhà",
        "description": "Trang tư vấn chọn ngày chuyển nhà tốt theo phong thủy",
        "url": "https://bocmenh.com/moving-date",
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
              "name": "Chọn Ngày Chuyển Nhà",
              "item": "https://bocmenh.com/moving-date"
            }
          ]
        },
        "mainEntity": {
          "@id": "https://bocmenh.com/moving-date#service"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Tại sao cần chọn ngày chuyển nhà theo phong thủy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Theo phong thủy, ngày chuyển nhà ảnh hưởng đến vận khí của gia đình. Chọn ngày tốt giúp gia đình thuận lợi, may mắn và phát tài phát lộc."
            }
          },
          {
            "@type": "Question",
            "name": "Những yếu tố nào cần xem xét khi chọn ngày chuyển nhà?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Cần xem xét ngày sinh của gia chủ, hướng nhà mới, tuổi tác của các thành viên trong gia đình và tránh những ngày xung khắc."
            }
          },
          {
            "@type": "Question",
            "name": "Có nên chuyển nhà vào những ngày đặc biệt không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nên tránh chuyển nhà vào ngày Tết, rằm, ngày giỗ tổ tiên và những ngày có ý nghĩa tâm linh đặc biệt trong gia đình."
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
      <MovingDateForm />
    </>
  );
}
