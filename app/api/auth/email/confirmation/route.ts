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

async function sendEmailConfirmationHandler(
  data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common", "auth"]);

  try {
    const { email, otp } = data;

    // Validation
    const errors: Record<string, string> = {};

    if (!email || !isValidEmail(email)) {
      errors.email = t("auth.emailConfirmation.invalidEmail");
    }

    if (!otp) {
      errors.otp = t("auth.emailConfirmation.invalidOtp");
    }

    if (Object.keys(errors).length > 0) {
      return baseResponse({
        status: 400,
        message: t("auth.emailConfirmation.invalidData"),
        errors,
      });
    }

    const config = await getConfig(request, session?.accessToken);

    const response = await apiServer.post(
      "/account/email/confirmation",
      { email, otp, module: "BocMenh" },
      config
    );

    return baseResponse({
      status: 200,
      message: t("auth.emailConfirmation.success"),
      data: response.data.data,
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("auth.emailConfirmation.failed"),
        errorCommonMessage: t("auth.systemFailed"),
      },
      session,
      data
    );
  }
}

export const POST = withServerBase(sendEmailConfirmationHandler, {
  isAuthenRequired: false,
});
