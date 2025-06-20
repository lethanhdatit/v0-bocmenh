import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session/session";
import type { UserSession } from "@/lib/session/sessionOptions";
import { encryptData, decryptData } from "@/lib/infra/encryption"; // Assuming this is for encrypting responses
import { IronSession } from "iron-session";
import { type ApiBaseResponse } from "@/lib/api/apiClient" 

type ApiHandler<T = any> = (
  data: T | undefined,
  request: NextRequest,
  session: IronSession<UserSession>, // Pass full session object
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
    const body = await request.json();
    const { encrypted } = body;

    let data = undefined;

    if (encrypted) {
      data = decryptData(encrypted);
    }
    
    if (options.isAuthenRequired && !session.isLoggedIn) {
      // Signal client that authentication is required
      return NextResponse.json(
        {
          encrypted: encryptData({
            // Encrypt error response as per project requirements
            success: false,
            error: "Authentication required.",
            errorCode: "AUTH_REQUIRED_RETRY",
            forwardData: data,
          } as ApiBaseResponse),
        },
        { status: 401 }
      );
    }

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
  if (status == 401) {
    return NextResponse.json(
      {
        encrypted: encryptData({
          success: false,
          message: message ?? "Authentication required.",
          errorCode: "AUTH_REQUIRED_RETRY",
          errors,
          data,
        } as ApiBaseResponse),
      },
      { status }
    );
  }

  return NextResponse.json(
    {
      encrypted: encryptData({
        success: status === 200,
        message,
        errors,
        data,
      } as ApiBaseResponse),
    },
    { status }
  );
}

export async function handleApiServerError(
  error: any,
  options: {
    error400Message: string;
    errorCommonMessage: string;
  },
  session?: IronSession<UserSession> | null | undefined
) {
  const status = error?.status ?? 500;
  let errRes = {
    status,
    message:
      status === 400 ? options.error400Message : options.errorCommonMessage,
    errors: {
      general:
        status === 400 ? options.error400Message : options.errorCommonMessage,
    },
  };

  if (status === 401) {
    session ??= await getSession();
    session.destroy();
  }

  return baseResponse(errRes);
}
