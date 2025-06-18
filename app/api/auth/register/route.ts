import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session/session";
import { decryptData, encryptData } from "@/lib/infra/encryption";
import { withServerBase, baseResponse } from "@/lib/api/apiServerBase";
import { apiServer, getConfig } from "@/lib/api/apiServer";
import type { UserSession } from "@/lib/session/sessionOptions";
import { getTranslations } from "@/i18n/server";

async function registerPostHandler(
  data: any,
  request: NextRequest,
  userSession: UserSession
) {
  const { t } = await getTranslations(["common", "auth"]);

  try {
    const { email, password, name, confirmPassword } = data;

    // Validation
    const errors: Record<string, string> = {};

    if (!name || name.trim().length < 2) {
      errors.name = t("auth.register.invalidName");
    }

    if (!email || !isValidEmail(email)) {
      errors.email = t("auth.register.invalidEmail");
    }

    if (!password || password.length < 6) {
      errors.password = t("auth.register.invalidPassword");
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = t("auth.register.invalidConfirmPassword");
    }

    if (Object.keys(errors).length > 0) {
      return baseResponse({
        status: 400,
        message: t("auth.register.invalidData"),
        errors,
      });
    }

    const config = await getConfig(request, userSession?.accessToken);

    const response = await apiServer.post(
      "/account/register",
      { username: email, password: password, email, displayName: name },
      config
    );

    const user = response.data.data;

    const session = await getSession();

    session.accessToken = user.token;
    session.id = user.id;
    session.email = user.username;
    session.name = user.displayName ?? user.username ?? user.email;
    session.isPremium = user.isPremium ?? false;
    session.isLoggedIn = true;

    await session.save();

    return baseResponse({
      status: 200,
      message: t("auth.register.registerSuccess"),
      data: session,
    });
  } catch (error) {
   if ((error as any)?.status === 400) {
      return baseResponse({
        status: 401,
        message: t("auth.register.registerFailed"),
        errors: {
          general: t("auth.register.registerFailedDetail"),
        },
      });
    }

    return baseResponse({
      status: 500,
      message: t("auth.register.systemFailed"),
    });
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const POST = withServerBase(registerPostHandler, {
  isAuthenRequired: false,
});
