import { type NextRequest, NextResponse } from "next/server"
import { calculateBirthChart, generateAstrologyReading } from "@/lib/astrology"

export async function POST(request: NextRequest) {
  try {
    const { name, birthDate, birthTime, birthPlace } = await request.json()

    if (!name || !birthDate || !birthTime || !birthPlace) {
      return NextResponse.json({ error: "Vui lòng cung cấp đầy đủ thông tin" }, { status: 400 })
    }

    const birth = new Date(birthDate)
    const birthChart = calculateBirthChart(birth, birthTime, birthPlace)
    const reading = generateAstrologyReading(birthChart, name)

    return NextResponse.json({
      success: true,
      data: reading,
    })
  } catch (error) {
    console.error("Astrology API error:", error)
    return NextResponse.json({ error: "Có lỗi xảy ra khi phân tích biểu đồ sao" }, { status: 500 })
  }
}
