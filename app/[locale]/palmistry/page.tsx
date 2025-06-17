import type { Metadata } from "next"
import { getTranslations } from "@/lib/serverTranslations"
import { generateI18nMetadata } from "@/lib/metadata"
import PalmistryForm from "@/components/forms/PalmistryForm"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Xem Tướng Bàn Tay - Phân Tích Chỉ Tay | Bóc Mệnh",
      en: "Palm Reading - Hand Analysis | Boc Menh",
    },
    description: {
      vi: "Khám phá bí mật cuộc đời qua những đường nét trên bàn tay. Phân tích đường đời, tình yêu, trí tuệ và vận mệnh.",
      en: "Discover life secrets through palm lines. Analyze life line, love line, wisdom line and destiny line.",
    },
    keywords: {
      vi: "xem tướng bàn tay, chỉ tay, đường đời, đường tình, palmistry",
      en: "palm reading, palmistry, life line, love line, hand analysis",
    },
    locale: params.locale,
    path: "/palmistry",
  })
}

export default async function PalmistryPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("palmistry.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("palmistry.subtitle")}</p>
        </div>

        <PalmistryForm />
      </div>
    </main>
  )
}
