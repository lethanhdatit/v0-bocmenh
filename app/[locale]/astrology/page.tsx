import type { Metadata } from "next"
import { getTranslations } from "@/lib/serverTranslations"
import { generateI18nMetadata } from "@/lib/metadata"
import AstrologyForm from "@/components/forms/AstrologyForm"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Chiêm Tinh Học - Khám Phá Vận Mệnh Qua Sao | Bóc Mệnh",
      en: "Astrology - Discover Destiny Through Stars | Boc Menh",
    },
    description: {
      vi: "Phân tích chiêm tinh học chi tiết qua ngày giờ sinh. Khám phá ảnh hưởng của các hành tinh đến cuộc đời bạn.",
      en: "Detailed astrology analysis through birth date and time. Discover planetary influences on your life.",
    },
    keywords: {
      vi: "chiêm tinh học, astrology, sao, hành tinh, cung hoàng đạo, bản đồ sao",
      en: "astrology, birth chart, planets, zodiac signs, horoscope, star map",
    },
    locale: params.locale,
    path: "/astrology",
  })
}

export default async function AstrologyPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("astrology.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("astrology.subtitle")}</p>
        </div>

        <AstrologyForm />
      </div>
    </main>
  )
}
