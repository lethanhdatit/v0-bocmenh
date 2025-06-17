import type { Metadata } from "next"
import { getTranslations } from "@/lib/serverTranslations"
import { generateI18nMetadata } from "@/lib/metadata"
import NameAnalysisForm from "@/components/forms/NameAnalysisForm"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Phân Tích Tên - Khám Phá Ý Nghĩa Tên Của Bạn | Bóc Mệnh",
      en: "Name Analysis - Discover Your Name's Meaning | Boc Menh",
    },
    description: {
      vi: "Phân tích ý nghĩa và năng lượng của tên. Khám phá tính cách, vận mệnh và tiềm năng ẩn giấu trong tên của bạn.",
      en: "Analyze the meaning and energy of your name. Discover personality, destiny and hidden potential in your name.",
    },
    keywords: {
      vi: "phân tích tên, ý nghĩa tên, thần số học tên, name analysis",
      en: "name analysis, name meaning, name numerology, personal name reading",
    },
    locale: params.locale,
    path: "/name-analysis",
  })
}

export default async function NameAnalysisPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("nameAnalysis.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("nameAnalysis.subtitle")}</p>
        </div>

        <NameAnalysisForm />
      </div>
    </main>
  )
}
