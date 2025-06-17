import type { Metadata } from "next"
import DreamForm from "@/components/forms/DreamForm"
import DreamJournal from "@/components/sections/DreamJournal"
import DreamTips from "@/components/sections/DreamTips"
import { generateI18nMetadata } from "@/lib/metadata"
import { getTranslations } from "@/lib/serverTranslations"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Giải Mộng - Khám Phá Ý Nghĩa Giấc Mơ | Bóc Mệnh",
      en: "Dream Interpretation - Discover Dream Meanings | Boc Menh",
    },
    description: {
      vi: "Giải mã những giấc mơ bí ẩn của bạn. Khám phá ý nghĩa sâu xa và thông điệp ẩn giấu trong từng giấc mơ.",
      en: "Decode your mysterious dreams. Discover deep meanings and hidden messages in every dream.",
    },
    keywords: {
      vi: "giải mộng, ý nghĩa giấc mơ, mơ thấy, chiêm bao, giải mã giấc mơ",
      en: "dream interpretation, dream meanings, dream analysis, dream symbols",
    },
    locale: params.locale,
    path: "/dreams",
  })
}

export default async function DreamsPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("dreams.title")}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("dreams.subtitle")}</p>
        </div>

        <DreamForm />
      </div>

      <DreamJournal />
      <DreamTips />
    </main>
  )
}
