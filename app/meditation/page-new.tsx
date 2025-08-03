import { Metadata } from "next"
import { createSEOMetadata } from "@/lib/seo/metadata"
import MeditationPageClient from "./MeditationPageClient"

export async function generateMetadata(): Promise<Metadata> {
  
  return createSEOMetadata({
    title: "Thiền Định Cá Nhân Hóa - Hướng Dẫn Thiền Theo Tâm Linh | Bóc Mệnh",
    description: "🧘‍♀️ Khám phá phương pháp thiền phù hợp với bạn. AI phân tích và đề xuất bài thiền cá nhân hóa dựa trên mục tiêu, kinh nghiệm và thời gian của bạn.",
    keywords: "thiền định cá nhân hóa, hướng dẫn thiền, meditation vietnam, thiền tâm linh, thiền cho người mới, thiền giảm stress, mindfulness vietnam",
    ogImage: "/imgs/meditation-og.jpg",
    canonicalUrl: "/meditation"
  })
}

export default function MeditationPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://bocmenh.com/meditation#service",
        "name": "Thiền Định Cá Nhân Hóa",
        "description": "Dịch vụ hướng dẫn thiền cá nhân hóa với AI, phù hợp với mọi trình độ",
        "provider": {
          "@type": "Organization",
          "name": "Bóc Mệnh",
          "url": "https://bocmenh.com"
        },
        "serviceType": "Meditation Guidance",
        "areaServed": "Vietnam",
        "availableLanguage": ["vi", "en", "zh"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND",
          "description": "Hướng dẫn thiền miễn phí với AI"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://bocmenh.com/meditation",
        "name": "Thiền Định Cá Nhân Hóa - Hướng Dẫn Thiền Theo Tâm Linh",
        "description": "Trang hướng dẫn thiền cá nhân hóa với AI",
        "url": "https://bocmenh.com/meditation",
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
              "name": "Thiền Định",
              "item": "https://bocmenh.com/meditation"
            }
          ]
        },
        "mainEntity": {
          "@id": "https://bocmenh.com/meditation#service"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Thiền có thật sự hiệu quả không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Thiền đã được khoa học chứng minh có hiệu quả trong việc giảm stress, cải thiện tập trung, tăng cường sức khỏe tinh thần và thể chất."
            }
          },
          {
            "@type": "Question",
            "name": "Tôi mới bắt đầu thiền, nên bắt đầu như thế nào?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bắt đầu với 5-10 phút mỗi ngày, chọn nơi yên tĩnh, tập trung vào hơi thở. Hệ thống AI sẽ đề xuất bài thiền phù hợp cho người mới bắt đầu."
            }
          },
          {
            "@type": "Question",
            "name": "Thiền có cần thiết bị gì đặc biệt không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Không cần thiết bị đặc biệt. Chỉ cần một nơi yên tĩnh, thoải mái để ngồi hoặc nằm. Có thể sử dụng nhạc thiền nhẹ nhàng để hỗ trợ."
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
      <MeditationPageClient />
    </>
  );
}
