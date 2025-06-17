"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CrystalForm from "@/components/forms/CrystalForm"
import CrystalCard from "@/components/crystals/CrystalCard"
import type { Crystal } from "@/lib/crystals"
import { Gem, Sparkles, Heart, Shield, BookOpen, Star } from "lucide-react"

interface Props {
  translations: any
}

export default function CrystalsClient({ translations: t }: Props) {
  const [crystals, setCrystals] = useState<Crystal[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleFormSubmit = async (formData: {
    intention: string
    chakra: string
    zodiacSign: string
    specificNeeds: string
  }) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/crystals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.success) {
        setCrystals(data.crystals)
        setAnalysis(data.analysis)
        setShowRecommendations(true)
      }
    } catch (error) {
      console.error("Error getting crystal recommendations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setShowRecommendations(false)
    setCrystals([])
    setAnalysis(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Gem className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t.crystals.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{t.crystals.subtitle}</p>
        </div>

        {!showRecommendations ? (
          <>
            {/* Crystal Form */}
            <div className="mb-12">
              <CrystalForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>

            {/* Crystal Benefits Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300">
                <CardHeader>
                  <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-purple-800">{t.crystals.benefits.emotional.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-purple-700">{t.crystals.benefits.emotional.description}</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300">
                <CardHeader>
                  <Shield className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-pink-800">{t.crystals.benefits.protection.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-pink-700">{t.crystals.benefits.protection.description}</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-indigo-100 to-indigo-200 border-indigo-300">
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-indigo-800">{t.crystals.benefits.spiritual.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-indigo-700">{t.crystals.benefits.spiritual.description}</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-green-100 to-green-200 border-green-300">
                <CardHeader>
                  <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-green-800">{t.crystals.benefits.manifestation.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-700">{t.crystals.benefits.manifestation.description}</p>
                </CardContent>
              </Card>
            </div>

            {/* Crystal Care Tips */}
            <Card className="mb-12 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <BookOpen className="h-5 w-5" />
                  {t.crystals.care.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-amber-700 mb-3">{t.crystals.care.cleansing.title}</h4>
                  <ul className="space-y-2 text-sm text-amber-600">
                    {t.crystals.care.cleansing.methods.map((method: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-700 mb-3">{t.crystals.care.programming.title}</h4>
                  <ul className="space-y-2 text-sm text-amber-600">
                    {t.crystals.care.programming.methods.map((method: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Analysis Results */}
            {analysis && (
              <Card className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <Sparkles className="h-5 w-5" />
                    {t.crystals.analysis.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <Badge className="bg-purple-200 text-purple-800 mb-2">{t.crystals.analysis.intention}</Badge>
                      <p className="font-semibold text-purple-700 capitalize">{analysis.intention}</p>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-pink-200 text-pink-800 mb-2">{t.crystals.analysis.chakra}</Badge>
                      <p className="font-semibold text-pink-700 capitalize">{analysis.chakra}</p>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-indigo-200 text-indigo-800 mb-2">
                        {t.crystals.analysis.recommendations}
                      </Badge>
                      <p className="font-semibold text-indigo-700">
                        {analysis.recommendationCount} {t.crystals.analysis.crystalsCount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Crystal Recommendations */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-800">{t.crystals.recommendations.title}</h2>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  {t.crystals.recommendations.newRecommendations}
                </Button>
              </div>

              {crystals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {crystals.map((crystal) => (
                    <CrystalCard key={crystal.id} crystal={crystal} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Gem className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">{t.crystals.recommendations.noCrystals}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
