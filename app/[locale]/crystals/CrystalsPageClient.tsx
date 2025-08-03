"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CrystalForm from "@/components/forms/CrystalForm"
import CrystalCard from "@/components/crystals/CrystalCard"
import type { Crystal } from "@/lib/crystals"
import { Gem, Sparkles, Heart, Shield, BookOpen, Star } from "lucide-react"

export default function CrystalsPageClient() {
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
            Đá Quý Chữa Lành
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">Crystal Healing Guide</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Khám phá sức mạnh chữa lành cổ xưa của đá quý. Tìm những viên đá hoàn hảo để hỗ trợ hành trình tâm linh,
            chữa lành cảm xúc và biến đổi cá nhân của bạn.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the ancient wisdom of crystal healing. Find the perfect crystals to support your spiritual journey,
            emotional healing, and personal transformation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">💎 Đá Theo Cung Hoàng Đạo</span>
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">🧘‍♀️ Cân Bằng Chakra</span>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">✨ Chữa Lành Cảm Xúc</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">🛡️ Bảo Vệ Năng Lượng</span>
          </div>
        </div>

        {!showRecommendations ? (
          <>
            {/* Crystal Form */}
            <div className="mb-12">
              <CrystalForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>

            {/* Crystal Benefits Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-purple-800">Chữa Lành Cảm Xúc</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-purple-700">
                    Giải phóng tổn thương cảm xúc và thúc đẩy bình an nội tâm với đá quý chữa lành
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Shield className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-pink-800">Bảo Vệ Năng Lượng</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-pink-700">
                    Che chắn khỏi năng lượng tiêu cực và tạo ra trường bảo vệ mạnh mẽ
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-indigo-100 to-indigo-200 border-indigo-300 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-indigo-800">Phát Triển Tâm Linh</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-indigo-700">
                    Tăng cường thiền định, trực giác và kết nối với ý thức cao hơn
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-gradient-to-br from-green-100 to-green-200 border-green-300 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg text-green-800">Thu Hút Thịnh Vượng</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-700">
                    Khuếch đại ý định của bạn và thu hút sự giàu có vào cuộc sống
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Crystal Care Tips */}
            <Card className="mb-12 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <BookOpen className="h-5 w-5" />
                  Hướng Dẫn Chăm Sóc & Làm Sạch Đá Quý
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-amber-700 mb-3">Phương Pháp Làm Sạch:</h4>
                  <ul className="space-y-2 text-sm text-amber-600">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">🌙</span>
                      <span>
                        <strong>Ánh Trăng:</strong> Đặt đá dưới ánh trăng tròn qua đêm
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">🌿</span>
                      <span>
                        <strong>Khói Xông:</strong> Dùng khói xông hoặc palo santo
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">💧</span>
                      <span>
                        <strong>Nước Chảy:</strong> Rửa dưới nước tự nhiên
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">🔔</span>
                      <span>
                        <strong>Âm Thanh:</strong> Sử dụng chuông Tây Tạng hoặc ting sha
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-700 mb-3">Nạp Năng Lượng & Sử Dụng:</h4>
                  <ul className="space-y-2 text-sm text-amber-600">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">🎯</span>
                      <span>
                        <strong>Đặt Ý Định:</strong> Cầm đá và tập trung vào mục tiêu
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">🧘‍♀️</span>
                      <span>
                        <strong>Thiền Định:</strong> Cầm hoặc đặt gần khi thiền
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">👜</span>
                      <span>
                        <strong>Mang Theo:</strong> Giữ trong túi hoặc đeo như trang sức
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">🏠</span>
                      <span>
                        <strong>Đặt Nhà:</strong> Bố trí ở vị trí cụ thể để thu hút năng lượng
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Popular Crystals for Vietnamese Users */}
            <Card className="mb-12 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <Gem className="h-5 w-5" />
                  Đá Quý Phổ Biến Ở Việt Nam
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">💜</span>
                    </div>
                    <h4 className="font-semibold text-emerald-700 mb-2">Thạch Anh Tím (Amethyst)</h4>
                    <p className="text-sm text-emerald-600">Tăng trực giác, bình tĩnh tâm trí, hỗ trợ thiền định</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">💖</span>
                    </div>
                    <h4 className="font-semibold text-emerald-700 mb-2">Thạch Anh Hồng (Rose Quartz)</h4>
                    <p className="text-sm text-emerald-600">Thu hút tình yêu, chữa lành trái tim, gia tăng lòng từ bi</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">💛</span>
                    </div>
                    <h4 className="font-semibold text-emerald-700 mb-2">Thạch Anh Vàng (Citrine)</h4>
                    <p className="text-sm text-emerald-600">Thu hút tài lộc, tăng tự tin, mang lại thành công</p>
                  </div>
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
                    Phân Tích Đá Quý Của Bạn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <Badge className="bg-purple-200 text-purple-800 mb-2">Mục Đích Chính</Badge>
                      <p className="font-semibold text-purple-700 capitalize">{analysis.intention}</p>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-pink-200 text-pink-800 mb-2">Chakra Tập Trung</Badge>
                      <p className="font-semibold text-pink-700 capitalize">{analysis.chakra}</p>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-indigo-200 text-indigo-800 mb-2">Số Gợi Ý</Badge>
                      <p className="font-semibold text-indigo-700">{analysis.recommendationCount} Viên Đá</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Crystal Recommendations */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-800">Đá Quý Được Gợi Ý Cho Bạn</h2>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  Tìm Gợi Ý Mới
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
                      Không tìm thấy đá quý phù hợp với tiêu chí của bạn. Hãy thử điều chỉnh lựa chọn.
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
