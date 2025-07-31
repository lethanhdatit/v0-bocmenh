import { type NextRequest } from "next/server";
import {
  withServerBase,
  baseResponse,
  handleApiServerError,
} from "@/lib/api/apiServerBase";
import { apiServer, getConfig } from "@/lib/api/apiServer";
import type { UserSession } from "@/lib/session/sessionOptions";
import { getTranslations } from "@/i18n/server";
import { IronSession } from "iron-session";
import { isValidEmail } from "@/lib/infra/validators";

async function sendEmailVerificationHandler(
  data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common"]);

  try {
    const { email } = data;

    // Validation
    const errors: Record<string, string> = {};

    if (!email || !isValidEmail(email)) {
      errors.email = t("auth.emailVerification.invalidEmail");
    }

    if (Object.keys(errors).length > 0) {
      return baseResponse({
        status: 400,
        message: t("auth.emailVerification.invalidData"),
        errors,
      });
    }

    const config = await getConfig(request, session?.accessToken);

    const response = await apiServer.post(
      "/account/password/recovery/email/verification",
      { email, module: "BocMenh" },
      config
    );

    return baseResponse({
      status: 200,
      message: t("auth.emailVerification.success"),
      data: response.data.data,
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("auth.emailVerification.failed"),
        errorCommonMessage: t("auth.systemFailed"),
      },
      session,
      data
    );
  }
}

export const POST = withServerBase(sendEmailVerificationHandler, {
  isAuthenRequired: false,
});
