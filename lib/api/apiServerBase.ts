import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session/session";
import type { UserSession } from "@/lib/session/sessionOptions";
import { encryptData, decryptData } from "@/lib/infra/encryption"; // Assuming this is for encrypting responses
import { IronSession } from "iron-session";
import { type ApiBaseResponse } from "@/lib/api/apiClient";

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

    let data = undefined;
    let body: any = undefined;

    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      try {
        body = await request.json();
        const { encrypted } = body || {};
        if (encrypted) {
          data = decryptData(encrypted);
        }
      } catch {
        data = undefined;
      }
    }

    if (options.isAuthenRequired && !session.isLoggedIn) {
      return NextResponse.json(
        {
          encrypted: encryptData({
            success: false,
            error: "Authentication required.",
            errorCode: "AUTH_REQUIRED_RETRY",
            forwardData: data,
          } as ApiBaseResponse),
        },
        { status: 401 }
      );
    }

    return handler(data, request, session, ...args);
  };
}

export function baseResponse({
  status,
  data,
  message,
  errors,
  beErrorCode,
  beErrorMetaData,
  beErrorMessage,
}: {
  status: number;
  data?: any;
  message?: string;
  errors?: any;
  beErrorCode?: string;
  beErrorMetaData?: any;
  beErrorMessage?: string;
}) {
  if (status == 401) {
    return NextResponse.json(
      {
        encrypted: encryptData({
          success: false,
          message: message ?? "Authentication required.",
          errorCode: "AUTH_REQUIRED_RETRY",
          beErrorCode,
          beErrorMetaData,
          beErrorMessage,
          errors,
          data,
          forwardData: data,
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
        beErrorCode,
        beErrorMetaData,
        beErrorMessage,
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
  session?: IronSession<UserSession> | null | undefined,
  data?: any | null | undefined
) {
  const status = error?.status ?? 500;
  const beError =
    error?.data &&
    typeof error.data === "object" &&
    Array.isArray(error.data.data) &&
    error.data.data[0];
  let errRes = {
    status,
    message:
      status === 400 ? options.error400Message : options.errorCommonMessage,
    errors: {
      general:
        status === 400 ? options.error400Message : options.errorCommonMessage,
    },
    data,
    beErrorCode: beError?.code || undefined,
    beErrorMetaData: beError?.metaData || undefined,
    beErrorMessage: beError?.description || undefined,
  };

  if (status === 401) {
    session ??= await getSession();
    session.destroy();
  }

  return baseResponse(errRes);
}
