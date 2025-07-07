import type { Metadata } from "next";
import DestinyForm from "@/components/forms/DestinyForm";
import ProductCard from "@/components/store/ProductCard";
import { getProducts, type Product } from "@/lib/products";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Gift, ChevronRight } from "lucide-react";
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {!id && (
          <div className="mb-12">
            <DestinyForm />
          </div>
        )}

        {id && <DestinyResultClient id={id} />}
      </div>
    </main>
  );
}
