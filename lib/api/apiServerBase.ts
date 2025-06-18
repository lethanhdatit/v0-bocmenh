import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session/session";
import type { UserSession } from "@/lib/session/sessionOptions";
import { encryptData, decryptData } from "@/lib/infra/encryption"; // Assuming this is for encrypting responses

type ApiHandler<T = any> = (
  data: T | undefined,
  request: NextRequest,
  session: UserSession, // Pass full session object
  ...args: any[]
) => Promise<NextResponse>;

export interface WithApiAuthOptions {
  isAuthenRequired: boolean;
  // redirectToAfterAuthen is a client-side concern,
  // server only signals auth is needed.
}

export function withServerBase(
  handler: ApiHandler,
  options: WithApiAuthOptions
) {
  return async (request: NextRequest, ...args: any[]) => {
    const session = await getSession();

    if (options.isAuthenRequired && !session.isLoggedIn) {
      // Signal client that authentication is required
      return NextResponse.json(
        {
          encrypted: encryptData({
            // Encrypt error response as per project requirements
            success: false,
            error: "Authentication required.",
            errorCode: "AUTH_REQUIRED",
          }),
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { encrypted } = body;
    if (!encrypted) {
      return handler(undefined, request, session, ...args);
    }

    const data = decryptData(encrypted);

    // Pass the potentially updated session to the original handler
    return handler(data, request, session, ...args);
  };
}

export function baseResponse({
  status,
  data,
  message,
  errors,
}: {
  status: number;
  data?: any;
  message?: string;
  errors?: any;
}) {
  return NextResponse.json(
    {
      encrypted: encryptData({
        success: status === 200,
        message,
        errors,
        data,
      }),
    },
    { status }
  );
}
