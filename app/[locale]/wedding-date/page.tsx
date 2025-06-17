import type { Metadata } from "next"
import { getTranslations } from "@/lib/serverTranslations"
import { generateI18nMetadata } from "@/lib/metadata"
import WeddingDateForm from "@/components/forms/WeddingDateForm"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Chọn Ngày Cưới - Tìm Ngày Tốt Kết Hôn | Bóc Mệnh",
      en: "Wedding Date Selection - Find Auspicious Wedding Date | Boc Menh",
    },
    description: {
      vi: "Chọn ngày cưới hợp tuổi và hợp phong thủy. Tìm ngày tốt để tổ chức đám cưới mang lại hạnh phúc và may mắn.",
      en: "Choose wedding dates that match your destiny and feng shui. Find auspicious dates for weddings that bring happiness and luck.",
    },
    keywords: {
      vi: "chọn ngày cưới, ngày tốt cưới, phong thủy cưới, hợp tuổi cưới",
      en: "wedding date selection, auspicious wedding date, wedding feng shui, marriage date",
    },
    locale: params.locale,
    path: "/wedding-date",
  })
}

export default async function WeddingDatePage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("weddingDate.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("weddingDate.subtitle")}</p>
        </div>

        <WeddingDateForm />
      </div>
    </main>
  )
}
