import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import type { UserSession } from "@/lib/sessionOptions"
import { encryptData } from "@/lib/encryption" // Assuming this is for encrypting responses

type ApiHandler = (
  request: NextRequest,
  session: UserSession, // Pass full session object
  ...args: any[]
) => Promise<NextResponse>

export interface WithApiAuthOptions {
  isAuthenRequired: boolean
  // redirectToAfterAuthen is a client-side concern,
  // server only signals auth is needed.
}

export function withApiAuth(handler: ApiHandler, options: WithApiAuthOptions) {
  return async (request: NextRequest, ...args: any[]) => {
    const session = await getSession()

    if (options.isAuthenRequired && !session.isLoggedIn) {
      // Signal client that authentication is required
      return NextResponse.json(
        encryptData({
          // Encrypt error response as per project requirements
          success: false,
          error: "Authentication required.",
          errorCode: "AUTH_REQUIRED",
        }),
        { status: 401 },
      )
    }
    // Pass the potentially updated session to the original handler
    return handler(request, session, ...args)
  }
}
