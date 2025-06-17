import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { decryptData, encryptData } from "@/lib/encryption"

// Simple user database simulation (replace with real database)
const users: Array<{
  id: string
  email: string
  password: string
  name: string
  createdAt: string
  isPremium: boolean
}> = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { encrypted } = body

    // Decrypt the request data
    const { email, password, name, confirmPassword } = decryptData(encrypted)

    // Validation
    const errors: Record<string, string> = {}

    if (!name || name.trim().length < 2) {
      errors.name = "Họ tên phải có ít nhất 2 ký tự"
    }

    if (!email || !isValidEmail(email)) {
      errors.email = "Email không hợp lệ"
    }

    if (!password || password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp"
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      errors.email = "Email này đã được đăng ký"
    }

    if (Object.keys(errors).length > 0) {
      const errorData = {
        success: false,
        errors,
        message: "Vui lòng kiểm tra lại thông tin",
      }
      return NextResponse.json({ encrypted: encryptData(errorData) }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: generateUserId(),
      email: email.toLowerCase(),
      password: hashPassword(password), // In real app, use bcrypt
      name: name.trim(),
      createdAt: new Date().toISOString(),
      isPremium: false,
    }

    users.push(newUser)

    // Create session
    const session = await getSession()
    session.id = newUser.id
    session.email = newUser.email
    session.name = newUser.name
    session.isLoggedIn = true
    session.isPremium = newUser.isPremium

    await session.save()

    const responseData = {
      success: true,
      message: "Đăng ký thành công!",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isPremium: newUser.isPremium,
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

function generateUserId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

function hashPassword(password: string): string {
  // In a real application, use bcrypt or similar
  return Buffer.from(password).toString("base64")
}
