import type { Metadata } from "next"
import { getTranslations } from "@/lib/serverTranslations"
import { generateI18nMetadata } from "@/lib/metadata"
import HoroscopeForm from "@/components/forms/HoroscopeForm"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Tử Vi Hàng Ngày - Dự Báo Cung Hoàng Đạo | Bóc Mệnh",
      en: "Daily Horoscope - Zodiac Predictions | Boc Menh",
    },
    description: {
      vi: "Xem tử vi hàng ngày theo cung hoàng đạo. Dự báo tình yêu, sự nghiệp, sức khỏe và tài chính cho 12 cung hoàng đạo.",
      en: "Check your daily horoscope by zodiac sign. Predictions for love, career, health and finance for all 12 zodiac signs.",
    },
    keywords: {
      vi: "tử vi, cung hoàng đạo, dự báo hàng ngày, horoscope, zodiac",
      en: "horoscope, zodiac signs, daily predictions, astrology, fortune telling",
    },
    locale: params.locale,
    path: "/horoscope",
  })
}

export default async function HoroscopePage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("horoscope.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("horoscope.subtitle")}</p>
        </div>

        <HoroscopeForm />
      </div>
    </main>
  )
}
