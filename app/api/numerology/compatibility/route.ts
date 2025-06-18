import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session/session"
import { decryptData, encryptData } from "@/lib/infra/encryption"
import { calculateNumerologyCompatibility } from "@/lib/numerologyCompatibility"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { encrypted } = body

    // Decrypt the request data
    const { person1, person2, analysisType } = decryptData(encrypted)

    const session = await getSession()
    const isGuest = !session.isLoggedIn
    const isPremium = session.isPremium || false

    // Validation
    const errors: Record<string, string> = {}

    // Validate person 1
    if (!person1?.name || person1.name.trim().length < 2) {
      errors.person1Name = "Tên người thứ nhất phải có ít nhất 2 ký tự"
    }

    if (!person1?.birthDate) {
      errors.person1BirthDate = "Vui lòng nhập ngày sinh người thứ nhất"
    } else {
      const date = new Date(person1.birthDate)
      if (isNaN(date.getTime()) || date > new Date()) {
        errors.person1BirthDate = "Ngày sinh người thứ nhất không hợp lệ"
      }
    }

    // Validate person 2
    if (!person2?.name || person2.name.trim().length < 2) {
      errors.person2Name = "Tên người thứ hai phải có ít nhất 2 ký tự"
    }

    if (!person2?.birthDate) {
      errors.person2BirthDate = "Vui lòng nhập ngày sinh người thứ hai"
    } else {
      const date = new Date(person2.birthDate)
      if (isNaN(date.getTime()) || date > new Date()) {
        errors.person2BirthDate = "Ngày sinh người thứ hai không hợp lệ"
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

    // Calculate compatibility
    const compatibilityResult = calculateNumerologyCompatibility(
      { name: person1.name.trim(), birthDate: person1.birthDate },
      { name: person2.name.trim(), birthDate: person2.birthDate },
    )

    // Generate additional insights based on analysis type
    const additionalInsights = generateAdditionalInsights(compatibilityResult, analysisType)

    // Limit results based on user type
    let responseData
    if (isGuest) {
      responseData = {
        success: true,
        isLimited: true,
        data: {
          overallScore: compatibilityResult.overallScore,
          overallRating: compatibilityResult.overallRating,
          lifePathCompatibility: {
            score: compatibilityResult.lifePathCompatibility.score,
            interpretation: compatibilityResult.lifePathCompatibility.interpretation.substring(0, 150) + "...",
          },
          destinyCompatibility: {
            score: compatibilityResult.destinyCompatibility.score,
            interpretation: compatibilityResult.destinyCompatibility.interpretation.substring(0, 150) + "...",
          },
          strengths: compatibilityResult.strengths.slice(0, 2),
          challenges: compatibilityResult.challenges.slice(0, 2),
          romanticCompatibility: compatibilityResult.romanticCompatibility,
          friendshipCompatibility: compatibilityResult.friendshipCompatibility,
          preview: "Đăng ký để xem phân tích tương hợp đầy đủ, bao gồm lời khuyên chi tiết và dự báo dài hạn...",
        },
      }
    } else if (!isPremium) {
      responseData = {
        success: true,
        isLimited: true,
        data: {
          overallScore: compatibilityResult.overallScore,
          overallRating: compatibilityResult.overallRating,
          lifePathCompatibility: compatibilityResult.lifePathCompatibility,
          destinyCompatibility: compatibilityResult.destinyCompatibility,
          soulUrgeCompatibility: compatibilityResult.soulUrgeCompatibility,
          personalityCompatibility: compatibilityResult.personalityCompatibility,
          strengths: compatibilityResult.strengths,
          challenges: compatibilityResult.challenges,
          relationshipAdvice: compatibilityResult.relationshipAdvice.slice(0, 3),
          romanticCompatibility: compatibilityResult.romanticCompatibility,
          friendshipCompatibility: compatibilityResult.friendshipCompatibility,
          businessCompatibility: compatibilityResult.businessCompatibility,
          communicationStyle: compatibilityResult.communicationStyle,
          preview:
            "Nâng cấp Premium để xem phân tích chi tiết về giải quyết xung đột, tiềm năng dài hạn và lời khuyên cá nhân hóa...",
        },
      }
    } else {
      responseData = {
        success: true,
        isLimited: false,
        data: {
          ...compatibilityResult,
          additionalInsights,
        },
      }
    }

    return NextResponse.json({ encrypted: encryptData(responseData) })
  } catch (error) {
    console.error("Compatibility calculation error:", error)
    const errorData = {
      success: false,
      error: "Internal server error",
    }

    return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 500 })
  }
}

function generateAdditionalInsights(compatibility: any, analysisType: string) {
  const insights: any = {}

  if (analysisType === "romantic") {
    insights.romanticInsights = {
      intimacyLevel: getIntimacyLevel(compatibility.soulUrgeCompatibility.score),
      communicationInLove: getCommunicationInLove(compatibility.personalityCompatibility.score),
      longTermRomance: getLongTermRomance(compatibility.overallScore),
      dateIdeas: generateDateIdeas(compatibility),
    }
  } else if (analysisType === "business") {
    insights.businessInsights = {
      workingStyle: getWorkingStyle(compatibility.destinyCompatibility.score),
      leadershipDynamic: getLeadershipDynamic(compatibility.lifePathCompatibility.score),
      businessSuccess: getBusinessSuccess(compatibility.businessCompatibility),
      recommendedRoles: getRecommendedRoles(compatibility),
    }
  } else if (analysisType === "friendship") {
    insights.friendshipInsights = {
      socialDynamic: getSocialDynamic(compatibility.personalityCompatibility.score),
      sharedInterests: getSharedInterests(compatibility),
      friendshipLongevity: getFriendshipLongevity(compatibility.friendshipCompatibility),
      activitySuggestions: generateActivitySuggestions(compatibility),
    }
  }

  return insights
}

function getIntimacyLevel(score: number): string {
  if (score >= 80) return "Kết nối tâm linh sâu sắc và thấu hiểu lẫn nhau"
  if (score >= 65) return "Có sự gắn kết tốt và hiểu biết cảm xúc"
  if (score >= 50) return "Cần thời gian để xây dựng sự tin tưởng và gần gụi"
  return "Cần nỗ lực nhiều để tạo kết nối sâu sắc"
}

function getCommunicationInLove(score: number): string {
  if (score >= 80) return "Giao tiếp tình cảm tự nhiên và hài hòa"
  if (score >= 65) return "Có thể giao tiếp tốt với một chút nỗ lực"
  if (score >= 50) return "Cần học cách thể hiện tình cảm phù hợp với nhau"
  return "Cần cải thiện đáng kể cách giao tiếp trong tình yêu"
}

function getLongTermRomance(score: number): string {
  if (score >= 80) return "Tiềm năng tình yêu lâu dài rất cao, có thể kết hôn hạnh phúc"
  if (score >= 65) return "Có thể xây dựng mối quan hệ lâu dài với sự cam kết"
  if (score >= 50) return "Cần nỗ lực và thỏa hiệp để duy trì tình yêu lâu dài"
  return "Thách thức lớn trong việc duy trì mối quan hệ lâu dài"
}

function generateDateIdeas(compatibility: any): string[] {
  const ideas = []

  if (compatibility.soulUrgeCompatibility.score >= 75) {
    ideas.push("Hoạt động tâm linh như thiền định, yoga cùng nhau")
  }

  if (compatibility.personalityCompatibility.score >= 75) {
    ideas.push("Tham gia các hoạt động xã hội, gặp gỡ bạn bè")
  }

  if (compatibility.destinyCompatibility.score >= 75) {
    ideas.push("Lập kế hoạch tương lai, thảo luận về mục tiêu chung")
  }

  ideas.push("Dành thời gian riêng tư để hiểu nhau sâu hơn")

  return ideas
}

function getWorkingStyle(score: number): string {
  if (score >= 80) return "Phong cách làm việc rất tương thích, bổ sung hoàn hảo"
  if (score >= 65) return "Có thể làm việc hiệu quả với sự điều chỉnh nhỏ"
  if (score >= 50) return "Cần thỏa thuận rõ ràng về cách làm việc"
  return "Phong cách làm việc khác biệt đáng kể, cần sự thích ứng"
}

function getLeadershipDynamic(score: number): string {
  if (score >= 80) return "Có thể chia sẻ vai trò lãnh đạo một cách tự nhiên"
  if (score >= 65) return "Cần thỏa thuận về vai trò và trách nhiệm"
  if (score >= 50) return "Có thể xung đột về quyền lãnh đạo"
  return "Cần cấu trúc rõ ràng để tránh xung đột quyền lực"
}

function getBusinessSuccess(score: number): string {
  if (score >= 80) return "Tiềm năng thành công kinh doanh rất cao"
  if (score >= 65) return "Có thể thành công với kế hoạch rõ ràng"
  if (score >= 50) return "Cần nỗ lực và thỏa hiệp để thành công"
  return "Thách thức lớn trong hợp tác kinh doanh"
}

function getRecommendedRoles(compatibility: any): string[] {
  const roles = []

  if (compatibility.lifePathCompatibility.score >= 75) {
    roles.push("Đối tác kinh doanh bình đẳng")
  }

  if (compatibility.destinyCompatibility.score >= 75) {
    roles.push("Cộng tác viên trong cùng lĩnh vực")
  }

  if (compatibility.personalityCompatibility.score >= 75) {
    roles.push("Đội ngũ bán hàng hoặc dịch vụ khách hàng")
  }

  roles.push("Tư vấn và hỗ trợ lẫn nhau")

  return roles
}

function getSocialDynamic(score: number): string {
  if (score >= 80) return "Rất hợp nhau trong các hoạt động xã hội"
  if (score >= 65) return "Có thể tham gia các hoạt động chung một cách thoải mái"
  if (score >= 50) return "Cần tìm hoạt động phù hợp với cả hai"
  return "Có thể có sự khác biệt trong sở thích xã hội"
}

function getSharedInterests(compatibility: any): string[] {
  const interests = []

  if (compatibility.soulUrgeCompatibility.score >= 75) {
    interests.push("Phát triển bản thân và tâm linh")
  }

  if (compatibility.destinyCompatibility.score >= 75) {
    interests.push("Mục tiêu nghề nghiệp và thành công")
  }

  if (compatibility.personalityCompatibility.score >= 75) {
    interests.push("Hoạt động giải trí và xã hội")
  }

  interests.push("Chia sẻ kinh nghiệm cuộc sống")

  return interests
}

function getFriendshipLongevity(score: number): string {
  if (score >= 80) return "Tình bạn có thể kéo dài suốt đời"
  if (score >= 65) return "Có thể duy trì tình bạn lâu dài"
  if (score >= 50) return "Tình bạn cần được nuôi dưỡng để duy trì"
  return "Có thể là tình bạn ngắn hạn hoặc theo hoàn cảnh"
}

function generateActivitySuggestions(compatibility: any): string[] {
  const activities = []

  if (compatibility.personalityCompatibility.score >= 75) {
    activities.push("Tham gia các sự kiện xã hội cùng nhau")
  }

  if (compatibility.soulUrgeCompatibility.score >= 75) {
    activities.push("Thảo luận sâu về cuộc sống và triết lý")
  }

  if (compatibility.destinyCompatibility.score >= 75) {
    activities.push("Hỗ trợ nhau trong công việc và mục tiêu")
  }

  activities.push("Dành thời gian chất lượng để hiểu nhau hơn")

  return activities
}
