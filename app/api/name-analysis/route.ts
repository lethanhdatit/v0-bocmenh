import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { decryptData, encryptData } from "@/lib/encryption"
import { analyzeCompleteName } from "@/lib/nameAnalysis"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { encrypted } = body

    // Decrypt the request data
    const { fullName, analysisType } = decryptData(encrypted)

    const session = await getSession()
    const isGuest = !session.isLoggedIn
    const isPremium = session.isPremium || false

    // Validation
    const errors: Record<string, string> = {}

    if (!fullName || fullName.trim().length < 2) {
      errors.fullName = "Họ tên phải có ít nhất 2 ký tự"
    }

    if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(fullName.trim())) {
      errors.fullName = "Họ tên chỉ được chứa chữ cái và khoảng trắng"
    }

    if (Object.keys(errors).length > 0) {
      const errorData = {
        success: false,
        errors,
        message: "Vui lòng kiểm tra lại thông tin",
      }
      return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 400 })
    }

    // Analyze the name
    const analysis = analyzeCompleteName(fullName.trim())

    // Limit results based on user type
    let responseData
    if (isGuest) {
      responseData = {
        success: true,
        isLimited: true,
        data: {
          fullName: analysis.fullName,
          coreNumbers: {
            destinyNumber: analysis.destinyNumber,
            personalityNumber: analysis.personalityNumber,
            soulUrgeNumber: analysis.soulUrgeNumber,
          },
          nameVibration: analysis.nameVibration,
          personalityTraits: analysis.personalityTraits.slice(0, 3),
          luckyColors: analysis.luckyColors.slice(0, 2),
          preview:
            "Đăng ký để xem phân tích đầy đủ về tên của bạn, bao gồm bài học nghiệp quả, số đam mê ẩn giấu và lời khuyên chi tiết...",
        },
      }
    } else if (!isPremium) {
      responseData = {
        success: true,
        isLimited: true,
        data: {
          fullName: analysis.fullName,
          coreNumbers: {
            destinyNumber: analysis.destinyNumber,
            personalityNumber: analysis.personalityNumber,
            soulUrgeNumber: analysis.soulUrgeNumber,
            expressionNumber: analysis.expressionNumber,
          },
          nameVibration: analysis.nameVibration,
          personalityTraits: analysis.personalityTraits,
          strengths: analysis.strengths,
          challenges: analysis.challenges.slice(0, 2),
          luckyColors: analysis.luckyColors,
          luckyDays: analysis.luckyDays,
          careerSuggestions: analysis.careerSuggestions.slice(0, 3),
          cornerstone: analysis.cornerstone,
          capstone: analysis.capstone,
          preview:
            "Nâng cấp Premium để xem phân tích số đam mê ẩn giấu, bài học nghiệp quả, tương hợp tình yêu và lời khuyên cá nhân hóa...",
        },
      }
    } else {
      responseData = {
        success: true,
        isLimited: false,
        data: analysis,
      }
    }

    return NextResponse.json({ encrypted: encryptData(responseData) })
  } catch (error) {
    console.error("Name analysis error:", error)
    const errorData = {
      success: false,
      error: "Internal server error",
    }

    return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 500 })
  }
}
