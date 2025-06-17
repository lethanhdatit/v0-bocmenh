import { type NextRequest, NextResponse } from "next/server"
import { analyzeBusinessName } from "@/lib/businessNameAnalysis"

export async function POST(request: NextRequest) {
  try {
    const { businessName, businessType, ownerBirthDate } = await request.json()

    if (!businessName || !businessType) {
      return NextResponse.json({ error: "Business name and type are required" }, { status: 400 })
    }

    const analysis = analyzeBusinessName(businessName, businessType, ownerBirthDate)

    return NextResponse.json({
      success: true,
      data: analysis,
    })
  } catch (error) {
    console.error("Business name analysis error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Business Name Analysis API",
    endpoints: {
      POST: "/api/business-name - Analyze business name",
    },
  })
}
