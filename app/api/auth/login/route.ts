import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { decryptData, encryptData } from "@/lib/encryption"

// Simple user database simulation (should match register route)
const users: Array<{
  id: string
  email: string
  password: string
  name: string
  createdAt: string
  isPremium: boolean
}> = [
  {
    id: "demo-user-1",
    email: "demo@bocmenh.com",
    password: Buffer.from("123456").toString("base64"),
    name: "Người Dùng Demo",
    createdAt: new Date().toISOString(),
    isPremium: false,
  },
  {
    id: "premium-user-1",
    email: "premium@bocmenh.com",
    password: Buffer.from("123456").toString("base64"),
    name: "Thành Viên Premium",
    createdAt: new Date().toISOString(),
    isPremium: true,
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { encrypted } = body

    // Decrypt the request data
    const { email, password, rememberMe } = decryptData(encrypted)

    // Validation
    const errors: Record<string, string> = {}

    if (!email || !isValidEmail(email)) {
      errors.email = "Email không hợp lệ"
    }

    if (!password || password.length < 1) {
      errors.password = "Vui lòng nhập mật khẩu"
    }

    if (Object.keys(errors).length > 0) {
      const errorData = {
        success: false,
        errors,
        message: "Vui lòng kiểm tra lại thông tin đăng nhập",
      }
      return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 400 })
    }

    // Find user
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === hashPassword(password),
    )

    if (!user) {
      const errorData = {
        success: false,
        errors: {
          general: "Email hoặc mật khẩu không đúng",
        },
        message: "Đăng nhập thất bại",
      }
      return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 401 })
    }

    // Create session
    const session = await getSession()
    session.id = user.id
    session.email = user.email
    session.name = user.name
    session.isLoggedIn = true
    session.isPremium = user.isPremium

    await session.save()

    const responseData = {
      success: true,
      message: "Đăng nhập thành công!",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
      },
    }

    return NextResponse.json({ encrypted: encryptData(responseData) })
  } catch (error) {
    const errorData = {
      success: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau",
    }

    return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 500 })
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function hashPassword(password: string): string {
  return Buffer.from(password).toString("base64")
}
