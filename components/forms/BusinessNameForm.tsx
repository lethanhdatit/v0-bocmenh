"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Building2, TrendingUp, Users, Target, Lightbulb, Calendar, Users2 } from "lucide-react"
import type { BusinessNameAnalysisResult } from "@/lib/businessNameAnalysis"

interface BusinessNameFormProps {
  onAnalysis?: (result: BusinessNameAnalysisResult) => void
}

export default function BusinessNameForm({ onAnalysis }: BusinessNameFormProps) {
  const [businessName, setBusinessName] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [ownerBirthDate, setOwnerBirthDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<BusinessNameAnalysisResult | null>(null)
  const [error, setError] = useState("")

  const businessTypes = [
    "Công nghệ / Technology",
    "Bán lẻ / Retail",
    "Dịch vụ / Services",
    "Sản xuất / Manufacturing",
    "Y tế / Healthcare",
    "Giáo dục / Education",
    "Tài chính / Finance",
    "Bất động sản / Real Estate",
    "Nhà hàng / Restaurant",
    "Tư vấn / Consulting",
    "Marketing / Advertising",
    "Xây dựng / Construction",
    "Vận tải / Transportation",
    "Thời trang / Fashion",
    "Khác / Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessName.trim() || !businessType) {
      setError("Vui lòng nhập tên doanh nghiệp và chọn loại hình kinh doanh")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/business-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: businessName.trim(),
          businessType,
          ownerBirthDate: ownerBirthDate || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Có lỗi xảy ra")
      }

      setResult(data.data)
      onAnalysis?.(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra khi phân tích")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setBusinessName("")
    setBusinessType("")
    setOwnerBirthDate("")
    setResult(null)
    setError("")
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Building2 className="h-6 w-6" />
            Phân Tích Tên Doanh Nghiệp
          </CardTitle>
          <CardDescription className="text-purple-600">
            Khám phá năng lượng thần số học của tên doanh nghiệp và tiềm năng thành công
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-purple-700 font-medium">
                Tên Doanh Nghiệp *
              </Label>
              <Input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Nhập tên doanh nghiệp của bạn"
                className="border-purple-200 focus:border-purple-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType" className="text-purple-700 font-medium">
                Loại Hình Kinh Doanh *
              </Label>
              <Select value={businessType} onValueChange={setBusinessType} required>
                <SelectTrigger className="border-purple-200 focus:border-purple-400">
                  <SelectValue placeholder="Chọn loại hình kinh doanh" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerBirthDate" className="text-purple-700 font-medium">
                Ngày Sinh Chủ Doanh Nghiệp (Tùy chọn)
              </Label>
              <Input
                id="ownerBirthDate"
                type="date"
                value={ownerBirthDate}
                onChange={(e) => setOwnerBirthDate(e.target.value)}
                className="border-purple-200 focus:border-purple-400"
              />
              <p className="text-sm text-purple-600">Thêm ngày sinh để có phân tích tương hợp chủ doanh nghiệp</p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang phân tích...
                  </>
                ) : (
                  "Phân Tích Tên Doanh Nghiệp"
                )}
              </Button>
              {result && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  Phân Tích Mới
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          {/* Core Numbers */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800">Các Số Cốt Lõi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-amber-600 mb-2">{result.destinyNumber}</div>
                  <div className="text-sm text-amber-700">Số Định Mệnh</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{result.personalityNumber}</div>
                  <div className="text-sm text-orange-700">Số Cá Tính</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-pink-600 mb-2">{result.soulNumber}</div>
                  <div className="text-sm text-pink-700">Số Linh Hồn</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{result.successNumber}</div>
                  <div className="text-sm text-purple-700">Số Thành Công</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">{result.overallScore}</div>
                  <div className="text-sm text-green-700">Điểm Tổng</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Brand Vibration */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Target className="h-5 w-5" />
                Năng Lượng Thương Hiệu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 text-lg font-medium">{result.brandVibration}</p>
            </CardContent>
          </Card>

          {/* Lucky Elements */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 text-lg">Màu Sắc May Mắn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.luckyColors.map((color, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {color}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800 text-lg">Số May Mắn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.luckyNumbers.map((number, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium"
                    >
                      {number}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800 text-lg">
                  <Calendar className="h-4 w-4" />
                  Ngày Thuận Lợi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {result.favorableDays.map((day, index) => (
                    <div key={index} className="text-purple-700 text-sm">
                      {day}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strengths and Challenges */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <TrendingUp className="h-5 w-5" />
                  Điểm Mạnh Kinh Doanh
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.businessStrengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-green-700">
                      <span className="text-green-500 mt-1">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Target className="h-5 w-5" />
                  Thách Thức Tiềm Ẩn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.potentialChallenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 text-orange-700">
                      <span className="text-orange-500 mt-1">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Marketing and Customer Attraction */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-800">
                  <Lightbulb className="h-5 w-5" />
                  Lời Khuyên Marketing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.marketingAdvice.map((advice, index) => (
                    <li key={index} className="flex items-start gap-2 text-pink-700">
                      <span className="text-pink-500 mt-1">•</span>
                      {advice}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-800">
                  <Users className="h-5 w-5" />
                  Thu Hút Khách Hàng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cyan-700">{result.customerAttraction}</p>
              </CardContent>
            </Card>
          </div>

          {/* Financial Outlook */}
          <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <TrendingUp className="h-5 w-5" />
                Triển Vọng Tài Chính
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-700 leading-relaxed">{result.financialOutlook}</p>
            </CardContent>
          </Card>

          {/* Competitive Advantage */}
          <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-violet-800">
                <Target className="h-5 w-5" />
                Lợi Thế Cạnh Tranh
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.competitiveAdvantage.map((advantage, index) => (
                  <li key={index} className="flex items-start gap-2 text-violet-700">
                    <span className="text-violet-500 mt-1">•</span>
                    {advantage}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Branding Tips */}
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-800">
                <Lightbulb className="h-5 w-5" />
                Gợi Ý Xây Dựng Thương Hiệu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.brandingTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-indigo-700">
                    <span className="text-indigo-500 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Launch Timing and Partnership */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Calendar className="h-5 w-5" />
                  Thời Điểm Khởi Động
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700">{result.launchTiming}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-800">
                  <Users2 className="h-5 w-5" />
                  Tương Hợp Đối Tác
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {result.partnershipCompatibility.map((compatibility, index) => (
                    <li key={index} className="text-teal-700 text-sm">
                      {compatibility}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-800">Phân Tích Chi Tiết</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none">
                <pre className="whitespace-pre-wrap text-slate-700 leading-relaxed">{result.detailedAnalysis}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
