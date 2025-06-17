import { type NextRequest, NextResponse } from "next/server"
import { analyzeHand } from "@/lib/palmistry"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { hand, gender, age } = body

    // Validation
    if (!hand || !gender || !age) {
      return NextResponse.json({ error: "Vui lòng cung cấp đầy đủ thông tin: tay, giới tính và tuổi" }, { status: 400 })
    }

    if (!["left", "right"].includes(hand)) {
      return NextResponse.json({ error: 'Tay phải là "left" hoặc "right"' }, { status: 400 })
    }

    if (!["male", "female"].includes(gender)) {
      return NextResponse.json({ error: 'Giới tính phải là "male" hoặc "female"' }, { status: 400 })
    }

    if (age < 1 || age > 120) {
      return NextResponse.json({ error: "Tuổi phải từ 1 đến 120" }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Analyze palm
    const analysis = analyzeHand(hand, gender, age)

    return NextResponse.json({
      success: true,
      data: analysis,
    })
  } catch (error) {
    console.error("Palmistry API error:", error)
    return NextResponse.json({ error: "Đã xảy ra lỗi khi phân tích tướng bàn tay" }, { status: 500 })
  }
}
