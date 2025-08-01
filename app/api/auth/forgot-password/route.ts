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

async function resetPasswordHandler(
  data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common"]);

  try {
    const { email, password } = data;

    // Validation
    const errors: Record<string, string> = {};

    if (!email || !isValidEmail(email)) {
      errors.email = t("auth.emailVerification.invalidEmail");
    }

    if (!password) {
      errors.password = t("auth.emailVerification.invalidPassword");
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
      "/account/password/recovery",
      { email, password },
      config
    );

    return baseResponse({
      status: 200,
      message: t("auth.resetPassword.successTitle"),
      data: response.data.data,
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("auth.resetPassword.failedTitle"),
        errorCommonMessage: t("auth.systemFailed"),
      },
      session,
      data
    );
  }
}

export const POST = withServerBase(resetPasswordHandler, {
  isAuthenRequired: false,
});
