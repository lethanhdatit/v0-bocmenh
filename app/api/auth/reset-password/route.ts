import { type NextRequest, NextResponse } from "next/server"
import { decryptData, encryptData } from "@/lib/infra/encryption"
import { validateResetToken, markTokenAsUsed, revokeUserTokens } from "@/lib/passwordReset"
import { getSession } from "@/lib/session/session"

// Mock user database (should match other auth routes)
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
    email: "demo@insight.ai.vn",
    password: Buffer.from("123456").toString("base64"),
    name: "Người Dùng Demo",
    createdAt: new Date().toISOString(),
    isPremium: false,
  },
  {
    id: "premium-user-1",
    email: "premium@insight.ai.vn",
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
    const { token, password, confirmPassword } = decryptData(encrypted)

    // Validation
    const errors: Record<string, string> = {}

    if (!token) {
      errors.token = "Token không hợp lệ"
    }

    if (!password || password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp"
    }

    if (Object.keys(errors).length > 0) {
      const errorData = {
        success: false,
        errors,
        message: "Vui lòng kiểm tra lại thông tin",
      }
      return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 400 })
    }

    // Validate reset token
    const tokenValidation = validateResetToken(token)
    if (!tokenValidation.isValid) {
      const errorData = {
        success: false,
        errors: { token: tokenValidation.error },
        message: "Token không hợp lệ hoặc đã hết hạn",
      }
      return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 400 })
    }

    const tokenData = tokenValidation.tokenData!

    // Find user
    const userIndex = users.findIndex((u) => u.id === tokenData.userId)
    if (userIndex === -1) {
      const errorData = {
        success: false,
        errors: { token: "Người dùng không tồn tại" },
        message: "Token không hợp lệ",
      }
      return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 400 })
    }

    // Update user password
    users[userIndex].password = hashPassword(password)

    // Mark token as used
    markTokenAsUsed(token)

    // Revoke all other reset tokens for this user
    revokeUserTokens(tokenData.userId)

    // Auto-login user after password reset
    const user = users[userIndex]
    const session = await getSession()
    session.id = user.id
    session.email = user.email
    session.name = user.name
    session.isLoggedIn = true
    session.isPremium = user.isPremium

    await session.save()

    const responseData = {
      success: true,
      message: "Mật khẩu đã được đặt lại thành công! Bạn đã được đăng nhập tự động.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
      },
    }

    return NextResponse.json({ encrypted: encryptData(responseData) })
  } catch (error) {
    console.error("Reset password error:", error)
    const errorData = {
      success: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau",
    }

    return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 500 })
  }
}

function hashPassword(password: string): string {
  return Buffer.from(password).toString("base64")
}
