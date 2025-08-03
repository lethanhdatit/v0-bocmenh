import { Metadata } from "next"
import { createSEOMetadata } from "@/lib/seo/metadata"
import CompatibilityPageClient from "./CompatibilityPageClient"

export async function generateMetadata(): Promise<Metadata> {
  
  return createSEOMetadata({
    title: "Tương Hợp Tình Yêu - Kiểm Tra Độ Hợp Cung Hoàng Đạo & Thần Số | Bóc Mệnh",
    description: "💕 Khám phá mức độ tương hợp tình yêu qua thần số học và cung hoàng đạo. Phân tích tính cách, giao tiếp và tương lai của mối quan hệ. Báo cáo chi tiết về tình yêu, tình bạn.",
    keywords: "tương hợp tình yêu, cung hoàng đạo hợp nhau, thần số học tình yêu, kiểm tra độ hợp, tính cách cung hoàng đạo, love compatibility vietnam",
    ogImage: "/imgs/compatibility-og.jpg",
    canonicalUrl: "/compatibility"
  })
}

export default function CompatibilityPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://bocmenh.com/compatibility#service",
        "name": "Dịch Vụ Tương Hợp Tình Yêu",
        "description": "Phân tích tương hợp giữa hai người qua thần số học và cung hoàng đạo, đánh giá tình yêu, tình bạn và công việc",
        "provider": {
          "@type": "Organization",
          "name": "Bóc Mệnh",
          "url": "https://bocmenh.com"
        },
        "serviceType": "Love Compatibility Analysis",
        "areaServed": "Vietnam",
        "availableLanguage": ["vi", "en", "zh"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND",
          "description": "Phân tích tương hợp miễn phí"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://bocmenh.com/compatibility",
        "name": "Tương Hợp Tình Yêu - Kiểm Tra Độ Hợp Cung Hoàng Đạo",
        "description": "Trang kiểm tra tương hợp tình yêu và các mối quan hệ",
        "url": "https://bocmenh.com/compatibility",
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
              "name": "Tương Hợp",
              "item": "https://bocmenh.com/compatibility"
            }
          ]
        },
        "mainEntity": {
          "@id": "https://bocmenh.com/compatibility#service"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Tương hợp cung hoàng đạo có chính xác không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tương hợp cung hoàng đạo cung cấp cái nhìn tổng quan về tính cách và xu hướng. Nó là công cụ tham khảo hữu ích nhưng không quyết định hoàn toàn số phận mối quan hệ."
            }
          },
          {
            "@type": "Question",
            "name": "Cung hoàng đạo nào hợp nhất với nhau?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Các cặp cung hợp nhau phổ biến: Bạch Dương-Sư Tử, Kim Ngưu-Xử Nữ, Song Tử-Thiên Bình, Cự Giải-Bọ Cạp, Nhân Mã-Bạch Dương, Ma Kết-Kim Ngưu, Bảo Bình-Song Tử, Song Ngư-Cử Giải."
            }
          },
          {
            "@type": "Question",
            "name": "Thần số học ảnh hưởng như thế nào đến tương hợp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Thần số học phân tích số đường đời, số định mệnh để đánh giá sự hòa hợp về mục tiêu cuộc sống, cách giao tiếp và khả năng hỗ trợ lẫn nhau trong mối quan hệ."
            }
          },
          {
            "@type": "Question",
            "name": "Tương hợp thấp có nghĩa là không nên yêu nhau?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Không hẳn. Tương hợp thấp chỉ cho thấy cần nhiều hiểu biết và thấu hiểu hơn. Tình yêu thật sự có thể vượt qua mọi khác biệt với sự nỗ lực của cả hai người."
            }
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Các Loại Tương Hợp",
        "description": "Danh sách các loại phân tích tương hợp có sẵn",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Tương Hợp Tình Yêu",
            "description": "Phân tích mức độ hòa hợp trong tình yêu và hôn nhân"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Tương Hợp Bạn Bè",
            "description": "Đánh giá mức độ phù hợp trong tình bạn"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Tương Hợp Công Việc",
            "description": "Phân tích khả năng làm việc cùng nhau"
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "Cách Kiểm Tra Tương Hợp Tình Yêu",
        "description": "Hướng dẫn từng bước để kiểm tra tương hợp",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Bước 1: Nhập thông tin",
            "text": "Cung cấp tên và ngày sinh của hai người cần kiểm tra tương hợp"
          },
          {
            "@type": "HowToStep",
            "name": "Bước 2: Hệ thống phân tích",
            "text": "AI tính toán các chỉ số thần số học và phân tích cung hoàng đạo"
          },
          {
            "@type": "HowToStep",
            "name": "Bước 3: Nhận kết quả",
            "text": "Xem báo cáo chi tiết về mức độ tương hợp và lời khuyên cho mối quan hệ"
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
      <CompatibilityPageClient />
    </>
  );
}
