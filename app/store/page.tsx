import type { Metadata } from "next"
import StorePageClient from "./StorePageClient"
import { createSEOMetadata } from "@/lib/seo/metadata"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl()

export const metadata: Metadata = createSEOMetadata({
  title: "Cửa Hàng Phong Thủy - Sản Phẩm May Mắn Theo Mệnh | Bóc Mệnh Store",
  description: "🛍️ Khám phá cửa hàng phong thủy online với hàng ngàn sản phẩm may mắn theo mệnh Kim Mộc Thủy Hỏa Thổ. Đá quý, vòng tay, tượng phong thủy, cây cảnh may mắn. Giao hàng toàn quốc.",
  keywords: "cửa hàng phong thủy, đá quý phong thủy, vòng tay may mắn, tượng phong thủy, cây cảnh phong thủy, sản phẩm theo mệnh, đồ phong thủy online, tài lộc, bình an",
  ogImage: "/og-store.jpg",
  canonicalUrl: "/store",
  alternateLanguages: {
    vi: `/store`,
    en: `/store`,
  },
})

export default function StorePage() {
  // Structured data cho trang store
  const storeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cửa Hàng Phong Thủy",
    description: "Cửa hàng trực tuyến chuyên các sản phẩm phong thủy may mắn",
    url: `${baseUrl}/store`,
    mainEntity: {
      "@type": "Store",
      name: "Bóc Mệnh Store",
      description: "Cửa hàng phong thủy trực tuyến uy tín với đa dạng sản phẩm theo mệnh",
      url: `${baseUrl}/store`,
      address: {
        "@type": "PostalAddress",
        addressCountry: "VN"
      },
      paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
      currenciesAccepted: "VND",
      openingHours: "Mo-Su 00:00-23:59",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Danh mục sản phẩm phong thủy",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Đá Quý Phong Thủy",
              category: "Jewelry"
            }
          },
          {
            "@type": "Offer", 
            itemOffered: {
              "@type": "Product",
              name: "Vòng Tay May Mắn",
              category: "Jewelry"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product", 
              name: "Tượng Phong Thủy",
              category: "Art"
            }
          }
        ]
      }
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Cửa hàng",
          item: `${baseUrl}/store`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(storeStructuredData),
        }}
      />
      <StorePageClient />
    </>
  )
}
