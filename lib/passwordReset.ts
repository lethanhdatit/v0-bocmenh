import crypto from "crypto"

interface PasswordResetToken {
  token: string
  email: string
  userId: string
  expiresAt: Date
  createdAt: Date
  used: boolean
}

// In-memory storage for demo (use database in production)
const resetTokens: Map<string, PasswordResetToken> = new Map()

export function generateResetToken(email: string, userId: string): string {
  // Generate secure random token
  const token = crypto.randomBytes(32).toString("hex")

  // Set expiration to 15 minutes from now
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

  // Store token
  resetTokens.set(token, {
    token,
    email,
    userId,
    expiresAt,
    createdAt: new Date(),
    used: false,
  })

  // Clean up expired tokens
  cleanupExpiredTokens()

  return token
}

export function validateResetToken(token: string): {
  isValid: boolean
  tokenData?: PasswordResetToken
  error?: string
} {
  const tokenData = resetTokens.get(token)

  if (!tokenData) {
    return { isValid: false, error: "Token không tồn tại hoặc đã hết hạn" }
  }

  if (tokenData.used) {
    return { isValid: false, error: "Token đã được sử dụng" }
  }

  if (new Date() > tokenData.expiresAt) {
    resetTokens.delete(token)
    return { isValid: false, error: "Token đã hết hạn" }
  }

  return { isValid: true, tokenData }
}

export function markTokenAsUsed(token: string): void {
  const tokenData = resetTokens.get(token)
  if (tokenData) {
    tokenData.used = true
    resetTokens.set(token, tokenData)
  }
}

export function cleanupExpiredTokens(): void {
  const now = new Date()
  for (const [token, data] of resetTokens.entries()) {
    if (now > data.expiresAt) {
      resetTokens.delete(token)
    }
  }
}

export function revokeUserTokens(userId: string): void {
  for (const [token, data] of resetTokens.entries()) {
    if (data.userId === userId) {
      resetTokens.delete(token)
    }
  }
}
