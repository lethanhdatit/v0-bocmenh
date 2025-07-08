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

async function buyTopupHandler(
  data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
   const { t } = await getTranslations(["common", "topups"]);

  try {
    const { packageId, paymentGateId, callbackUrl } = data;

    // Validation
    const errors: Record<string, string> = {};

    if (!packageId || !paymentGateId) {
      errors.birthTime = t("topups.error.invalidInput");
    }

    if (Object.keys(errors).length > 0) {
      return baseResponse({
        status: 400,
        message: t("topups.error.invalidInput"),
        errors,
      });
    }

    const config = await getConfig(request, session?.accessToken);    

    const response = await apiServer.post(
      "/transaction/topups",
      {
        topupPackageId: packageId,
        provider: paymentGateId,
        callbackUrl: callbackUrl
      },
      config
    );

    return baseResponse({
      status: 200,
      message: "ok",
      data: {
        ipnLink: response.data.data.ipnUrl
      },
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("topups.error.theologyFailed"),
        errorCommonMessage: t("topups.systemFailed"),
      },
      session,
      data
    );
  }
}

export const POST = withServerBase(buyTopupHandler, {
  isAuthenRequired: true,
});