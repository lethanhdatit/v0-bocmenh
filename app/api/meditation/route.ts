import { type NextRequest, NextResponse } from "next/server"
import { meditationGuides, getRecommendedMeditations } from "@/lib/meditation"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const difficulty = searchParams.get("difficulty")
    const minDuration = searchParams.get("minDuration")
    const maxDuration = searchParams.get("maxDuration")

    let filteredGuides = meditationGuides

    if (type) {
      filteredGuides = filteredGuides.filter((guide) => guide.type === type)
    }

    if (difficulty) {
      filteredGuides = filteredGuides.filter((guide) => guide.difficulty === difficulty)
    }

    if (minDuration && maxDuration) {
      const min = Number.parseInt(minDuration)
      const max = Number.parseInt(maxDuration)
      filteredGuides = filteredGuides.filter((guide) => guide.duration >= min && guide.duration <= max)
    }

    return NextResponse.json({
      success: true,
      data: filteredGuides,
    })
  } catch (error) {
    console.error("Error fetching meditation guides:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch meditation guides" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { experience, availableTime, goals } = body

    if (!experience || !availableTime || !goals) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const recommendations = getRecommendedMeditations(experience, Number.parseInt(availableTime), goals)

    const analysis = {
      totalGuides: recommendations.length,
      averageDuration: Math.round(
        recommendations.reduce((sum, guide) => sum + guide.duration, 0) / recommendations.length,
      ),
      recommendedTypes: [...new Set(recommendations.map((guide) => guide.type))],
      personalizedMessage: generatePersonalizedMessage(experience, availableTime, goals),
      personalizedMessageVi: generatePersonalizedMessageVi(experience, availableTime, goals),
    }

    return NextResponse.json({
      success: true,
      data: {
        recommendations,
        analysis,
      },
    })
  } catch (error) {
    console.error("Error generating meditation recommendations:", error)
    return NextResponse.json({ success: false, error: "Failed to generate recommendations" }, { status: 500 })
  }
}

function generatePersonalizedMessage(experience: string, availableTime: string, goals: string[]): string {
  const timeNum = Number.parseInt(availableTime)
  let message = `Based on your ${experience} level and ${timeNum} minutes available, `

  if (goals.includes("stress-relief")) {
    message += "I recommend starting with breathing or body scan meditations to help reduce stress. "
  }
  if (goals.includes("focus")) {
    message += "Mindfulness meditation will help improve your concentration and mental clarity. "
  }
  if (goals.includes("emotional-healing")) {
    message += "Loving-kindness meditation can support your emotional healing journey. "
  }
  if (goals.includes("spiritual-growth")) {
    message += "Chakra balancing and visualization practices will enhance your spiritual development. "
  }

  message += "Remember, consistency is more important than duration. Start small and build your practice gradually."

  return message
}

function generatePersonalizedMessageVi(experience: string, availableTime: string, goals: string[]): string {
  const timeNum = Number.parseInt(availableTime)
  let message = `Dựa trên trình độ ${experience === "beginner" ? "mới bắt đầu" : experience === "intermediate" ? "trung cấp" : "nâng cao"} và ${timeNum} phút có sẵn, `

  if (goals.includes("stress-relief")) {
    message += "tôi khuyên bạn nên bắt đầu với thiền hơi thở hoặc quét cơ thể để giúp giảm căng thẳng. "
  }
  if (goals.includes("focus")) {
    message += "Thiền chánh niệm sẽ giúp cải thiện sự tập trung và sự rõ ràng tinh thần. "
  }
  if (goals.includes("emotional-healing")) {
    message += "Thiền từ bi có thể hỗ trợ hành trình chữa lành cảm xúc của bạn. "
  }
  if (goals.includes("spiritual-growth")) {
    message += "Thực hành cân bằng chakra và hình dung sẽ tăng cường sự phát triển tâm linh. "
  }

  message += "Hãy nhớ, tính nhất quán quan trọng hơn thời lượng. Bắt đầu từ nhỏ và xây dựng thực hành của bạn từ từ."

  return message
}
