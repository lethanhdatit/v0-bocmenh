"use client"

import BusinessNameForm from "@/components/forms/BusinessNameForm"

interface Props {
  translations: any
}

export default function BusinessNameClient({ translations: t }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t.businessName.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t.businessName.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <BusinessNameForm />
        </div>

        {/* Benefits Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t.businessName.benefits.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.businessName.benefits.items.map((benefit: any, index: number) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{benefit.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t.businessName.howItWorks.title}</h2>
          <div className="space-y-8">
            {t.businessName.howItWorks.steps.map((step: any, index: number) => (
              <div key={index} className="flex items-start gap-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
