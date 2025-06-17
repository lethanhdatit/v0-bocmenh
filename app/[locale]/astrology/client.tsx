"use client"

import AstrologyForm from "@/components/forms/AstrologyForm"

interface Props {
  translations: any
}

export default function AstrologyClient({ translations: t }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            {t.astrology.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.astrology.subtitle}</p>
        </div>

        <AstrologyForm />
      </div>
    </div>
  )
}
