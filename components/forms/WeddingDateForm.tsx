"use client"

import { useState } from "react"
import { useTranslation } from "next-i18next"
import { useForm } from "react-hook-form"
import {
  Calendar,
  Heart,
  Star,
  Palette,
  ComponentIcon as Elements,
  AlertTriangle,
  Lightbulb,
  Loader2,
} from "lucide-react"
import type { WeddingDateAnalysis } from "@/lib/weddingDate"
import { useAuth } from "@/contexts/AuthContext"

interface WeddingDateFormProps {
  className?: string
}

interface FormData {
  weddingDate: string
  brideDate: string
  groomDate: string
}

export default function WeddingDateForm({ className = "" }: WeddingDateFormProps) {
  const { t } = useTranslation("common")
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<WeddingDateAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/wedding-date", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: data.weddingDate,
          brideDate: data.brideDate || undefined,
          groomDate: data.groomDate || undefined,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to analyze wedding date")
      }

      setAnalysis(result.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-800 dark:text-purple-300">
          {t("weddingDate.title", "Wedding Date Analysis")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="weddingDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t("weddingDate.dateLabel", "Wedding Date")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Calendar size={18} />
                </span>
                <input
                  id="weddingDate"
                  type="date"
                  min={today}
                  className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  {...register("weddingDate", { required: "Wedding date is required" })}
                />
              </div>
              {errors.weddingDate && <p className="mt-1 text-sm text-red-600">{errors.weddingDate.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="brideDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("weddingDate.brideDateLabel", "Bride's Birth Date")}{" "}
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Calendar size={18} />
                  </span>
                  <input
                    id="brideDate"
                    type="date"
                    className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    {...register("brideDate")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="groomDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("weddingDate.groomDateLabel", "Groom's Birth Date")}{" "}
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Calendar size={18} />
                  </span>
                  <input
                    id="groomDate"
                    type="date"
                    className="pl-10 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    {...register("groomDate")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>{t("weddingDate.analyzing", "Analyzing...")}</span>
                </>
              ) : (
                <>
                  <Heart size={18} />
                  <span>{t("weddingDate.analyze", "Analyze Wedding Date")}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
            <p className="flex items-center">
              <AlertTriangle size={18} className="mr-2" />
              {error}
            </p>
          </div>
        )}

        {analysis && (
          <div className="mt-8 space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">
                {t("weddingDate.analysisTitle", "Wedding Date Analysis")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("weddingDate.dateSelected", "Date Selected")}:{" "}
                <span className="font-semibold">{new Date(analysis.date).toLocaleDateString()}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center mb-3">
                  <Star className="text-yellow-500 mr-2" size={20} />
                  <h4 className="text-lg font-semibold">{t("weddingDate.numerologyNumber", "Numerology Number")}</h4>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                    {analysis.numerologyNumber}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {t("weddingDate.interpretation", analysis.numerologyNumber.toString())}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center mb-3">
                  <Heart className="text-red-500 mr-2" size={20} />
                  <h4 className="text-lg font-semibold">{t("weddingDate.compatibility", "Compatibility")}</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{analysis.compatibility}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-center mb-3">
                <Star className="text-yellow-500 mr-2" size={20} />
                <h4 className="text-lg font-semibold">{t("weddingDate.luckRating", "Luck Rating")}</h4>
              </div>
              <div className="flex justify-center mb-2">
                <div className="flex items-center">
                  {[...Array(10)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className={
                        i < analysis.luckRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-300">{analysis.luckRating}/10</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center mb-3">
                  <Palette className="text-purple-500 mr-2" size={20} />
                  <h4 className="text-lg font-semibold">{t("weddingDate.favorableColors", "Favorable Colors")}</h4>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {analysis.favorableColors.map((color, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center mb-3">
                  <Elements className="text-blue-500 mr-2" size={20} />
                  <h4 className="text-lg font-semibold">{t("weddingDate.favorableElements", "Favorable Elements")}</h4>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {analysis.favorableElements.map((element, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                    >
                      {element}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="text-amber-500 mr-2" size={20} />
                  <h4 className="text-lg font-semibold">{t("weddingDate.challenges", "Potential Challenges")}</h4>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  {analysis.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center mb-3">
                  <Lightbulb className="text-yellow-500 mr-2" size={20} />
                  <h4 className="text-lg font-semibold">{t("weddingDate.recommendations", "Recommendations")}</h4>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>
            </div>

            {!user && (
              <div className="mt-6 p-4 bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg text-center">
                <p className="text-purple-800 dark:text-purple-300 mb-2">
                  {t("weddingDate.premiumFeature", "Sign up for a premium account to access additional features:")}
                </p>
                <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                  <li>• {t("weddingDate.premiumFeature1", "Lunar calendar date conversion")}</li>
                  <li>• {t("weddingDate.premiumFeature2", "Chinese zodiac compatibility")}</li>
                  <li>• {t("weddingDate.premiumFeature3", "Save and compare multiple dates")}</li>
                  <li>• {t("weddingDate.premiumFeature4", "Detailed hour-by-hour analysis")}</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
