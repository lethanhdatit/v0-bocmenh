import type { Metadata } from "next";
import DestinyForm from "./DestinyForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "@/i18n/server"; // Assuming you have a server-side translation utility
import DestinyResultClient from "./DestinyResultClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
  params: { locale },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { locale: string };
}): Promise<Metadata> {
  const { t } = await getTranslations(["common", "destiny"]);

  const name = searchParams?.name as string;

  if (name) {
    return {
      title: t("destiny.result.titleFor", { name }),
      description: t("destiny.meta.descriptionFor", { name }),
      keywords: t("destiny.meta.keywordsFor", { name }).split(", "),
    };
  }
  return {
    title: t("destiny.pageTitle"),
    description: t("destiny.meta.descriptionDefault"),
    keywords: t("destiny.meta.keywordsDefault").split(", "),
  };
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
  const { t } = await getTranslations(["common", "destiny", "attributes"]);

  const id = searchParams?.id as string | undefined;

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-950 via-slate-900 text-gray-100">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6">
        <Card
          className={`w-full ${
            !id ? "max-w-lg" : ""
          } mx-auto bg-gray-900/80 border-yellow-500/30 shadow-xl backdrop-blur-sm`}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              {t("destiny.form.title")}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-1 text-left">
              <i>{t("features.destiny.description")}</i>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!id ? <DestinyForm /> : <DestinyResultClient id={id} />}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
