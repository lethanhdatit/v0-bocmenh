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

async function getProductHandler(
  _data: any,
  request: NextRequest,
  session: IronSession<UserSession>,
  { params }: { params: { productId: string } }
) {
  const { t } = await getTranslations(["common"]);

  try {
    const config = await getConfig(request, session?.accessToken);
    
    // Forward query parameters from the request
    const url = new URL(request.url);
    const queryString = url.search;

    const response = await apiServer.get(`/affiliate/products/${params.productId}${queryString}`, {
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
        error400Message: t("common.products.getProductFailed", "Không thể tải chi tiết sản phẩm"),
        errorCommonMessage: t("common.systemFailed"),
      },
      session,
      _data
    );
  }
}

export const GET = withServerBase(getProductHandler, {
  isAuthenRequired: false,
});
