import type { Metadata } from "next"
import TarotForm from "@/components/forms/TarotForm"
import { generateI18nMetadata } from "@/lib/metadata"
import { getTranslations } from "@/lib/serverTranslations"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Bói Bài Tarot - Khám Phá Tương Lai Qua Lá Bài | Bóc Mệnh",
      en: "Tarot Card Reading - Discover Future Through Cards | Boc Menh",
    },
    description: {
      vi: "Rút bài tarot để khám phá tương lai, tình yêu, sự nghiệp. Nhận lời khuyên từ những lá bài thần bí.",
      en: "Draw tarot cards to discover future, love, career. Receive guidance from mystical cards.",
    },
    keywords: {
      vi: "tarot, bói bài, rút bài, tương lai, tình yêu, sự nghiệp",
      en: "tarot reading, card reading, fortune telling, future prediction, love reading",
    },
    locale: params.locale,
    path: "/tarot",
  })
}

export default async function TarotPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("tarot.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("tarot.subtitle")}</p>
        </div>

        <TarotForm />
      </div>
    </main>
  )
}
