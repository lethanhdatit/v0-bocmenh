"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MeditationForm from "@/components/forms/MeditationForm"
import MeditationCard from "@/components/meditation/MeditationCard"
import type { MeditationGuide } from "@/lib/meditation"
import { Brain, Heart, Sparkles, Clock, Star } from "lucide-react"

interface MeditationAnalysis {
  totalGuides: number
  averageDuration: number
  recommendedTypes: string[]
  personalizedMessage: string
  personalizedMessageVi: string
}

interface Props {
  translations: any
}

export default function MeditationClient({ translations: t }: Props) {
  const [recommendations, setRecommendations] = useState<MeditationGuide[]>([])
  const [analysis, setAnalysis] = useState<MeditationAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (formData: {
    experience: string
    availableTime: number
    goals: string[]
  }) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/meditation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (result.success) {
        setRecommendations(result.data.recommendations)
        setAnalysis(result.data.analysis)
      }
    } catch (error) {
      console.error("Error getting meditation recommendations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            {t.meditation.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{t.meditation.subtitle}</p>
        </div>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form">{t.meditation.tabs.form}</TabsTrigger>
            <TabsTrigger value="benefits">{t.meditation.tabs.benefits}</TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-8">
            <MeditationForm onSubmit={handleFormSubmit} isLoading={isLoading} />

            {analysis && recommendations.length > 0 && (
              <div className="space-y-6">
                {/* Analysis Results */}
                <Card className="bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-500" />
                      {t.meditation.analysis.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{analysis.totalGuides}</div>
                        <div className="text-sm text-gray-600">{t.meditation.analysis.totalGuides}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{analysis.averageDuration}</div>
                        <div className="text-sm text-gray-600">{t.meditation.analysis.averageDuration}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">{analysis.recommendedTypes.length}</div>
                        <div className="text-sm text-gray-600">{t.meditation.analysis.types}</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <p className="text-gray-700 leading-relaxed">{analysis.personalizedMessage}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {t.meditation.recommendations.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((meditation) => (
                      <MeditationCard key={meditation.id} meditation={meditation} language="vi" />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="benefits" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.meditation.benefits.map((benefit: any, index: number) => (
                <Card key={index} className="bg-white border-purple-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {index === 0 && <Brain className="w-8 h-8 text-purple-600" />}
                        {index === 1 && <Heart className="w-8 h-8 text-pink-600" />}
                        {index === 2 && <Sparkles className="w-8 h-8 text-indigo-600" />}
                        {index === 3 && <Clock className="w-8 h-8 text-green-600" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Getting Started Tips */}
            <Card className="bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">{t.meditation.tips.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">{t.meditation.tips.beginners.title}</h4>
                    <ul className="space-y-2 text-gray-600">
                      {t.meditation.tips.beginners.items.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">{t.meditation.tips.habit.title}</h4>
                    <ul className="space-y-2 text-gray-600">
                      {t.meditation.tips.habit.items.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
