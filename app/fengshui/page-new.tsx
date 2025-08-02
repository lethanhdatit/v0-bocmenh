import { Metadata } from "next"
import { getTranslations } from "@/i18n/server"
import { createSEOMetadata } from "@/lib/seo/metadata"
import FengShuiPageClient from "./FengShuiPageClient"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("seo")
  
  return createSEOMetadata({
    title: "Phong Thủy Tổng Hợp - Công Cụ & Hướng Dẫn Phong Thủy Việt Nam | Bóc Mệnh",
    description: "🏠 Khám phá nghệ thuật Phong Thủy cổ truyền. Tính số quẻ, chọn hướng nhà, góc tài lộc, Cửu Tinh Phi Phủ. Hướng dẫn chi tiết để tạo không gian sống hài hòa.",
    keywords: "phong thủy việt nam, số quẻ cá nhân, hướng nhà tốt, góc tài lộc, cửu tinh phi phủ, ngũ hành, phong thủy nhà ở, lịch phong thủy",
    ogImage: "/imgs/fengshui-og.jpg",
    canonicalUrl: "/fengshui"
  })
}

export default function FengShuiPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://bocmenh.com/fengshui#service",
        "name": "Dịch Vụ Phong Thủy Tổng Hợp",
        "description": "Tư vấn phong thủy chuyên nghiệp với các công cụ: số quẻ cá nhân, hướng nhà, góc tài lộc, Cửu Tinh Phi Phủ",
        "provider": {
          "@type": "Organization",
          "name": "Bóc Mệnh",
          "url": "https://bocmenh.com"
        },
        "serviceType": "Feng Shui Consultation",
        "areaServed": "Vietnam",
        "availableLanguage": ["vi", "en", "zh"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Các Dịch Vụ Phong Thủy",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Tính Số Quẻ Cá Nhân",
                "description": "Xác định số quẻ và hướng tốt theo phong thủy"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Tư Vấn Hướng Nhà",
                "description": "Chọn hướng nhà phù hợp với gia chủ"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Góc Tài Lộc",
                "description": "Xác định và kích hoạt góc tài lộc trong nhà"
              }
            }
          ]
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://bocmenh.com/fengshui",
        "name": "Phong Thủy Tổng Hợp - Công Cụ & Hướng Dẫn Phong Thủy",
        "description": "Trang tổng hợp các công cụ và hướng dẫn phong thủy chuyên nghiệp",
        "url": "https://bocmenh.com/fengshui",
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
              "name": "Phong Thủy",
              "item": "https://bocmenh.com/fengshui"
            }
          ]
        },
        "mainEntity": {
          "@id": "https://bocmenh.com/fengshui#service"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Phong thủy có thật sự hiệu quả không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Phong thủy là nghệ thuật sắp xếp không gian sống hài hòa được áp dụng hàng ngàn năm. Nhiều nghiên cứu cho thấy môi trường sống tốt ảnh hưởng tích cực đến tâm lý và sức khỏe."
            }
          },
          {
            "@type": "Question",
            "name": "Làm thế nào để tính số quẻ cá nhân?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Số quẻ được tính dựa trên năm sinh và giới tính. Nam và nữ có công thức tính khác nhau. Hệ thống sẽ tự động tính toán và đưa ra hướng tốt cho bạn."
            }
          },
          {
            "@type": "Question",
            "name": "Ngũ hành trong phong thủy là gì?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ngũ hành gồm Kim, Mộc, Thủy, Hỏa, Thổ - 5 yếu tố cơ bản tạo nên vũ trụ. Chúng có mối quan hệ tương sinh và tương khắc, ảnh hưởng đến năng lượng trong không gian."
            }
          },
          {
            "@type": "Question",
            "name": "Góc tài lộc trong nhà ở đâu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Góc tài lộc thường nằm ở phía Đông Nam của ngôi nhà hoặc phòng. Tuy nhiên, vị trí chính xác phụ thuộc vào hướng nhà và số quẻ của gia chủ."
            }
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Công Cụ Phong Thủy",
        "description": "Danh sách các công cụ phong thủy có sẵn",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Số Quẻ Cá Nhân",
            "description": "Tính số quẻ và hướng tốt"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Hướng Nhà Tốt",
            "description": "Chọn hướng nhà phù hợp"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Cửu Tinh Phi Phủ",
            "description": "Phân tích năng lượng theo thời gian"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Góc Tài Lộc",
            "description": "Kích hoạt vị trí tài lộc"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Góc Tình Yêu",
            "description": "Tăng cường năng lượng tình yêu"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Lịch Phong Thủy",
            "description": "Chọn ngày tốt cho việc quan trọng"
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
      <FengShuiPageClient />
    </>
  );
}
