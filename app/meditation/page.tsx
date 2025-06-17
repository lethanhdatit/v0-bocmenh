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

export default function MeditationPage() {
  const [recommendations, setRecommendations] = useState<MeditationGuide[]>([])
  const [analysis, setAnalysis] = useState<MeditationAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState<"en" | "vi">("en")

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

  const benefits = [
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "Mental Clarity",
      titleVi: "Tinh Thần Minh Mẫn",
      description: "Improve focus and cognitive function",
      descriptionVi: "Cải thiện sự tập trung và chức năng nhận thức",
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-600" />,
      title: "Emotional Balance",
      titleVi: "Cân Bằng Cảm Xúc",
      description: "Develop emotional resilience and stability",
      descriptionVi: "Phát triển khả năng phục hồi và ổn định cảm xúc",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
      title: "Spiritual Growth",
      titleVi: "Phát Triển Tâm Linh",
      description: "Deepen your connection with inner wisdom",
      descriptionVi: "Làm sâu sắc kết nối với trí tuệ bên trong",
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "Stress Relief",
      titleVi: "Giảm Căng Thẳng",
      description: "Reduce anxiety and promote relaxation",
      descriptionVi: "Giảm lo âu và thúc đẩy thư giãn",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Meditation Guides
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">Hướng Dẫn Thiền Định</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the transformative power of meditation with our comprehensive guides. Find inner peace, reduce
            stress, and enhance your well-being through mindful practice.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mt-2">
            Khám phá sức mạnh biến đổi của thiền định với các hướng dẫn toàn diện. Tìm thấy sự bình an nội tâm, giảm
            căng thẳng và nâng cao sức khỏe thông qua thực hành chánh niệm.
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-md transition-all ${
                language === "en" ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("vi")}
              className={`px-4 py-2 rounded-md transition-all ${
                language === "vi" ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Tiếng Việt
            </button>
          </div>
        </div>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form">{language === "vi" ? "Tìm Thiền Phù Hợp" : "Find Your Meditation"}</TabsTrigger>
            <TabsTrigger value="benefits">
              {language === "vi" ? "Lợi Ích Thiền Định" : "Meditation Benefits"}
            </TabsTrigger>
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
                      {language === "vi" ? "Phân Tích Cá Nhân" : "Personal Analysis"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{analysis.totalGuides}</div>
                        <div className="text-sm text-gray-600">
                          {language === "vi" ? "Gợi Ý Thiền" : "Recommended Meditations"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{analysis.averageDuration}</div>
                        <div className="text-sm text-gray-600">
                          {language === "vi" ? "Phút Trung Bình" : "Average Minutes"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">{analysis.recommendedTypes.length}</div>
                        <div className="text-sm text-gray-600">
                          {language === "vi" ? "Loại Thiền" : "Meditation Types"}
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <p className="text-gray-700 leading-relaxed">
                        {language === "vi" ? analysis.personalizedMessageVi : analysis.personalizedMessage}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {language === "vi" ? "Thiền Định Được Gợi Ý" : "Recommended Meditations"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((meditation) => (
                      <MeditationCard key={meditation.id} meditation={meditation} language={language} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="benefits" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-white border-purple-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{benefit.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {language === "vi" ? benefit.titleVi : benefit.title}
                        </h3>
                        <p className="text-gray-600">
                          {language === "vi" ? benefit.descriptionVi : benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Getting Started Tips */}
            <Card className="bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {language === "vi" ? "Mẹo Bắt Đầu" : "Getting Started Tips"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      {language === "vi" ? "Cho Người Mới Bắt Đầu:" : "For Beginners:"}
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        {language === "vi" ? "Bắt đầu với 5-10 phút mỗi ngày" : "Start with 5-10 minutes daily"}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        {language === "vi" ? "Tìm một nơi yên tĩnh và thoải mái" : "Find a quiet, comfortable space"}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        {language === "vi" ? "Tập trung vào hơi thở của bạn" : "Focus on your breath"}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      {language === "vi" ? "Xây Dựng Thói Quen:" : "Building Habit:"}
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        {language === "vi" ? "Thiền cùng giờ mỗi ngày" : "Meditate at the same time daily"}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        {language === "vi" ? "Kiên nhẫn với bản thân" : "Be patient with yourself"}
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">•</span>
                        {language === "vi" ? "Theo dõi tiến trình của bạn" : "Track your progress"}
                      </li>
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
