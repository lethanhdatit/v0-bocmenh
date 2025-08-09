import { getSession } from "@/lib/session/session";
import type { NextRequest } from "next/server";
import axios from "axios";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

if (process.env.NODE_ENV !== "production")
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const baseBeUrl = process.env.BE_BASE_URL || "https://localhost:60632";
const defaultForwardHeaders = [
  "Accept",
  "User-Agent",
  "X-Requested-With",
  "Referer",
  "Origin",
  "Accept-Language",
  "X-Forwarded-For",
  "X-Forwarded-Host",
  "X-Time-Zone-Id",
];

export const apiServer = axios.create({
  baseURL: new URL(`/api`, baseBeUrl).toString(),
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getConfigSSR(
  rqHeaders: ReadonlyHeaders,
  accessToken: string | null = null,
  forwardHeaders: string[] = defaultForwardHeaders
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  forwardHeaders.forEach((key) => {
    const value = rqHeaders.get(key);
    if (value) headers[key] = value;
  });

  if (!accessToken) {
    const session = await getSession();
    accessToken = session?.accessToken || null;
  }

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return { headers };
}

export async function getConfig(
  req: NextRequest,
  accessToken: string | null = null,
  forwardHeaders: string[] = defaultForwardHeaders
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  forwardHeaders.forEach((key) => {
    const value = req.headers.get(key);
    if (value) headers[key] = value;
  });

  if (!accessToken) {
    const session = await getSession();
    accessToken = session?.accessToken || null;
  }

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return { headers };
}

apiServer.interceptors.request.use((config) => {
  config.headers["X-Api-Key"] = process.env.API_KEY || "";
  return config;
});

apiServer.interceptors.response.use(
  (response) => {
    const data = response.data;
    let formattedData;

    if (response.status === 200) {
      formattedData = {
        status: response.status,
        message: data.message,
        data: data.data,
      };
    } else if (response.status === 400) {
      formattedData = {
        status: response.status,
        message: data.message,
        errors: data.data,
      };
    } else if (response.status === 403) {
      formattedData = {
        status: response.status,
        message: "Forbidden",
      };
    } else if (response.status === 500) {
      formattedData = {
        status: response.status,
        message: "Internal Server Error",
      };
    } else {
      formattedData = {
        status: response.status,
        message: "Unexpected response status",
      };
    }

    return {
      ...response,
      data: formattedData,
    };
  },
  (error) => {
    if (error.code === "ECONNREFUSED") {
      return Promise.reject({
        status: 503,
        message: "Không thể kết nối tới máy chủ. Vui lòng thử lại sau.",
        details: {
          address: error.address,
          port: error.port,
        },
      });
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        status: 504,
        message: "Yêu cầu quá thời gian xử lý. Vui lòng thử lại sau.",
      });
    }

    return Promise.reject({
      status: error.response?.status || 500,
      message: error.message || "Đã xảy ra lỗi không xác định.",
      data: error.response?.data,
    });
  }
);
