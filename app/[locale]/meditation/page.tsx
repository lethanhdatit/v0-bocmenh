import type { Metadata } from "next"
import { getTranslations } from "@/lib/serverTranslations"
import { generateI18nMetadata } from "@/lib/metadata"
import MeditationForm from "@/components/forms/MeditationForm"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Thiền Định - Hướng Dẫn Thiền Theo Cá Nhân | Bóc Mệnh",
      en: "Meditation - Personalized Meditation Guide | Boc Menh",
    },
    description: {
      vi: "Tìm phương pháp thiền phù hợp với bạn. Hướng dẫn thiền cá nhân hóa để đạt được bình an và cân bằng trong cuộc sống.",
      en: "Find meditation methods that suit you. Personalized meditation guidance to achieve peace and balance in life.",
    },
    keywords: {
      vi: "thiền định, meditation, thiền, tĩnh tâm, cân bằng cuộc sống",
      en: "meditation, mindfulness, inner peace, life balance, spiritual practice",
    },
    locale: params.locale,
    path: "/meditation",
  })
}

export default async function MeditationPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("meditation.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("meditation.subtitle")}</p>
        </div>

        <MeditationForm />
      </div>
    </main>
  )
}
