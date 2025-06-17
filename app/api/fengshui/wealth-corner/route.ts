import { type NextRequest, NextResponse } from "next/server"
import { analyzeWealthCorner } from "@/lib/wealthCorner"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { birthYear, gender, houseDirection, roomType } = body

    // Validation
    if (!birthYear || !gender || !houseDirection || !roomType) {
      return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin" }, { status: 400 })
    }

    if (birthYear < 1900 || birthYear > 2100) {
      return NextResponse.json({ error: "Năm sinh phải từ 1900 đến 2100" }, { status: 400 })
    }

    if (!["male", "female"].includes(gender)) {
      return NextResponse.json({ error: "Giới tính không hợp lệ" }, { status: 400 })
    }

    const validDirections = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"]
    if (!validDirections.includes(houseDirection)) {
      return NextResponse.json({ error: "Hướng nhà không hợp lệ" }, { status: 400 })
    }

    const validRoomTypes = ["living-room", "bedroom", "office", "kitchen", "entrance"]
    if (!validRoomTypes.includes(roomType)) {
      return NextResponse.json({ error: "Loại phòng không hợp lệ" }, { status: 400 })
    }

    // Perform analysis
    const analysis = analyzeWealthCorner(birthYear, gender, houseDirection, roomType)

    return NextResponse.json({
      success: true,
      data: analysis,
    })
  } catch (error) {
    console.error("Wealth corner analysis error:", error)
    return NextResponse.json({ error: "Có lỗi xảy ra khi phân tích góc tài lộc" }, { status: 500 })
  }
}
