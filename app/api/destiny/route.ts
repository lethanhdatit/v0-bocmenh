import { type NextRequest, NextResponse } from "next/server"
import type { UserSession } from "@/lib/session/sessionOptions"
import { decryptData, encryptData } from "@/lib/infra/encryption"
import { calculateDestiny, type DestinyResult } from "@/lib/destinyService"
import { withServerBase } from "@/lib/api/apiServerBase"

// Original handler logic
async function destinyApiHandler(data: any, request: NextRequest, session: UserSession) {
  try {
    const { birthDate, birthTime, name } = data

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
export const POST = withServerBase(destinyApiHandler, {
  isAuthenRequired: true, // Set to true to test authentication
})
