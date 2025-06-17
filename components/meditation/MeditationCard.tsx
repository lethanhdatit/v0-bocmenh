"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star, Heart, Brain, Zap } from "lucide-react"
import Image from "next/image"
import type { MeditationGuide } from "@/lib/meditation"

interface MeditationCardProps {
  meditation: MeditationGuide
  language?: "en" | "vi"
}

export default function MeditationCard({ meditation, language = "en" }: MeditationCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "breathing":
        return <Brain className="w-4 h-4" />
      case "chakra":
        return <Zap className="w-4 h-4" />
      case "loving-kindness":
        return <Heart className="w-4 h-4" />
      case "body-scan":
        return <Star className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const name = language === "vi" ? meditation.nameVi : meditation.name
  const description = language === "vi" ? meditation.descriptionVi : meditation.description
  const benefits = language === "vi" ? meditation.benefitsVi : meditation.benefits
  const instructions = language === "vi" ? meditation.instructionsVi : meditation.instructions
  const bestTime = language === "vi" ? meditation.bestTimeVi : meditation.bestTime

  return (
    <Card className="h-full bg-gradient-to-br from-white to-purple-50 border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <CardHeader className="pb-3">
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image src={meditation.imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
          <div className="absolute top-2 right-2">
            <Badge className={getDifficultyColor(meditation.difficulty)}>{meditation.difficulty}</Badge>
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {getTypeIcon(meditation.type)}
          {name}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {meditation.duration} {language === "vi" ? "phút" : "min"}
            </span>
          </div>
          {meditation.chakra && (
            <Badge variant="outline" className="text-xs">
              {language === "vi" ? meditation.chakraVi : meditation.chakra}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">{language === "vi" ? "Lợi Ích:" : "Benefits:"}</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">
            {language === "vi" ? "Thời Gian Tốt Nhất:" : "Best Time:"}
          </h4>
          <div className="flex flex-wrap gap-1">
            {bestTime.map((time, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {time}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            onClick={() => {
              // Here you could implement audio playback or detailed instructions modal
              alert(`Starting ${name} meditation...`)
            }}
          >
            {language === "vi" ? "Bắt Đầu Thiền" : "Start Meditation"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
