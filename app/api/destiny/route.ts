import { type NextRequest, NextResponse } from "next/server";
import type { UserSession } from "@/lib/session/sessionOptions";
import {
  withServerBase,
  baseResponse,
  handleApiServerError,
} from "@/lib/api/apiServerBase";
import { IronSession } from "iron-session";
import { apiServer, getConfig } from "@/lib/api/apiServer";
import { getTranslations } from "@/i18n/server";

// POST handler
async function destinyApiHandler(
  data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common", "destiny"]);

  try {
    const { birthDate, birthTime, birthPlace, gender } = data;

    // Validation
    const errors: Record<string, string> = {};

    if (!birthTime || !birthDate || !birthPlace || !gender) {
      errors.birthTime = t("destiny.error.invalidInput");
    }

    if (Object.keys(errors).length > 0) {
      return baseResponse({
        status: 400,
        message: t("destiny.error.invalidInput"),
        errors,
      });
    }

    const config = await getConfig(request, session?.accessToken);

    const timeWithSeconds =
      birthTime.length === 5 ? birthTime + ":00" : birthTime;

    const combinedDateTimeString = `${birthDate}T${timeWithSeconds}`;
    // const dateObjectLocal = new Date(combinedDateTimeString);
    // const birthDateTimeISO = dateObjectLocal.toISOString();

    const response = await apiServer.post(
      "/bocmenh/tuTruBatTu",
      {
        birthDateTime: combinedDateTimeString,
        birthPlace: birthPlace,
        gender: gender,
      },
      config
    );

    const desResult = response.data.data;

    return baseResponse({
      status: 200,
      message: "ok",
      data: desResult,
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("destiny.error.theologyFailed"),
        errorCommonMessage: t("destiny.systemFailed"),
      },
      session,
      data
    );
  }
}

// GET handler
async function destinyApiGetHandler(
  _data: any,
  request: NextRequest,
  session: IronSession<UserSession>
) {
  const { t } = await getTranslations(["common", "destiny"]);

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return baseResponse({
        status: 400,
        message: t("destiny.error.invalidInput"),
        errors: { id: t("destiny.error.invalidInput") },
      });
    }

    const config = await getConfig(request, session?.accessToken);

    const response = await apiServer.get(`/bocmenh/tuTruBatTu/${id}`, {
      ...config,
    });

    const desResult = response.data.data;

    return baseResponse({
      status: 200,
      message: "ok",
      data: desResult,
    });
  } catch (error) {
    return handleApiServerError(
      error,
      {
        error400Message: t("destiny.error.theologyFailed"),
        errorCommonMessage: t("destiny.systemFailed"),
      },
      session,
      _data
    );
  }
}

export const POST = withServerBase(destinyApiHandler, {
  isAuthenRequired: true,
});

export const GET = withServerBase(destinyApiGetHandler, {
  isAuthenRequired: true,
});
