"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GlobalLoading } from "@/components/ui/global-loading"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api/apiClient"
import { Calendar, User, MapPin, Clock } from "lucide-react"

const destinySchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  birthDate: z.string().min(1, "Vui lòng chọn ngày sinh"),
  birthTime: z.string().min(1, "Vui lòng chọn giờ sinh"),
  birthPlace: z.string().min(1, "Vui lòng nhập nơi sinh"),
  gender: z.enum(["male", "female"], {
    required_error: "Vui lòng chọn giới tính",
  }),
})

type DestinyFormData = z.infer<typeof destinySchema>

interface DestinyResult {
  personalityAnalysis: string
  careerForecast: string
  loveLife: string
  healthAdvice: string
  luckyNumbers: number[]
  luckyColors: string[]
  favorableDirections: string[]
  recommendations: string[]
}

export default function DestinyForm() {
  const [result, setResult] = useState<DestinyResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<DestinyFormData>({
    resolver: zodResolver(destinySchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      birthTime: "",
      birthPlace: "",
      gender: undefined,
    },
  })

  const onSubmit = async (data: DestinyFormData) => {
    setIsLoading(true)
    try {
      const response = await apiClient.post("/destiny", data)
      setResult(response.data)
      toast({
        title: "Phân tích thành công",
        description: "Vận mệnh của bạn đã được phân tích xong!",
      })
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0") + ":00")

  return (
    <>
      <GlobalLoading isVisible={isLoading} />

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <Card className="border-yellow-200 shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-yellow-50 to-amber-50">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <User className="w-6 h-6 text-yellow-600" />
              Phân Tích Vận Mệnh Bát Tự
            </CardTitle>
            <CardDescription className="text-gray-600">
              Khám phá vận mệnh và tương lai của bạn thông qua ngày giờ sinh
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Họ và tên đầy đủ
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập họ tên đầy đủ"
                            {...field}
                            className="border-yellow-200 focus:border-yellow-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giới tính</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-yellow-200 focus:border-yellow-400">
                              <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Nam</SelectItem>
                            <SelectItem value="female">Nữ</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Ngày sinh (Âm lịch)
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="border-yellow-200 focus:border-yellow-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="birthTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Giờ sinh
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-yellow-200 focus:border-yellow-400">
                              <SelectValue placeholder="Chọn giờ sinh" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {hours.map((hour) => (
                              <SelectItem key={hour} value={hour}>
                                {hour}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="birthPlace"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Nơi sinh
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập nơi sinh (tỉnh/thành phố)"
                            {...field}
                            className="border-yellow-200 focus:border-yellow-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold py-3 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang phân tích..." : "Phân Tích Vận Mệnh"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Phân Tích Tính Cách</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{result.personalityAnalysis}</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Dự Báo Sự Nghiệp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{result.careerForecast}</p>
              </CardContent>
            </Card>

            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-800">Tình Duyên</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{result.loveLife}</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Sức Khỏe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{result.healthAdvice}</p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-yellow-800">Thông Tin May Mắn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Số may mắn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.luckyNumbers.map((number, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Màu sắc may mắn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.luckyColors.map((color, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Hướng thuận lợi:</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.favorableDirections.map((direction, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {direction}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Lời khuyên:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {result.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}
