import type { Metadata } from "next"
import CompatibilityForm from "@/components/forms/CompatibilityForm"
import { generateI18nMetadata } from "@/lib/metadata"
import { getTranslations } from "@/lib/serverTranslations"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Hợp Tuổi Thần Số - Kiểm Tra Độ Tương Hợp | Bóc Mệnh",
      en: "Numerology Compatibility - Check Your Match | Boc Menh",
    },
    description: {
      vi: "Kiểm tra độ tương hợp giữa hai người qua thần số học. Phân tích tình yêu, tình bạn và hợp tác kinh doanh.",
      en: "Check compatibility between two people through numerology. Analyze love, friendship and business partnerships.",
    },
    keywords: {
      vi: "hợp tuổi, tương hợp, thần số học, tình yêu, hôn nhân, compatibility",
      en: "compatibility, numerology match, love compatibility, relationship analysis",
    },
    locale: params.locale,
    path: "/numerology/compatibility",
  })
}

export default async function CompatibilityPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("compatibility.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("compatibility.subtitle")}</p>
        </div>

        <CompatibilityForm />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="mystical-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💕</span>
            </div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-2">{t("compatibility.love")}</h3>
            <p className="text-gray-300 text-sm">{t("compatibility.loveDesc")}</p>
          </div>

          <div className="mystical-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-2">{t("compatibility.friendship")}</h3>
            <p className="text-gray-300 text-sm">{t("compatibility.friendshipDesc")}</p>
          </div>

          <div className="mystical-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-2">{t("compatibility.business")}</h3>
            <p className="text-gray-300 text-sm">{t("compatibility.businessDesc")}</p>
          </div>

          <div className="mystical-card text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔮</span>
            </div>
            <h3 className="text-lg font-semibold text-yellow-500 mb-2">{t("compatibility.overall")}</h3>
            <p className="text-gray-300 text-sm">{t("compatibility.overallDesc")}</p>
          </div>
        </div>

        <div className="mt-16 mystical-card">
          <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">{t("compatibility.howItWorks")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold text-white mb-2">{t("compatibility.step1")}</h3>
              <p className="text-gray-400 text-sm">{t("compatibility.step1Desc")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold text-white mb-2">{t("compatibility.step2")}</h3>
              <p className="text-gray-400 text-sm">{t("compatibility.step2Desc")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold text-white mb-2">{t("compatibility.step3")}</h3>
              <p className="text-gray-400 text-sm">{t("compatibility.step3Desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
