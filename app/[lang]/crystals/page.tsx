import { Metadata } from "next"
import { createSEOMetadata } from "@/lib/seo/metadata"
import CrystalsPageClient from "./CrystalsPageClient"

export async function generateMetadata(): Promise<Metadata> {
  return createSEOMetadata({
    title: "Đá Quý Chữa Lành - Hướng Dẫn Chọn Đá Quý Theo Tâm Linh | Bóc Mệnh",
    description: "💎 Khám phá sức mạnh chữa lành của đá quý. AI gợi ý đá phù hợp với cung hoàng đạo, chakra và mục đích cá nhân. Hướng dẫn sử dụng và bảo quản đá quý.",
    keywords: "đá quý chữa lành, crystal healing vietnam, đá quý theo cung hoàng đạo, chakra healing, đá quý tâm linh, đá phong thủy, crystal therapy",
    ogImage: "/imgs/crystals-og.jpg",
    canonicalUrl: "/crystals",
    alternateLanguages: {
      vi: `/crystals`,
      en: `/crystals`,
    },
  })
}

export default function CrystalsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://bocmenh.com/crystals#service",
        "name": "Dịch Vụ Tư Vấn Đá Quý Chữa Lành",
        "description": "Tư vấn chọn đá quý phù hợp cho chữa lành tâm linh, cân bằng chakra và hỗ trợ cảm xúc",
        "provider": {
          "@type": "Organization",
          "name": "Bóc Mệnh",
          "url": "https://bocmenh.com"
        },
        "serviceType": "Crystal Healing Consultation",
        "areaServed": "Vietnam",
        "availableLanguage": ["vi", "en", "zh"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND",
          "description": "Tư vấn đá quý miễn phí với AI"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://bocmenh.com/crystals",
        "name": "Đá Quý Chữa Lành - Hướng Dẫn Chọn Đá Quý Theo Tâm Linh",
        "description": "Trang hướng dẫn chọn và sử dụng đá quý chữa lành",
        "url": "https://bocmenh.com/crystals",
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
              "name": "Đá Quý Chữa Lành",
              "item": "https://bocmenh.com/crystals"
            }
          ]
        },
        "mainEntity": {
          "@id": "https://bocmenh.com/crystals#service"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Đá quý chữa lành có thật sự hiệu quả không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Đá quý được sử dụng trong chữa lành tâm linh hàng ngàn năm. Chúng tác động thông qua năng lượng rung động, giúp cân bằng chakra và hỗ trợ tâm lý tích cực."
            }
          },
          {
            "@type": "Question",
            "name": "Làm thế nào để chọn đá quý phù hợp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Chọn đá quý dựa trên mục đích (chữa lành cảm xúc, bảo vệ, tăng năng lượng), cung hoàng đạo, chakra cần cân bằng và cảm nhận trực giác cá nhân."
            }
          },
          {
            "@type": "Question",
            "name": "Cách làm sạch và nạp năng lượng đá quý?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Làm sạch đá bằng ánh sáng trăng tròn, khói xông, nước chảy hoặc âm thanh. Nạp năng lượng bằng cách đặt ý định rõ ràng và thiền cùng đá."
            }
          },
          {
            "@type": "Question",
            "name": "Đá quý nào tốt cho từng chakra?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mỗi chakra có đá tương ứng: Chakra gốc (Garnet, Hematite), Chakra sinh tồn (Carnelian), Chakra năng lượng (Citrine), Chakra tim (Rose Quartz), Chakra cổ họng (Sodalite), Chakra mày (Amethyst), Chakra đầu (Clear Quartz)."
            }
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Lợi Ích Của Đá Quý Chữa Lành",
        "description": "Các lợi ích chính của việc sử dụng đá quý trong chữa lành",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Chữa Lành Cảm Xúc",
            "description": "Giải phóng tổn thương cảm xúc và thúc đẩy bình an nội tâm"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Bảo Vệ Năng Lượng",
            "description": "Che chắn khỏi năng lượng tiêu cực và tạo trường bảo vệ"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Phát Triển Tâm Linh",
            "description": "Tăng cường thiền định, trực giác và kết nối tâm linh"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Thu Hút Thịnh Vượng",
            "description": "Khuếch đại ý định và thu hút sự giàu có vào cuộc sống"
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
      <CrystalsPageClient />
    </>
  );
}
