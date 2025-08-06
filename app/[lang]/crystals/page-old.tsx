"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CrystalForm from "@/components/forms/CrystalForm"
import CrystalCard from "@/components/crystals/CrystalCard"
import type { Crystal } from "@/lib/crystals"
import { Gem, Sparkles, Heart, Shield, BookOpen, Star } from "lucide-react"

export default function CrystalsPage() {
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
            Crystal Healing Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the ancient wisdom of crystal healing. Find the perfect crystals to support your spiritual journey,
            emotional healing, and personal transformation.
          </p>
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
                  <CardTitle className="text-lg text-purple-800">Emotional Healing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-purple-700">
                    Release emotional blockages and promote inner peace with healing crystals
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300">
                <CardHeader>
                  <Shield className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-pink-800">Protection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-pink-700">
                    Shield yourself from negative energy and create a protective aura
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-indigo-100 to-indigo-200 border-indigo-300">
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-indigo-800">Spiritual Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-indigo-700">
                    Enhance meditation, intuition, and connection to higher consciousness
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-green-100 to-green-200 border-green-300">
                <CardHeader>
                  <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-green-800">Manifestation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-700">Amplify your intentions and attract abundance into your life</p>
                </CardContent>
              </Card>
            </div>

            {/* Crystal Care Tips */}
            <Card className="mb-12 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <BookOpen className="h-5 w-5" />
                  Crystal Care & Cleansing Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-amber-700 mb-3">Cleansing Methods:</h4>
                  <ul className="space-y-2 text-sm text-amber-600">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <strong>Moonlight:</strong> Place crystals under full moon overnight
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <strong>Sage Smoke:</strong> Pass crystals through sage or palo santo smoke
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <strong>Running Water:</strong> Rinse under natural flowing water
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <strong>Sound Healing:</strong> Use singing bowls or bells
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-700 mb-3">Programming & Use:</h4>
                  <ul className="space-y-2 text-sm text-amber-600">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <strong>Set Intentions:</strong> Hold crystal and focus on your goal
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <strong>Meditation:</strong> Hold or place nearby during practice
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <strong>Carry Daily:</strong> Keep in pocket or wear as jewelry
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <strong>Home Placement:</strong> Position in specific areas for energy
                    </li>
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
                    Your Crystal Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <Badge className="bg-purple-200 text-purple-800 mb-2">Primary Intention</Badge>
                      <p className="font-semibold text-purple-700 capitalize">{analysis.intention}</p>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-pink-200 text-pink-800 mb-2">Chakra Focus</Badge>
                      <p className="font-semibold text-pink-700 capitalize">{analysis.chakra}</p>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-indigo-200 text-indigo-800 mb-2">Recommendations</Badge>
                      <p className="font-semibold text-indigo-700">{analysis.recommendationCount} Crystals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Crystal Recommendations */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-800">Your Recommended Crystals</h2>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  Get New Recommendations
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
                    <p className="text-gray-600">
                      No crystals found for your specific criteria. Try adjusting your selections.
                    </p>
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
