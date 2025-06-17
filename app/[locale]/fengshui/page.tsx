import type { Metadata } from "next"
import { getTranslations } from "@/lib/serverTranslations"
import { generateI18nMetadata } from "@/lib/metadata"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateI18nMetadata({
    title: {
      vi: "Phong Thủy - Nghệ Thuật Sắp Xếp Không Gian | Bóc Mệnh",
      en: "Feng Shui - Art of Space Arrangement | Boc Menh",
    },
    description: {
      vi: "Khám phá nghệ thuật phong thủy cổ xưa. Tính số quẻ, phân tích hướng nhà, góc tài lộc và nhiều công cụ phong thủy khác.",
      en: "Discover the ancient art of Feng Shui. Calculate Kua numbers, analyze house directions, wealth corners and more Feng Shui tools.",
    },
    keywords: {
      vi: "phong thủy, số quẻ, hướng nhà, góc tài lộc, cửu tinh phi phủ, lịch phong thủy",
      en: "feng shui, kua number, house direction, wealth corner, flying stars, feng shui calendar",
    },
    locale: params.locale,
    path: "/fengshui",
  })
}

export default async function FengShuiPage({ params }: { params: { locale: string } }) {
  const { t } = await getTranslations(params.locale)

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">{t("fengshui.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("fengshui.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="mystical-card group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🧭</span>
            </div>
            <h3 className="text-xl font-semibold text-yellow-500 mb-4 text-center">{t("fengshui.kuaNumber")}</h3>
            <p className="text-gray-300 text-center mb-6">{t("fengshui.kuaNumberDesc")}</p>
            <div className="text-center">
              <a href={`/${params.locale}/fengshui/kua-number`} className="mystical-button">
                {t("common.explore")}
              </a>
            </div>
          </div>

          <div className="mystical-card group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🏠</span>
            </div>
            <h3 className="text-xl font-semibold text-yellow-500 mb-4 text-center">{t("fengshui.houseDirection")}</h3>
            <p className="text-gray-300 text-center mb-6">{t("fengshui.houseDirectionDesc")}</p>
            <div className="text-center">
              <a href={`/${params.locale}/fengshui/house-direction`} className="mystical-button">
                {t("common.explore")}
              </a>
            </div>
          </div>

          <div className="mystical-card group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-xl font-semibold text-yellow-500 mb-4 text-center">{t("fengshui.wealthCorner")}</h3>
            <p className="text-gray-300 text-center mb-6">{t("fengshui.wealthCornerDesc")}</p>
            <div className="text-center">
              <a href={`/${params.locale}/fengshui/wealth-corner`} className="mystical-button">
                {t("common.explore")}
              </a>
            </div>
          </div>

          <div className="mystical-card group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">💕</span>
            </div>
            <h3 className="text-xl font-semibold text-yellow-500 mb-4 text-center">{t("fengshui.loveCorner")}</h3>
            <p className="text-gray-300 text-center mb-6">{t("fengshui.loveCornerDesc")}</p>
            <div className="text-center">
              <a href={`/${params.locale}/fengshui/love-corner`} className="mystical-button">
                {t("common.explore")}
              </a>
            </div>
          </div>

          <div className="mystical-card group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold text-yellow-500 mb-4 text-center">{t("fengshui.flyingStars")}</h3>
            <p className="text-gray-300 text-center mb-6">{t("fengshui.flyingStarsDesc")}</p>
            <div className="text-center">
              <a href={`/${params.locale}/fengshui/flying-stars`} className="mystical-button">
                {t("common.explore")}
              </a>
            </div>
          </div>

          <div className="mystical-card group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📅</span>
            </div>
            <h3 className="text-xl font-semibold text-yellow-500 mb-4 text-center">{t("fengshui.calendar")}</h3>
            <p className="text-gray-300 text-center mb-6">{t("fengshui.calendarDesc")}</p>
            <div className="text-center">
              <a href={`/${params.locale}/fengshui/calendar`} className="mystical-button">
                {t("common.explore")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
