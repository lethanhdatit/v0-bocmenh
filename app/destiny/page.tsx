import type { Metadata } from "next";
import DestinyForm from "./DestinyForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "@/i18n/server";
import DestinyResultClient from "./DestinyResultClient";
import { createSEOMetadata } from "@/lib/seo/metadata";
import { getBaseUrl } from "@/lib/infra/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
  params: { locale },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { locale: string };
}): Promise<Metadata> {
  const { t } = await getTranslations(["common"]);
  const baseUrl = getBaseUrl();

  const id = searchParams?.id as string;
  const name = searchParams?.name as string;

  if (id && name) {
    return createSEOMetadata({
      title: `Vận Mệnh Của ${name} - Bóc Mệnh | Phân Tích Chi Tiết Số Mệnh`,
      description: `🔮 Khám phá vận mệnh chi tiết của ${name} qua AI bói toán. Phân tích tính cách, sự nghiệp, tình yêu, tài lộc và lời khuyên phong thủy cá nhân hóa.`,
      keywords: `vận mệnh ${name}, bóc mệnh cá nhân, phân tích số mệnh, tử vi ${name}, AI bói toán, khám phá bản thân`,
      ogImage: "/og-destiny-result.jpg",
      canonicalUrl: `${baseUrl}/destiny?id=${id}`,
      alternateLanguages: {
        vi: `${baseUrl}/destiny?id=${id}`,
        en: `${baseUrl}/destiny?id=${id}`,
      },
    });
  }

  return createSEOMetadata({
    title: "Bóc Mệnh Cá Nhân - AI Phân Tích Vận Mệnh Qua Ngày Sinh | Bóc Mệnh",
    description: "🌟 Khám phá vận mệnh của bạn với AI bói toán chính xác nhất! Nhập thông tin để nhận phân tích chi tiết về tính cách, sự nghiệp, tình yêu, tài lộc và lời khuyên phong thủy.",
    keywords: "bóc mệnh cá nhân, xem vận mệnh, AI bói toán, phân tích ngày sinh, tử vi online, khám phá bản thân, số mệnh cá nhân, phong thủy cá nhân",
    ogImage: "/og-destiny.jpg",
    canonicalUrl: `${baseUrl}/destiny`,
    alternateLanguages: {
      vi: `${baseUrl}/destiny`,
      en: `${baseUrl}/destiny`,
    },
  });
}

// async function getRecommendedProductsForDestiny(
//   destiny: DestinyResult | null
// ): Promise<Product[]> {
//   const { t } = await getTranslations(["common", "attributes"]);
//   if (!destiny?.success || !destiny.data) {
//     return [];
//   }

//   const elementToMatch = destiny.element?.toLowerCase();
//   const allProducts = await getProducts(); // Assuming getProducts can be filtered or fetches all

//   if (elementToMatch) {
//     const translatedElementKey = `attributes.mệnh.${destiny.element}`; // e.g. attributes.mệnh.Kim
//     const translatedElement = t(
//       translatedElementKey,
//       destiny.element as string
//     ); // Fallback to original if no translation

//     const filteredByElement = allProducts.filter(
//       (p) =>
//         p.attributes.some(
//           (attr) =>
//             attr.type === "mệnh" &&
//             (attr.value.toLowerCase() === elementToMatch ||
//               t(`attributes.mệnh.${attr.value}`, attr.value).toLowerCase() ===
//                 translatedElement.toLowerCase())
//         ) ||
//         p.categories.some((cat) => cat.toLowerCase().includes(elementToMatch!))
//     );
//     if (filteredByElement.length > 0) return filteredByElement.slice(0, 3);
//   }

//   const fallbackCategories = [
//     t("attributes.mục đích.Bình An"),
//     t("attributes.mục đích.May Mắn"),
//     t("attributes.mục đích.Tài Lộc"),
//   ];
//   const fallbackProducts = allProducts.filter((p) =>
//     p.categories.some((cat) => fallbackCategories.includes(cat))
//   );
//   return fallbackProducts.slice(0, 3);
// }

interface DestinyResult {
  id: string;
  result: string;
  input: any;
  preData: any;
}

export default async function DestinyPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { t } = await getTranslations(["common"]);
  const baseUrl = getBaseUrl();

  const id = searchParams?.id as string | undefined;

  // Structured data cho trang destiny
  const destinyStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: id ? "Kết Quả Bóc Mệnh Cá Nhân" : "Bóc Mệnh Cá Nhân",
    description: id ? "Xem kết quả phân tích vận mệnh chi tiết" : "Khám phá vận mệnh của bạn với AI bói toán",
    url: `${baseUrl}/destiny${id ? `?id=${id}` : ''}`,
    mainEntity: {
      "@type": "Service",
      name: "Dịch vụ Bóc Mệnh Cá Nhân",
      description: "Phân tích vận mệnh, tính cách và tương lai qua ngày sinh với AI",
      provider: {
        "@type": "Organization",
        name: "Bóc Mệnh"
      },
      serviceType: "Fortune Telling",
      areaServed: "VN",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "VND",
        description: "Dịch vụ bóc mệnh miễn phí cơ bản"
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
          name: "Bóc Mệnh",
          item: `${baseUrl}/destiny`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(destinyStructuredData),
        }}
      />
      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-950 via-slate-900 text-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <Card
            className={`w-full ${
              !id ? "max-w-lg" : ""
            } mx-auto bg-gray-900/80 border-yellow-500/30 shadow-xl backdrop-blur-sm`}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                {t("common:destiny.form.title")}
              </CardTitle>
              <CardDescription className="text-gray-300 mt-1 text-left">
                <i>{t("common:features.destiny.description")}</i>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!id ? <DestinyForm /> : <DestinyResultClient id={id} />}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
