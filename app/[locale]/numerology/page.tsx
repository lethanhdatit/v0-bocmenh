import type { Metadata } from "next"
import NumerologyForm from "@/components/forms/NumerologyForm"
import { generateI18nMetadata } from "@/lib/metadata"
import { getTranslations } from "@/lib/serverTranslations"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Thần Số Học - Khám Phá Bí Mật Qua Con Số | Bóc Mệnh",
      en: "Numerology - Discover Secrets Through Numbers | Boc Menh",
    },
    description: {
      vi: "Phân tích thần số học chi tiết qua tên và ngày sinh. Khám phá con số vận mệnh, tính cách và tương lai của bạn.",
      en: "Detailed numerology analysis through name and birth date. Discover your destiny numbers, personality and future.",
    },
    keywords: {
      vi: "thần số học, numerology, con số vận mệnh, phân tích tên, ngày sinh",
      en: "numerology, destiny numbers, name analysis, birth date analysis, life path number",
    },
    locale: params.locale,
    path: "/numerology",
  })
}

export default async function NumerologyPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("numerology.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("numerology.subtitle")}</p>
        </div>

        <NumerologyForm />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="mystical-card">
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">🔢 {t("numerology.lifePath")}</h3>
            <p className="text-gray-300 text-sm">{t("numerology.lifePathDesc")}</p>
          </div>

          <div className="mystical-card">
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">🎯 {t("numerology.destiny")}</h3>
            <p className="text-gray-300 text-sm">{t("numerology.destinyDesc")}</p>
          </div>

          <div className="mystical-card">
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">💎 {t("numerology.soul")}</h3>
            <p className="text-gray-300 text-sm">{t("numerology.soulDesc")}</p>
          </div>

          <div className="mystical-card">
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">🎭 {t("numerology.personality")}</h3>
            <p className="text-gray-300 text-sm">{t("numerology.personalityDesc")}</p>
          </div>

          <div className="mystical-card">
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">🍀 {t("numerology.lucky")}</h3>
            <p className="text-gray-300 text-sm">{t("numerology.luckyDesc")}</p>
          </div>

          <div className="mystical-card">
            <h3 className="text-lg font-semibold text-yellow-500 mb-4">📅 {t("numerology.cycle")}</h3>
            <p className="text-gray-300 text-sm">{t("numerology.cycleDesc")}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
