import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session" // Đảm bảo getSession được thiết lập chính xác
import { type UserSession } from "@/lib/sessionOptions"
import { decryptData, encryptData } from "@/lib/encryption"
import { calculateDestiny, type DestinyResult } from "@/lib/destinyService"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { encrypted } = body

    if (!encrypted) {
      return NextResponse.json(
        { encrypted: encryptData({ success: false, error: "Dữ liệu mã hoá bị thiếu." }) },
        { status: 400 },
      )
    }

    const decrypted = decryptData(encrypted)
    const { birthDate, birthTime, name } = decrypted

    if (!name || !birthDate) {
      return NextResponse.json(
        { encrypted: encryptData({ success: false, error: "Tên và ngày sinh là bắt buộc." }) },
        { status: 400 },
      )
    }

    const session = await getSession()
    const destinyResult: DestinyResult = await calculateDestiny(name, birthDate, birthTime, session as UserSession)

    return NextResponse.json({ encrypted: encryptData(destinyResult) })
  } catch (error) {
    console.error("Lỗi API Bóc Mệnh:", error)
    const errorData = {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi máy chủ nội bộ.",
    }
    return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 500 })
  }
}
