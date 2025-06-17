"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Star, Clock, MapPin } from "lucide-react"
import type { AstrologyReading } from "@/lib/astrology"

export default function AstrologyForm() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AstrologyReading | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/astrology", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setResult(data.data)
      } else {
        alert(data.error || "Có lỗi xảy ra")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Có lỗi xảy ra khi phân tích biểu đồ sao")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-amber-800">
            <Star className="h-6 w-6" />
            Biểu Đồ Sao Cá Nhân
          </CardTitle>
          <p className="text-amber-600">Khám phá bản đồ sao của bạn và hiểu rõ hơn về bản thân</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-amber-700">
                  Họ và tên
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập họ và tên của bạn"
                  required
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-amber-700">
                  Ngày sinh
                </Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthTime" className="text-amber-700 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Giờ sinh
                </Label>
                <Input
                  id="birthTime"
                  name="birthTime"
                  type="time"
                  value={formData.birthTime}
                  onChange={handleInputChange}
                  required
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthPlace" className="text-amber-700 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Nơi sinh
                </Label>
                <Input
                  id="birthPlace"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleInputChange}
                  placeholder="Thành phố, quốc gia"
                  required
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang phân tích biểu đồ sao...
                </>
              ) : (
                <>
                  <Star className="mr-2 h-4 w-4" />
                  Tạo Biểu Đồ Sao
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          {/* Birth Chart */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-purple-800">Biểu Đồ Sao Cá Nhân</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700">Mặt Trời</div>
                  <div className="text-purple-600">{result.birthChart.sun}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700">Mặt Trăng</div>
                  <div className="text-purple-600">{result.birthChart.moon}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700">Cung Thăng</div>
                  <div className="text-purple-600">{result.birthChart.rising}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700">Sao Thủy</div>
                  <div className="text-purple-600">{result.birthChart.mercury}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700">Sao Kim</div>
                  <div className="text-purple-600">{result.birthChart.venus}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700">Sao Hỏa</div>
                  <div className="text-purple-600">{result.birthChart.mars}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700">Sao Mộc</div>
                  <div className="text-purple-600">{result.birthChart.jupiter}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                  <div className="font-semibold text-purple-700">Sao Thổ</div>
                  <div className="text-purple-600">{result.birthChart.saturn}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personality Analysis */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader>
              <CardTitle className="text-blue-800">Phân Tích Tính Cách</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 leading-relaxed">{result.personality}</p>
            </CardContent>
          </Card>

          {/* Strengths & Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-green-800">Điểm Mạnh</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2 text-green-700">
                      <Star className="h-4 w-4 text-green-500" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader>
                <CardTitle className="text-orange-800">Thách Thức</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-center gap-2 text-orange-700">
                      <Star className="h-4 w-4 text-orange-500" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Career & Love */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-indigo-800">Sự Nghiệp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-700">{result.careerGuidance}</p>
              </CardContent>
            </Card>

            <Card className="border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50">
              <CardHeader>
                <CardTitle className="text-pink-800">Tình Yêu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pink-700">{result.loveLife}</p>
              </CardContent>
            </Card>
          </div>

          {/* Lucky Elements */}
          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">Yếu Tố May Mắn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">Số May Mắn</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.luckyNumbers.map((number, index) => (
                      <span key={index} className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">Màu May Mắn</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.luckyColors.map((color, index) => (
                      <span key={index} className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">Cung Tương Hợp</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.compatibility.map((sign, index) => (
                      <span key={index} className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">
                        {sign}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
