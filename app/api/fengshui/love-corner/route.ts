import { type NextRequest, NextResponse } from "next/server"
import { analyzeLoveCorner } from "@/lib/loveCorner"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { birthYear, gender, houseDirection, relationshipStatus } = body

    // Validation
    if (!birthYear || !gender || !houseDirection || !relationshipStatus) {
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

    const validStatuses = ["single", "dating", "married", "complicated"]
    if (!validStatuses.includes(relationshipStatus)) {
      return NextResponse.json({ error: "Tình trạng mối quan hệ không hợp lệ" }, { status: 400 })
    }

    // Perform analysis
    const analysis = analyzeLoveCorner(birthYear, gender, houseDirection, relationshipStatus)

    return NextResponse.json({
      success: true,
      data: analysis,
    })
  } catch (error) {
    console.error("Love corner analysis error:", error)
    return NextResponse.json({ error: "Có lỗi xảy ra khi phân tích góc tình yêu" }, { status: 500 })
  }
}
