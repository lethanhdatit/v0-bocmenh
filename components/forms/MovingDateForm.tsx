"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Home, Clock, Star, AlertTriangle, CheckCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { MovingDateRequest, MovingDateResponse } from "@/lib/movingDate"
import { apiClient } from "@/lib/api"

export default function MovingDateForm() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<MovingDateRequest>({
    name: "",
    birthDate: "",
    gender: "male",
    preferredMonth: "",
    urgency: "flexible",
  })
  const [result, setResult] = useState<MovingDateResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await apiClient.post("/api/moving-date", formData)
      setResult(response.data)
    } catch (err) {
      setError("Có lỗi xảy ra khi tính toán. Vui lòng thử lại.")
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Rất tốt"
    if (score >= 80) return "Tốt"
    if (score >= 60) return "Khá"
    if (score >= 40) return "Trung bình"
    return "Không tốt"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full">
              <Home className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Chọn Ngày Chuyển Nhà</h1>
          <p className="text-xl text-blue-100">Tìm ngày tốt để chuyển nhà theo phong thủy</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Thông tin cá nhân
            </CardTitle>
            <CardDescription className="text-blue-100">Nhập thông tin để tìm ngày chuyển nhà phù hợp</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Họ và tên *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Nhập họ và tên của bạn"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-white">
                    Ngày sinh *
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="bg-white/20 border-white/30 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-white">Giới tính *</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value: "male" | "female") => setFormData({ ...formData, gender: value })}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" className="border-white text-white" />
                    <Label htmlFor="male" className="text-white">
                      Nam
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" className="border-white text-white" />
                    <Label htmlFor="female" className="text-white">
                      Nữ
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Mức độ cấp thiết</Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value: "flexible" | "within_month" | "within_week") =>
                    setFormData({ ...formData, urgency: value })
                  }
                >
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">Linh hoạt (3 tháng)</SelectItem>
                    <SelectItem value="within_month">Trong vòng 1 tháng</SelectItem>
                    <SelectItem value="within_week">Trong vòng 1 tuần)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-200">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Đang tính toán...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Tìm ngày tốt
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <div className="mt-8 space-y-6">
            {/* Best Dates */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Ngày tốt để chuyển nhà
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {result.bestDates.slice(0, 5).map((date, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{formatDate(date.date)}</h3>
                          <p className="text-blue-200">{date.lunarDate} âm lịch</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getScoreColor(date.score)}`}>{date.score}</div>
                          <div className="text-sm text-white/70">{getScoreLabel(date.score)}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-white font-medium mb-2">Lý do:</h4>
                          <ul className="space-y-1">
                            {date.reasons.map((reason, idx) => (
                              <li key={idx} className="text-blue-200 text-sm flex items-start gap-2">
                                <Star className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-white font-medium mb-2">Khung giờ tốt:</h4>
                          <div className="flex flex-wrap gap-2">
                            {date.timeSlots
                              .filter((slot) => slot.isGood)
                              .map((slot, idx) => (
                                <div
                                  key={idx}
                                  className="bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-sm"
                                >
                                  {slot.time}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Avoid Dates */}
            {result.avoidDates.length > 0 && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    Ngày nên tránh
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {result.avoidDates.map((date, index) => (
                      <div key={index} className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-white font-medium">{formatDate(date.date)}</h3>
                            <p className="text-red-200 text-sm">{date.lunarDate} âm lịch</p>
                          </div>
                          <div className={`text-lg font-bold ${getScoreColor(date.score)}`}>{date.score}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* General Advice */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Lời khuyên chung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-medium mb-3">Lời khuyên chung:</h3>
                    <ul className="space-y-2">
                      {result.generalAdvice.map((advice, index) => (
                        <li key={index} className="text-blue-200 text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {advice}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-3">Lời khuyên cá nhân:</h3>
                    <ul className="space-y-2">
                      {result.personalAdvice.map((advice, index) => (
                        <li key={index} className="text-blue-200 text-sm flex items-start gap-2">
                          <Star className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          {advice}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
