import type { Metadata } from "next"
import DestinyForm from "@/components/forms/DestinyForm"
import { generateI18nMetadata } from "@/lib/metadata"
import { getTranslations } from "@/lib/serverTranslations"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Bát Tự Mệnh Lý - Khám Phá Vận Mệnh Qua Ngày Sinh | Bóc Mệnh",
      en: "Destiny Reading - Discover Your Fate Through Birth Date | Boc Menh",
    },
    description: {
      vi: "Phân tích bát tự mệnh lý chi tiết qua ngày giờ sinh. Khám phá tính cách, vận mệnh, tương lai và những điều bí ẩn về cuộc đời bạn.",
      en: "Detailed destiny analysis through birth date and time. Discover personality, fate, future and mysterious aspects of your life.",
    },
    keywords: {
      vi: "bát tự, mệnh lý, tử vi, vận mệnh, ngày sinh, phong thủy",
      en: "destiny reading, fate analysis, birth chart, fortune telling, astrology",
    },
    locale: params.locale,
    path: "/destiny",
  })
}

export default async function DestinyPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("destiny.title")}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("destiny.subtitle")}</p>
        </div>

        <DestinyForm />
      </div>
    </main>
  )
}
