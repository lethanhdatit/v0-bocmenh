"use client"

import NameAnalysisForm from "@/components/forms/NameAnalysisForm"

interface Props {
  translations: any
}

export default function NameAnalysisClient({ translations: t }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent mb-4">
            {t.nameAnalysis.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.nameAnalysis.subtitle}</p>
        </div>

        {/* Main Form */}
        <NameAnalysisForm />

        {/* Information Section */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.nameAnalysis.features.map((feature: any, index: number) => (
            <div key={index} className="mystical-card">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">
                {feature.icon} {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-16 mystical-card">
          <h3 className="text-2xl font-bold text-yellow-500 mb-6 text-center">{t.nameAnalysis.tips.title}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">{t.nameAnalysis.tips.development.title}</h4>
              <ul className="space-y-2 text-gray-300">
                {t.nameAnalysis.tips.development.items.map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">{t.nameAnalysis.tips.practical.title}</h4>
              <ul className="space-y-2 text-gray-300">
                {t.nameAnalysis.tips.practical.items.map((item: string, index: number) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
