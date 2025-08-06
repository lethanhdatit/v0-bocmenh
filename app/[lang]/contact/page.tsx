import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { generateMultilingualMetadata } from "@/lib/seo/seo-helpers";
import { getBaseUrl } from "@/lib/infra/utils";

interface ContactPageProps {
  params: { lang: string };
}

const baseUrl = getBaseUrl();

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return generateMultilingualMetadata({
    pageKey: "contact",
    params,
  });
}

export default function ContactPage() {
  // Structured data cho trang contact
  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Liên Hệ",
    description: "Thông tin liên hệ và hỗ trợ khách hàng",
    url: `${baseUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "Bóc Mệnh",
      url: baseUrl,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          areaServed: "VN",
          availableLanguage: ["Vietnamese", "English"],
          telephone: "+84-xxx-xxx-xxx",
          email: "support@bocmenh.com",
        },
        {
          "@type": "ContactPoint",
          contactType: "sales",
          areaServed: "VN",
          availableLanguage: ["Vietnamese"],
          email: "sales@bocmenh.com",
        },
      ],
      sameAs: [
        "https://facebook.com/bocmenh",
        "https://youtube.com/bocmenh",
        "https://zalo.me/bocmenh",
      ],
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
          name: "Liên hệ",
          item: `${baseUrl}/contact`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData),
        }}
      />
      <ContactPageClient />
    </>
  );
}
