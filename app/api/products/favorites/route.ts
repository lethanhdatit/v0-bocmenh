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

async function addToFavoritesHandler(
  data: { productId: string },
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common"]);

  try {
    const config = await getConfig(request, session?.accessToken);

    const response = await apiServer.post("/affiliate/favorites", data, {
      ...config,
    });

    const result = response.data.data;

    return baseResponse({
      status: 200,
      message: t("common.products.addToFavoritesSuccess", "Đã thêm vào danh sách yêu thích"),
      data: result,
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("common.products.addToFavoritesFailed", "Không thể thêm vào danh sách yêu thích"),
        errorCommonMessage: t("common.systemFailed"),
      },
      session,
      data
    );
  }
}

async function getMyFavoritesHandler(
  _data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common"]);

  try {
    const config = await getConfig(request, session?.accessToken);
    
    // Forward query parameters from the request
    const url = new URL(request.url);
    const queryString = url.search;

    const response = await apiServer.get(`/affiliate/favorites${queryString}`, {
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
        error400Message: t("common.products.getMyFavoritesFailed", "Không thể tải danh sách yêu thích"),
        errorCommonMessage: t("common.systemFailed"),
      },
      session,
      _data
    );
  }
}

export const POST = withServerBase(addToFavoritesHandler, {
  isAuthenRequired: true,
});

export const GET = withServerBase(getMyFavoritesHandler, {
  isAuthenRequired: true,
});
