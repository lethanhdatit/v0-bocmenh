"use client"

import WeddingDateForm from "@/components/forms/WeddingDateForm"
import { Calendar, Heart, Star, Sparkles } from "lucide-react"

interface Props {
  translations: any
}

export default function WeddingDateClient({ translations: t }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 dark:text-purple-300 mb-4">
            {t.weddingDate.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t.weddingDate.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4 text-purple-600 dark:text-purple-400">
              <Calendar size={24} className="mr-3" />
              <h2 className="text-xl font-semibold">{t.weddingDate.features.chooseWisely.title}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{t.weddingDate.features.chooseWisely.description}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4 text-purple-600 dark:text-purple-400">
              <Heart size={24} className="mr-3" />
              <h2 className="text-xl font-semibold">{t.weddingDate.features.personalized.title}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{t.weddingDate.features.personalized.description}</p>
          </div>
        </div>

        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300 inline-flex items-center">
              <Sparkles size={24} className="mr-2 text-yellow-500" />
              {t.weddingDate.howItWorks.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.weddingDate.howItWorks.steps.map((step: any, index: number) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto mb-4">
                  <span className="text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <WeddingDateForm className="mb-12" />

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4 text-purple-600 dark:text-purple-400">
            <Star size={24} className="mr-3" />
            <h2 className="text-xl font-semibold">{t.weddingDate.importance.title}</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{t.weddingDate.importance.description1}</p>
          <p className="text-gray-600 dark:text-gray-300">{t.weddingDate.importance.description2}</p>
        </div>
      </div>
    </div>
  )
}
