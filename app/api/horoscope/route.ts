import { type NextRequest, NextResponse } from "next/server"
import { generateHoroscope } from "@/lib/horoscope"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { birthDate, type } = body

    // Validate inputs
    if (!birthDate) {
      return NextResponse.json({ error: "Vui lòng nhập ngày sinh của bạn" }, { status: 400 })
    }

    if (!type || !["daily", "weekly", "monthly"].includes(type)) {
      return NextResponse.json({ error: "Loại dự báo không hợp lệ" }, { status: 400 })
    }

    // Parse birth date
    const parsedBirthDate = new Date(birthDate)
    if (isNaN(parsedBirthDate.getTime())) {
      return NextResponse.json({ error: "Ngày sinh không hợp lệ" }, { status: 400 })
    }

    // Generate horoscope
    const horoscope = generateHoroscope(parsedBirthDate, type)

    return NextResponse.json({ success: true, data: horoscope })
  } catch (error) {
    console.error("Error generating horoscope:", error)
    return NextResponse.json({ error: "Đã xảy ra lỗi khi tạo dự báo bát tự" }, { status: 500 })
  }
}
