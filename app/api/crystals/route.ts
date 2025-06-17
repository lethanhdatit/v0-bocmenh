import { type NextRequest, NextResponse } from "next/server"
import { getCrystalRecommendations, crystalsDatabase } from "@/lib/crystals"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const intention = searchParams.get("intention") || ""
    const chakra = searchParams.get("chakra") || ""
    const zodiacSign = searchParams.get("zodiacSign") || ""

    if (intention || chakra || zodiacSign) {
      const recommendations = getCrystalRecommendations(intention, chakra, zodiacSign)
      return NextResponse.json({
        success: true,
        crystals: recommendations,
        message: "Crystal recommendations generated successfully",
      })
    } else {
      // Return all crystals if no filters
      return NextResponse.json({
        success: true,
        crystals: crystalsDatabase,
        message: "All crystals retrieved successfully",
      })
    }
  } catch (error) {
    console.error("Crystal API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get crystal recommendations",
        crystals: [],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { intention, chakra, zodiacSign } = body

    const recommendations = getCrystalRecommendations(intention, chakra, zodiacSign)

    return NextResponse.json({
      success: true,
      crystals: recommendations,
      message: "Personalized crystal recommendations generated",
      analysis: {
        intention: intention || "General wellness",
        chakra: chakra || "All chakras",
        zodiacSign: zodiacSign || "Universal",
        recommendationCount: recommendations.length,
      },
    })
  } catch (error) {
    console.error("Crystal recommendation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate crystal recommendations",
        crystals: [],
      },
      { status: 500 },
    )
  }
}
