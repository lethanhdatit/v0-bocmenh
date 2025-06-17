import { type NextRequest, NextResponse } from "next/server"
import { encryptData } from "@/lib/encryption"
import { calculateMovingDates, type MovingDateRequest } from "@/lib/movingDate"

export async function POST(request: NextRequest) {
  try {
    const encryptedData = await request.text()
    const decryptedData = JSON.parse(encryptedData)
    const movingDateRequest: MovingDateRequest = decryptedData

    // Validate input
    if (!movingDateRequest.name || !movingDateRequest.birthDate || !movingDateRequest.gender) {
      return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin bắt buộc" }, { status: 400 })
    }

    // Validate birth date
    const birthDate = new Date(movingDateRequest.birthDate)
    const today = new Date()
    if (birthDate > today) {
      return NextResponse.json({ error: "Ngày sinh không hợp lệ" }, { status: 400 })
    }

    // Calculate moving dates
    const result = calculateMovingDates(movingDateRequest)

    // Encrypt response
    const encryptedResponse = encryptData(JSON.stringify(result))

    return NextResponse.json({ data: encryptedResponse })
  } catch (error) {
    console.error("Moving date calculation error:", error)
    return NextResponse.json({ error: "Có lỗi xảy ra khi tính toán ngày chuyển nhà" }, { status: 500 })
  }
}
