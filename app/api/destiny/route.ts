import { type NextRequest, NextResponse } from "next/server"
import type { UserSession } from "@/lib/sessionOptions"
import { decryptData, encryptData } from "@/lib/encryption"
import { calculateDestiny, type DestinyResult } from "@/lib/destinyService"
import { withApiAuth } from "@/lib/apiAuthWrapper"

// Original handler logic
async function destinyApiHandler(request: NextRequest, session: UserSession) {
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

    // Session is now passed by the wrapper
    const destinyResult: DestinyResult = await calculateDestiny(name, birthDate, birthTime, session)

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

// Wrap the handler with authentication options
export const POST = withApiAuth(destinyApiHandler, {
  isAuthenRequired: true, // Set to true to test authentication
})
