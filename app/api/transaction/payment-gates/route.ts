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

async function getPaymentGatesHandler(
  _data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common", "checkout"]);

  try {    
    const config = await getConfig(request, session?.accessToken);

    const response = await apiServer.get(`/transaction/paymentGates`, {
      ...config,
    });

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
        error400Message: t("checkout.getPaymentGatesFailed"),
        errorCommonMessage: t("checkout.systemFailed"),
      },
      session,
      _data
    );
  }
}

export const GET = withServerBase(getPaymentGatesHandler, {
  isAuthenRequired: false,
});
