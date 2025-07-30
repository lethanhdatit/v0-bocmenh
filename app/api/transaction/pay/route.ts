import { type NextRequest, NextResponse } from "next/server";
import type { UserSession } from "@/lib/session/sessionOptions";
import {
  withServerBase,
  baseResponse,
  handleApiServerError,
} from "@/lib/api/apiServerBase";
import { IronSession } from "iron-session";
import { apiServer, getConfig } from "@/lib/api/apiServer";
import { getTranslations } from "@/i18n/server";

// POST handler
async function payTheologyApiHandler(
  data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
 const { t } = await getTranslations(["common"]);

  try {
    const { id } = data;

    const config = await getConfig(request, session?.accessToken);

    const response = await apiServer.post(
      `/transaction/theology/${id}/pay`,
      null,
      config
    );

    const desResult = response.data.data;

    return baseResponse({
      status: 200,
      message: "ok",
      data: desResult,
    });
  } catch (error : any | unknown) {
    return handleApiServerError(
      error,
      {
        error400Message: t("destiny.error.payTopupFailed"),
        errorCommonMessage: t("destiny.systemFailed"),
      },
      session,
      data
    );
  }
}

export const POST = withServerBase(payTheologyApiHandler, {
  isAuthenRequired: true,
});
