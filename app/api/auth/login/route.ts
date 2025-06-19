import { type NextRequest } from "next/server";
import { getTranslations } from "@/i18n/server";
import type { UserSession } from "@/lib/session/sessionOptions";
import {
  withServerBase,
  baseResponse,
  handleApiServerError,
} from "@/lib/api/apiServerBase";
import { apiServer, getConfig } from "@/lib/api/apiServer";
import { IronSession } from "iron-session";

async function loginPostHandler(
  data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common", "auth"]);

  try {
    const { email, password, rememberMe } = data;

    // Validation
    const errors: Record<string, string> = {};

    if (!email || !isValidEmail(email)) {
      errors.email = t("auth.login.invalidEmail");
    }

    if (!password || password.length < 1) {
      errors.password = t("auth.login.emptyPassword");
    }

    if (Object.keys(errors).length > 0) {
      return baseResponse({
        status: 400,
        message: t("auth.login.invalidCredentials"),
        errors,
      });
    }

    const config = await getConfig(request, session?.accessToken);

    const response = await apiServer.post(
      "/account/login",
      { username: email, password: password, rememberMe },
      config
    );

    const user = response.data.data;
    
    session.accessToken = user.token;
    session.id = user.id;
    session.email = user.username;
    session.name = user.displayName ?? user.username ?? user.email;
    session.isPremium = user.isPremium ?? false;
    session.isLoggedIn = true;

    await session.save();

    return baseResponse({
      status: 200,
      message: t("auth.login.success"),
      data: session,
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("auth.login.loginFailedDetail"),
        errorCommonMessage: t("auth.login.systemFailed"),
      },
      session
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const POST = withServerBase(loginPostHandler, {
  isAuthenRequired: false,
});
