import { type NextRequest, NextResponse } from "next/server";
import type { UserSession } from "@/lib/session/sessionOptions";
import { encryptData } from "@/lib/infra/encryption";
import { calculateDestiny, type DestinyResult } from "@/lib/destinyService";
import {
  withServerBase,
  baseResponse,
  handleApiServerError,
} from "@/lib/api/apiServerBase";
import { IronSession } from "iron-session";
import { apiServer, getConfig } from "@/lib/api/apiServer";
import { getTranslations } from "@/i18n/server";

// Original handler logic
async function destinyApiHandler(
  data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common", "destiny"]);

  try {
    const { birthDate, birthTime, name } = data;

    if (!name || !birthDate) {
      return NextResponse.json(
        {
          encrypted: encryptData({
            success: false,
            error: "Tên và ngày sinh là bắt buộc.",
          }),
        },
        { status: 400 }
      );
    }

    const config = await getConfig(request, session?.accessToken);

    const response = await apiServer.post(
      "/bocmenh/theology",
      { firstName: "", middleName: "" },
      config
    );

    // const desResult = response.data.data;

    // Session is now passed by the wrapper
    const destinyResult: DestinyResult = await calculateDestiny(
      name,
      birthDate,
      birthTime,
      session
    );

    return baseResponse({
      status: 200,
      message: "ok",
      data: destinyResult,
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("auth.destiny.error.theologyFailed"),
        errorCommonMessage: t("auth.destiny.systemFailed"),
      },
      session
    );
  }
}

// Wrap the handler with authentication options
export const POST = withServerBase(destinyApiHandler, {
  isAuthenRequired: true, // Set to true to test authentication
});
