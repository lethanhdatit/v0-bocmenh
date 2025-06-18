import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session/session"
import { encryptData } from "@/lib/infra/encryption"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session.isLoggedIn) {
      const errorData = {
        success: false,
        message: "Chưa đăng nhập",
      }
      return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 401 })
    }

    const responseData = {
      success: true,
      user: {
        id: session.id,
        email: session.email,
        name: session.name,
        isPremium: session.isPremium,
        isLoggedIn: session.isLoggedIn,
      },
    }

    return NextResponse.json({ encrypted: encryptData(responseData) })
  } catch (error) {
    const errorData = {
      success: false,
      message: "Lỗi hệ thống",
    }

    return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 500 })
  }
}
