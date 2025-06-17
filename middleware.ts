import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["vi", "en"]
const defaultLocale = "vi"

// Get locale from request
function getLocale(request: NextRequest): string {
  // 1. Check URL pathname
  const pathname = request.nextUrl.pathname
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) {
    return pathname.split("/")[1]
  }

  // 2. Check URL search params
  const langParam = request.nextUrl.searchParams.get("lang")
  if (langParam && locales.includes(langParam)) {
    return langParam
  }

  // 3. Check Accept-Language header
  const acceptLanguage = request.headers.get("Accept-Language")
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim())
      .find((lang) => {
        return locales.some((locale) => lang.toLowerCase().startsWith(locale.toLowerCase()))
      })

    if (preferredLocale) {
      const matchedLocale = locales.find((locale) => preferredLocale.toLowerCase().startsWith(locale.toLowerCase()))
      if (matchedLocale) return matchedLocale
    }
  }

  // 4. Check cookie
  const cookieLocale = request.cookies.get("locale")?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    const url = new URL(`/${locale}${pathname}`, request.url)

    // Copy search params
    request.nextUrl.searchParams.forEach((value, key) => {
      if (key !== "lang") {
        // Remove lang param since we're using path-based routing
        url.searchParams.set(key, value)
      }
    })

    const response = NextResponse.redirect(url)

    // Set locale cookie
    response.cookies.set("locale", locale, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return response
  }

  // Set locale cookie for existing localized paths
  const currentLocale = pathname.split("/")[1]
  if (locales.includes(currentLocale)) {
    const response = NextResponse.next()
    response.cookies.set("locale", currentLocale, {
      maxAge: 365 * 24 * 60 * 60,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
