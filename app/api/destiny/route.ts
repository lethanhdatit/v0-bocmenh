import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { decryptData, encryptData } from "@/lib/encryption"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { encrypted } = body

    // Decrypt the request data
    const { birthDate, birthTime, name } = decryptData(encrypted)

    const session = await getSession()
    const isGuest = !session.isLoggedIn
    const isPremium = session.isPremium || false

    // Simulate destiny reading (replace with real AI/algorithm)
    const destinyReading = {
      personalityTraits: [
        "Bạn là người có tính cách mạnh mẽ và quyết đoán",
        "Bạn có khả năng lãnh đạo tự nhiên",
        "Bạn thường đặt mục tiêu cao và nỗ lực đạt được chúng",
      ],
      careerPath: "Bạn phù hợp với các công việc liên quan đến quản lý, kinh doanh hoặc sáng tạo",
      loveLife: "Trong tình yêu, bạn là người chung thủy và đầu tư nhiều cảm xúc",
      luckyNumbers: [7, 14, 21, 28],
      luckyColors: ["Vàng", "Đỏ", "Cam"],
      challenges: "Bạn cần học cách kiên nhẫn và lắng nghe ý kiến của người khác",
      advice: "Hãy tin tưởng vào trực giác của mình và không ngại thử những điều mới",
    }

    // Limit results for guests
    let responseData
    if (isGuest) {
      responseData = {
        success: true,
        isLimited: true,
        data: {
          personalityTraits: destinyReading.personalityTraits.slice(0, 1),
          preview: "Đăng ký để xem đầy đủ kết quả bóc mệnh của bạn...",
        },
      }
    } else if (!isPremium) {
      responseData = {
        success: true,
        isLimited: true,
        data: {
          ...destinyReading,
          personalityTraits: destinyReading.personalityTraits.slice(0, 2),
          preview: "Nâng cấp Premium để xem phân tích chi tiết hơn...",
        },
      }
    } else {
      responseData = {
        success: true,
        isLimited: false,
        data: destinyReading,
      }
    }

    return NextResponse.json({ encrypted: encryptData(responseData) })
  } catch (error) {
    const errorData = {
      success: false,
      error: "Internal server error",
    }

    return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 500 })
  }
}
