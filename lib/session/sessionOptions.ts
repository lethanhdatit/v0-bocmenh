import type { SessionOptions } from "iron-session"
import type { SupportedLanguageCode } from "@/lib/i18n/language-config"

export interface UserSession {
  id?: string
  email?: string
  name?: string
  accessToken?: string
  isPremium?: boolean
  isLoggedIn?: boolean
  avatar?: string
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD!,
  cookieName: "boc-menh-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
}
