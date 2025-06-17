import { type NextRequest, NextResponse } from "next/server"
import { analyzeHouseDirection } from "@/lib/houseDirection"
import { calculateKuaNumber } from "@/lib/numerology"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { birthYear, gender, houseDirection } = body

    // Validation
    if (!birthYear || !gender || !houseDirection) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp đầy đủ thông tin: năm sinh, giới tính và hướng nhà" },
        { status: 400 },
      )
    }

    if (birthYear < 1900 || birthYear > 2100) {
      return NextResponse.json({ error: "Năm sinh phải từ 1900 đến 2100" }, { status: 400 })
    }

    if (!["male", "female"].includes(gender)) {
      return NextResponse.json({ error: "Giới tính phải là nam hoặc nữ" }, { status: 400 })
    }

    const validDirections = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"]
    if (!validDirections.includes(houseDirection)) {
      return NextResponse.json({ error: "Hướng nhà không hợp lệ" }, { status: 400 })
    }

    // Calculate Kua number
    const kuaNumber = calculateKuaNumber(birthYear, gender)

    // Analyze house direction compatibility
    const result = analyzeHouseDirection(kuaNumber, houseDirection)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("House direction analysis error:", error)
    return NextResponse.json({ error: "Có lỗi xảy ra khi phân tích hướng nhà" }, { status: 500 })
  }
}
