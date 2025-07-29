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

async function getProfileHandler(
  _data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common", "auth"]);

  try {
    const config = await getConfig(request, session?.accessToken);

    const response = await apiServer.get("/account/me", {
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
        error400Message: t("auth.profile.getProfileFailed", "Không thể tải thông tin profile"),
        errorCommonMessage: t("common.systemFailed"),
      },
      session,
      _data
    );
  }
}

async function updateProfileHandler(
  data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common", "auth"]);

  try {
    const config = await getConfig(request, session?.accessToken);

    const response = await apiServer.put("/account/me", data, {
      ...config,
    });

    const result = response.data.data;

    session.name = result.displayName || result.name;
    session.avatar = result.avatar;

    await session.save();

    if(result.needLogout){
        session.destroy();
    }

    return baseResponse({
      status: 200,
      message: "ok",
      data: result,
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("auth.profile.updateProfileFailed", "Không thể cập nhật profile"),
        errorCommonMessage: t("common.systemFailed"),
      },
      session,
      data
    );
  }
}

export const GET = withServerBase(getProfileHandler, {
  isAuthenRequired: true,
});

export const PUT = withServerBase(updateProfileHandler, {
  isAuthenRequired: true,
});
