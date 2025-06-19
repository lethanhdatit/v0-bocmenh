import type { Metadata } from "next"
import WeddingDateForm from "@/components/forms/WeddingDateForm"
import { Calendar, Heart, Star, Sparkles } from "lucide-react"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Wedding Date Analysis - Bóc Mệnh",
  description: "Find the most auspicious date for your wedding based on numerology and astrology.",
}

export default async function WeddingDatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 dark:text-purple-300 mb-4">
            Wedding Date Analysis
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the perfect date for your special day using ancient numerology and astrology principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4 text-purple-600 dark:text-purple-400">
              <Calendar size={24} className="mr-3" />
              <h2 className="text-xl font-semibold">Choose Wisely</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Your wedding date carries powerful energy that can influence your marriage. Our analysis helps you select
              a date that aligns with your personal energies and supports a harmonious union.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4 text-purple-600 dark:text-purple-400">
              <Heart size={24} className="mr-3" />
              <h2 className="text-xl font-semibold">Personalized Analysis</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              We consider both partners' birth dates to provide a comprehensive compatibility analysis, ensuring your
              wedding date resonates with your unique relationship dynamics.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300 inline-flex items-center">
              <Sparkles size={24} className="mr-2 text-yellow-500" />
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Enter Your Dates</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Provide your potential wedding date and optionally both partners' birth dates for enhanced analysis.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Receive Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Our system calculates the numerological significance and compatibility of your chosen date.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Plan With Confidence</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Use our recommendations for colors, elements, and timing to create a harmonious celebration.
              </p>
            </div>
          </div>
        </div>

        <WeddingDateForm className="mb-12" />

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4 text-purple-600 dark:text-purple-400">
            <Star size={24} className="mr-3" />
            <h2 className="text-xl font-semibold">Why Wedding Date Matters</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            In many traditions, the wedding date is believed to influence the future of the marriage. Numerology offers
            insights into the energetic qualities of different dates, helping couples choose a day that supports their
            union.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Each date carries a unique vibration that can enhance certain aspects of your relationship. Whether you're
            looking for stability, passion, growth, or harmony, understanding the numerological significance of your
            wedding date can help you align your celebration with your relationship goals.
          </p>
        </div>
      </div>
    </div>
  )
}
