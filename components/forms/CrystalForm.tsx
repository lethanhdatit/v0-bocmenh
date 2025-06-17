"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { crystalIntentions, chakras } from "@/lib/crystals"
import { Sparkles, Heart, Shield, Gem } from "lucide-react"

interface CrystalFormProps {
  onSubmit: (data: {
    intention: string
    chakra: string
    zodiacSign: string
    specificNeeds: string
  }) => void
  isLoading: boolean
}

const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
]

export default function CrystalForm({ onSubmit, isLoading }: CrystalFormProps) {
  const [formData, setFormData] = useState({
    intention: "",
    chakra: "",
    zodiacSign: "",
    specificNeeds: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
            <Gem className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Crystal Healing Guide
        </CardTitle>
        <CardDescription className="text-gray-600">
          Discover the perfect crystals for your healing journey and spiritual growth
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="intention" className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-500" />
                Primary Intention
              </Label>
              <Select
                value={formData.intention}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, intention: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="What do you seek?" />
                </SelectTrigger>
                <SelectContent>
                  {crystalIntentions.map((intention) => (
                    <SelectItem key={intention.value} value={intention.value}>
                      {intention.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chakra" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Chakra Focus
              </Label>
              <Select
                value={formData.chakra}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, chakra: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select chakra" />
                </SelectTrigger>
                <SelectContent>
                  {chakras.map((chakra) => (
                    <SelectItem key={chakra.value} value={chakra.value}>
                      {chakra.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="zodiacSign" className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-indigo-500" />
                Zodiac Sign (Optional)
              </Label>
              <Select
                value={formData.zodiacSign}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, zodiacSign: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Your zodiac sign" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign} value={sign}>
                      {sign}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specificNeeds">Specific Needs (Optional)</Label>
              <Textarea
                id="specificNeeds"
                placeholder="Describe any specific healing needs or goals..."
                value={formData.specificNeeds}
                onChange={(e) => setFormData((prev) => ({ ...prev, specificNeeds: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !formData.intention}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Finding Your Crystals...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Gem className="h-4 w-4" />
                Get Crystal Recommendations
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
