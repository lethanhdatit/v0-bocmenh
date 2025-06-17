"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Crystal } from "@/lib/crystals"
import { Sparkles, Heart, Shield, Zap } from "lucide-react"
import Image from "next/image"

interface CrystalCardProps {
  crystal: Crystal
  language?: "en" | "vi"
}

export default function CrystalCard({ crystal, language = "en" }: CrystalCardProps) {
  const name = language === "vi" ? crystal.nameVi : crystal.name
  const properties = language === "vi" ? crystal.propertiesVi : crystal.properties
  const healingBenefits = language === "vi" ? crystal.healingBenefitsVi : crystal.healingBenefits
  const cleansing = language === "vi" ? crystal.cleansingVi : crystal.cleansing
  const meditation = language === "vi" ? crystal.meditationVi : crystal.meditation
  const placement = language === "vi" ? crystal.placementVi : crystal.placement

  const getChakraColor = (chakra: string) => {
    if (chakra.toLowerCase().includes("root")) return "bg-red-100 text-red-800"
    if (chakra.toLowerCase().includes("sacral")) return "bg-orange-100 text-orange-800"
    if (chakra.toLowerCase().includes("solar")) return "bg-yellow-100 text-yellow-800"
    if (chakra.toLowerCase().includes("heart")) return "bg-green-100 text-green-800"
    if (chakra.toLowerCase().includes("throat")) return "bg-blue-100 text-blue-800"
    if (chakra.toLowerCase().includes("third")) return "bg-indigo-100 text-indigo-800"
    if (chakra.toLowerCase().includes("crown")) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <Card className="h-full bg-gradient-to-br from-white to-purple-50 border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <CardHeader className="text-center pb-4">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={crystal.image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover rounded-full border-4 border-purple-200"
          />
        </div>
        <CardTitle className="text-xl font-bold text-purple-800">{name}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          <Badge className={`${getChakraColor(crystal.chakra)} mr-2`}>{crystal.chakra}</Badge>
          <Badge variant="outline" className="text-purple-600 border-purple-300">
            {crystal.element}
          </Badge>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-purple-700 flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4" />
            {language === "vi" ? "Đặc Tính" : "Properties"}
          </h4>
          <div className="flex flex-wrap gap-1">
            {properties.map((property, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                {property}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-green-700 flex items-center gap-2 mb-2">
            <Heart className="h-4 w-4" />
            {language === "vi" ? "Lợi Ích Chữa Lành" : "Healing Benefits"}
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {healingBenefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-blue-700 flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4" />
            {language === "vi" ? "Cách Sử Dụng" : "How to Use"}
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            <strong>{language === "vi" ? "Thiền:" : "Meditation:"}</strong> {meditation}
          </p>
          <p className="text-sm text-gray-600">
            <strong>{language === "vi" ? "Đặt vị trí:" : "Placement:"}</strong> {placement}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-indigo-700 flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4" />
            {language === "vi" ? "Làm Sạch" : "Cleansing"}
          </h4>
          <div className="flex flex-wrap gap-1">
            {cleansing.map((method, index) => (
              <Badge key={index} variant="outline" className="text-xs text-indigo-600 border-indigo-300">
                {method}
              </Badge>
            ))}
          </div>
        </div>

        {crystal.zodiacSigns.length > 0 && !crystal.zodiacSigns.includes("All signs") && (
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">
              {language === "vi" ? "Cung Hoàng Đạo" : "Zodiac Signs"}
            </h4>
            <div className="flex flex-wrap gap-1">
              {crystal.zodiacSigns.map((sign, index) => (
                <Badge key={index} variant="outline" className="text-xs text-purple-600 border-purple-300">
                  {sign}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
