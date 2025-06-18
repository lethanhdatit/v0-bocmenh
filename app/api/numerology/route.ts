import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session/session"
import { decryptData, encryptData } from "@/lib/infra/encryption"
import { calculateCompleteNumerology } from "@/lib/numerology"
import {
  getNumberInterpretation,
  getChallengeInterpretation,
  getPinnacleInterpretation,
} from "@/lib/numerologyInterpretations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { encrypted } = body

    // Decrypt the request data
    const { fullName, birthDate, analysisType } = decryptData(encrypted)

    const session = await getSession()
    const isGuest = !session.isLoggedIn
    const isPremium = session.isPremium || false

    // Validation
    const errors: Record<string, string> = {}

    if (!fullName || fullName.trim().length < 2) {
      errors.fullName = "Họ tên phải có ít nhất 2 ký tự"
    }

    if (!birthDate) {
      errors.birthDate = "Vui lòng nhập ngày sinh"
    } else {
      const date = new Date(birthDate)
      if (isNaN(date.getTime()) || date > new Date()) {
        errors.birthDate = "Ngày sinh không hợp lệ"
      }
    }

    if (Object.keys(errors).length > 0) {
      const errorData = {
        success: false,
        errors,
        message: "Vui lòng kiểm tra lại thông tin",
      }
      return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 400 })
    }

    // Calculate numerology
    const numerologyResult = calculateCompleteNumerology(fullName.trim(), birthDate)

    // Get interpretations
    const lifePathInterpretation = getNumberInterpretation(numerologyResult.lifePathNumber)
    const destinyInterpretation = getNumberInterpretation(numerologyResult.destinyNumber)
    const soulUrgeInterpretation = getNumberInterpretation(numerologyResult.soulUrgeNumber)
    const personalityInterpretation = getNumberInterpretation(numerologyResult.personalityNumber)
    const maturityInterpretation = getNumberInterpretation(numerologyResult.maturityNumber)

    // Challenge interpretations
    const challengeInterpretations = {
      first: getChallengeInterpretation(numerologyResult.challenges.first),
      second: getChallengeInterpretation(numerologyResult.challenges.second),
      third: getChallengeInterpretation(numerologyResult.challenges.third),
      fourth: getChallengeInterpretation(numerologyResult.challenges.fourth),
    }

    // Pinnacle interpretations
    const pinnacleInterpretations = {
      first: getPinnacleInterpretation(numerologyResult.pinnacles.first.number),
      second: getPinnacleInterpretation(numerologyResult.pinnacles.second.number),
      third: getPinnacleInterpretation(numerologyResult.pinnacles.third.number),
      fourth: getPinnacleInterpretation(numerologyResult.pinnacles.fourth.number),
    }

    // Generate compatibility suggestions
    const compatibilityNumbers = generateCompatibilityNumbers(numerologyResult.lifePathNumber)

    // Generate yearly forecast
    const yearlyForecast = generateYearlyForecast(numerologyResult.personalYear)

    // Limit results based on user type
    let responseData
    if (isGuest) {
      responseData = {
        success: true,
        isLimited: true,
        data: {
          coreNumbers: {
            lifePathNumber: numerologyResult.lifePathNumber,
            destinyNumber: numerologyResult.destinyNumber,
            birthdayNumber: numerologyResult.birthdayNumber,
          },
          interpretations: {
            lifePath: {
              meaning: lifePathInterpretation.meaning,
              traits: lifePathInterpretation.traits.slice(0, 3),
              advice: lifePathInterpretation.advice.substring(0, 100) + "...",
            },
            destiny: {
              meaning: destinyInterpretation.meaning,
              traits: destinyInterpretation.traits.slice(0, 2),
            },
          },
          luckyNumbers: numerologyResult.luckyNumbers.slice(0, 4),
          personalYear: numerologyResult.personalYear,
          preview:
            "Đăng ký để xem phân tích đầy đủ về số học của bạn, bao gồm thách thức, đỉnh cao cuộc đời và dự báo chi tiết...",
        },
      }
    } else if (!isPremium) {
      responseData = {
        success: true,
        isLimited: true,
        data: {
          coreNumbers: {
            lifePathNumber: numerologyResult.lifePathNumber,
            destinyNumber: numerologyResult.destinyNumber,
            soulUrgeNumber: numerologyResult.soulUrgeNumber,
            personalityNumber: numerologyResult.personalityNumber,
            birthdayNumber: numerologyResult.birthdayNumber,
          },
          interpretations: {
            lifePath: lifePathInterpretation,
            destiny: destinyInterpretation,
            soulUrge: soulUrgeInterpretation,
            personality: personalityInterpretation,
          },
          luckyNumbers: numerologyResult.luckyNumbers,
          personalCycles: {
            personalYear: numerologyResult.personalYear,
            personalMonth: numerologyResult.personalMonth,
            personalDay: numerologyResult.personalDay,
          },
          challenges: {
            numbers: numerologyResult.challenges,
            interpretations: {
              first: challengeInterpretations.first,
              second: challengeInterpretations.second,
            },
          },
          preview:
            "Nâng cấp Premium để xem phân tích đỉnh cao cuộc đời, dự báo năm, tương hợp và nhiều tính năng khác...",
        },
      }
    } else {
      responseData = {
        success: true,
        isLimited: false,
        data: {
          coreNumbers: {
            lifePathNumber: numerologyResult.lifePathNumber,
            destinyNumber: numerologyResult.destinyNumber,
            soulUrgeNumber: numerologyResult.soulUrgeNumber,
            personalityNumber: numerologyResult.personalityNumber,
            birthdayNumber: numerologyResult.birthdayNumber,
            maturityNumber: numerologyResult.maturityNumber,
          },
          interpretations: {
            lifePath: lifePathInterpretation,
            destiny: destinyInterpretation,
            soulUrge: soulUrgeInterpretation,
            personality: personalityInterpretation,
            maturity: maturityInterpretation,
          },
          luckyNumbers: numerologyResult.luckyNumbers,
          personalCycles: {
            personalYear: numerologyResult.personalYear,
            personalMonth: numerologyResult.personalMonth,
            personalDay: numerologyResult.personalDay,
          },
          challenges: {
            numbers: numerologyResult.challenges,
            interpretations: challengeInterpretations,
          },
          pinnacles: {
            numbers: numerologyResult.pinnacles,
            interpretations: pinnacleInterpretations,
          },
          compatibility: compatibilityNumbers,
          yearlyForecast,
          advice: generatePersonalAdvice(numerologyResult),
        },
      }
    }

    return NextResponse.json({ encrypted: encryptData(responseData) })
  } catch (error) {
    console.error("Numerology calculation error:", error)
    const errorData = {
      success: false,
      error: "Internal server error",
    }

    return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 500 })
  }
}

function generateCompatibilityNumbers(lifePathNumber: number): {
  mostCompatible: number[]
  compatible: number[]
  challenging: number[]
} {
  const compatibility: Record<number, { most: number[]; good: number[]; challenging: number[] }> = {
    1: { most: [1, 5, 7], good: [3, 9], challenging: [2, 4, 6, 8] },
    2: { most: [2, 4, 8], good: [1, 6, 9], challenging: [3, 5, 7] },
    3: { most: [3, 6, 9], good: [1, 2, 5], challenging: [4, 7, 8] },
    4: { most: [2, 4, 8], good: [6, 7], challenging: [1, 3, 5, 9] },
    5: { most: [1, 5, 7], good: [3, 9], challenging: [2, 4, 6, 8] },
    6: { most: [2, 3, 6, 9], good: [4, 8], challenging: [1, 5, 7] },
    7: { most: [1, 5, 7], good: [4], challenging: [2, 3, 6, 8, 9] },
    8: { most: [2, 4, 8], good: [6], challenging: [1, 3, 5, 7, 9] },
    9: { most: [3, 6, 9], good: [1, 2, 5], challenging: [4, 7, 8] },
  }

  const compat = compatibility[lifePathNumber] || compatibility[1]
  return {
    mostCompatible: compat.most,
    compatible: compat.good,
    challenging: compat.challenging,
  }
}

function generateYearlyForecast(personalYear: number): {
  theme: string
  opportunities: string[]
  challenges: string[]
  advice: string
} {
  const forecasts: Record<number, any> = {
    1: {
      theme: "Năm khởi đầu mới - Năm của sự độc lập và lãnh đạo",
      opportunities: ["Bắt đầu dự án mới", "Phát triển kỹ năng lãnh đạo", "Tự khẳng định bản thân"],
      challenges: ["Tránh quá độc đoán", "Học cách hợp tác", "Kiên nhẫn với tiến trình"],
      advice: "Đây là năm tuyệt vời để bắt đầu những điều mới. Hãy dũng cảm và tin tưởng vào bản thân.",
    },
    2: {
      theme: "Năm hợp tác - Năm của mối quan hệ và kiên nhẫn",
      opportunities: ["Xây dựng mối quan hệ", "Hợp tác trong công việc", "Phát triển trực giác"],
      challenges: ["Tránh quá nhạy cảm", "Đừng chờ đợi quá lâu", "Tự tin hơn"],
      advice: "Tập trung vào việc xây dựng mối quan hệ và hợp tác. Kiên nhẫn sẽ được đền đáp.",
    },
    3: {
      theme: "Năm sáng tạo - Năm của nghệ thuật và giao tiếp",
      opportunities: ["Thể hiện sáng tạo", "Cải thiện giao tiếp", "Tham gia hoạt động xã hội"],
      challenges: ["Tránh phân tâm", "Tập trung vào mục tiêu", "Quản lý thời gian"],
      advice: "Thể hiện khả năng sáng tạo và giao tiếp. Đây là năm để tỏa sáng trong xã hội.",
    },
    4: {
      theme: "Năm xây dựng - Năm của công việc chăm chỉ và tổ chức",
      opportunities: ["Xây dựng nền tảng", "Tổ chức cuộc sống", "Phát triển kỹ năng"],
      challenges: ["Tránh quá cứng nhắc", "Cân bằng công việc", "Không quá căng thẳng"],
      advice: "Tập trung vào việc xây dựng nền tảng vững chắc. Công việc chăm chỉ sẽ được đền đáp.",
    },
    5: {
      theme: "Năm tự do - Năm của thay đổi và phiêu lưu",
      opportunities: ["Du lịch và khám phá", "Thay đổi tích cực", "Học hỏi mới"],
      challenges: ["Tránh bốc đồng", "Không thay đổi quá nhiều", "Kiên nhẫn với kết quả"],
      advice: "Đây là năm của tự do và thay đổi. Hãy mở lòng với những trải nghiệm mới.",
    },
    6: {
      theme: "Năm trách nhiệm - Năm của gia đình và chăm sóc",
      opportunities: ["Tập trung vào gia đình", "Chăm sóc sức khỏe", "Tạo hòa hợp"],
      challenges: ["Tránh hy sinh quá mức", "Cân bằng cho và nhận", "Không kiểm soát quá"],
      advice: "Tập trung vào gia đình và trách nhiệm. Học cách cân bằng giữa cho và nhận.",
    },
    7: {
      theme: "Năm tâm linh - Năm của tìm kiếm và phát triển nội tại",
      opportunities: ["Phát triển tâm linh", "Học hỏi sâu", "Tìm kiếm chân lý"],
      challenges: ["Tránh cô lập", "Chia sẻ với người khác", "Không quá hoài nghi"],
      advice: "Đây là năm để tìm kiếm ý nghĩa sâu sắc. Dành thời gian cho việc phát triển nội tại.",
    },
    8: {
      theme: "Năm thành công - Năm của thành tựu vật chất và quyền lực",
      opportunities: ["Thành công trong kinh doanh", "Tăng thu nhập", "Đạt được quyền lực"],
      challenges: ["Cân bằng vật chất và tinh thần", "Tránh quá tham lam", "Quan tâm đến người khác"],
      advice: "Đây là năm của thành công vật chất. Sử dụng thành công để giúp đỡ người khác.",
    },
    9: {
      theme: "Năm hoàn thành - Năm của kết thúc và chuẩn bị cho chu kỳ mới",
      opportunities: ["Hoàn thành dự án", "Phục vụ cộng đồng", "Chia sẻ kinh nghiệm"],
      challenges: ["Buông bỏ quá khứ", "Chuẩn bị cho mới", "Tránh quá cảm tính"],
      advice: "Đây là năm để hoàn thành và chuẩn bị cho chu kỳ mới. Hãy chia sẻ những gì bạn đã học được.",
    },
  }

  return forecasts[personalYear] || forecasts[1]
}

function generatePersonalAdvice(numerology: any): string[] {
  const advice = []

  // Based on Life Path Number
  if (numerology.lifePathNumber === 1) {
    advice.push("Phát triển khả năng lãnh đạo tự nhiên của bạn, nhưng học cách lắng nghe người khác.")
  } else if (numerology.lifePathNumber === 2) {
    advice.push("Sử dụng khả năng hợp tác để xây dựng mối quan hệ mạnh mẽ.")
  }

  // Based on Personal Year
  if (numerology.personalYear === 1) {
    advice.push("Đây là thời điểm tuyệt vời để bắt đầu những dự án mới và thể hiện sự độc lập.")
  } else if (numerology.personalYear === 9) {
    advice.push("Hoàn thành những gì đã bắt đầu và chuẩn bị cho một chu kỳ mới.")
  }

  // Based on challenges
  if (numerology.challenges.first === 0) {
    advice.push("Bạn có khả năng cân bằng tốt, hãy sử dụng điều này để giúp đỡ người khác.")
  }

  // General advice
  advice.push("Tin tưởng vào con đường của bạn và sử dụng những con số may mắn để tăng cường năng lượng tích cực.")

  return advice
}
