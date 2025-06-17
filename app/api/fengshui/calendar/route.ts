import { type NextRequest, NextResponse } from "next/server"
import { analyzeFengShuiCalendar } from "@/lib/fengShuiCalendar"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventType, birthYear, gender, month, year } = body

    // Validation
    if (!eventType || !birthYear || !gender || !month || !year) {
      return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin" }, { status: 400 })
    }

    if (birthYear < 1900 || birthYear > 2100) {
      return NextResponse.json({ error: "Năm sinh phải từ 1900 đến 2100" }, { status: 400 })
    }

    if (month < 1 || month > 12) {
      return NextResponse.json({ error: "Tháng phải từ 1 đến 12" }, { status: 400 })
    }

    if (year < 2020 || year > 2030) {
      return NextResponse.json({ error: "Năm phân tích phải từ 2020 đến 2030" }, { status: 400 })
    }

    // Perform analysis
    const analysis = analyzeFengShuiCalendar(eventType, birthYear, gender, month, year)

    return NextResponse.json({
      success: true,
      data: analysis,
    })
  } catch (error) {
    console.error("Feng Shui Calendar API Error:", error)
    return NextResponse.json({ error: "Có lỗi xảy ra khi phân tích lịch phong thủy" }, { status: 500 })
  }
}
