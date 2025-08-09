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

async function removeFromFavoritesHandler(
  _data: any,
  request: NextRequest,
  session: IronSession<UserSession>,
  { params }: { params: { productId: string } }
) {
  const { t } = await getTranslations(["common"]);

  try {
    const config = await getConfig(request, session?.accessToken);

    const response = await apiServer.delete(`/affiliate/favorites/${params.productId}`, {
      ...config,
    });

    const result = response.data.data;

    return baseResponse({
      status: 200,
      message: t("common.products.removeFromFavoritesSuccess", "Đã xóa khỏi danh sách yêu thích"),
      data: result,
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("common.products.removeFromFavoritesFailed", "Không thể xóa khỏi danh sách yêu thích"),
        errorCommonMessage: t("common.systemFailed"),
      },
      session,
      _data
    );
  }
}

export const DELETE = withServerBase(removeFromFavoritesHandler, {
  isAuthenRequired: true,
});
