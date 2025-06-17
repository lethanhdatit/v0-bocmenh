import { type NextRequest, NextResponse } from "next/server"
import {
  calculateAnnualFlyingStars,
  calculateMonthlyFlyingStars,
  getYearlyDirectionAnalysis,
  flyingStarsData,
  getCurrentPeriod,
} from "@/lib/flyingStars"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { year, month, analysisType = "annual" } = body

    // Validation
    if (!year || year < 1900 || year > 2100) {
      return NextResponse.json({ error: "Năm không hợp lệ. Vui lòng nhập năm từ 1900 đến 2100." }, { status: 400 })
    }

    if (analysisType === "monthly" && (!month || month < 1 || month > 12)) {
      return NextResponse.json({ error: "Tháng không hợp lệ. Vui lòng nhập tháng từ 1 đến 12." }, { status: 400 })
    }

    const currentPeriod = getCurrentPeriod(year)
    const annualChart = calculateAnnualFlyingStars(year)
    const yearlyAnalysis = getYearlyDirectionAnalysis(year)

    const result: any = {
      year,
      period: currentPeriod,
      annualChart,
      yearlyAnalysis,
      starDetails: flyingStarsData,
    }

    if (analysisType === "monthly" && month) {
      const monthlyChart = calculateMonthlyFlyingStars(month, year)
      result.monthlyChart = monthlyChart
      result.month = month
    }

    // Add recommendations based on current period
    result.periodRecommendations = getPeriodRecommendations(currentPeriod.period)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Flying Stars calculation error:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tính toán Cửu Tinh Phi Phủ. Vui lòng thử lại." },
      { status: 500 },
    )
  }
}

function getPeriodRecommendations(period: number): string[] {
  const recommendations: { [key: number]: string[] } = {
    7: [
      "Thời kỳ Kim vận - tập trung vào kim loại và màu trắng",
      "Tăng cường yếu tố kim loại trong trang trí",
      "Chú ý đến hướng Tây và Tây Bắc",
    ],
    8: [
      "Thời kỳ Thổ vận - sử dụng màu vàng và đỏ",
      "Đặt đồ vật bằng đất nung hoặc đá",
      "Kích hoạt hướng Đông Bắc và Tây Nam",
    ],
    9: [
      "Thời kỳ Hỏa vận - tăng cường ánh sáng và màu đỏ",
      "Sử dụng đèn và nến để kích hoạt năng lượng",
      "Chú trọng hướng Nam và các yếu tố lửa",
    ],
    1: ["Thời kỳ Thủy vận - tập trung vào nước và màu đen/xanh", "Đặt hồ nước hoặc thác nước", "Kích hoạt hướng Bắc"],
  }

  return recommendations[period] || []
}
