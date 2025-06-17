import { type NextRequest, NextResponse } from "next/server"
import { analyzeWeddingDate, type WeddingDateRequest } from "@/lib/weddingDate"
import { getSession } from "@/lib/session"

export async function GET() {
  return NextResponse.json({
    message: "Wedding Date Analysis API",
    endpoints: {
      "POST /api/wedding-date": "Analyze a wedding date",
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    // Get session to check if user is authenticated
    const session = await getSession(request)

    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.date) {
      return NextResponse.json({ error: "Wedding date is required" }, { status: 400 })
    }

    // Create request object
    const weddingDateRequest: WeddingDateRequest = {
      date: body.date,
      brideDate: body.brideDate,
      groomDate: body.groomDate,
    }

    // Analyze the wedding date
    const analysis = analyzeWeddingDate(weddingDateRequest)

    // Return the analysis
    return NextResponse.json({
      success: true,
      analysis,
      isPremium: !!session.user,
    })
  } catch (error) {
    console.error("Wedding date analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze wedding date" }, { status: 500 })
  }
}
