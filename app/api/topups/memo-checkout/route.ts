import { type NextRequest } from "next/server";
import type { UserSession } from "@/lib/session/sessionOptions";
import {
  withServerBase,
  baseResponse,
  handleApiServerError,
} from "@/lib/api/apiServerBase";
import { IronSession } from "iron-session";
import { apiServer, getConfig } from "@/lib/api/apiServer";
import { getTranslations } from "@/i18n/server";

async function getMemoCheckoutHandler(
  _data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common", "topups"]);

  const { searchParams } = new URL(request.url);
  const topupPackageId = searchParams.get("topupPackageId");
  const provider = searchParams.get("provider");

  try {
    const config = await getConfig(request, session?.accessToken);

    const response = await apiServer.get(
      `/transaction/topups/memoCheckout?topupPackageId=${topupPackageId}&provider=${provider}`,
      {
        ...config,
      }
    );

    const result = response.data.data;

    return baseResponse({
      status: 200,
      message: "ok",
      data: result,
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("topups.error.getMemoCheckoutFailed"),
        errorCommonMessage: t("topups.systemFailed"),
      },
      session,
      _data
    );
  }
}

export const GET = withServerBase(getMemoCheckoutHandler, {
  isAuthenRequired: false,
});
