import { getSession } from "@/lib/session/session";
import type { NextRequest } from "next/server";
import axios from "axios";

if (process.env.NODE_ENV !== "production")
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const baseBeUrl = process.env.BE_BASE_URL || "https://localhost:60632";

export const apiServer = axios.create({
  baseURL: new URL(`/api`, baseBeUrl).toString(),
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getConfig(
  req: NextRequest,
  accessToken: string | null = null,
  forwardHeaders: string[] = [
    "Accept",
    "User-Agent",
    "X-Requested-With",
    "Referer",
    "Origin",
    "Accept-Language",
    "X-Forwarded-For",
    "X-Forwarded-Host",
  ]
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Forward các header cần thiết từ req
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

apiServer.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (response.status === 200) {
      response.data = {
        status: 200,
        message: data.message,
        data: data.data,
      };
    } else if (response.status === 400) {
      response.data = {
        status: 400,
        message: data.message,
        errors: data.data,
      };
    } else if (response.status === 403) {
      response.data = {
        status: 403,
        message: "Forbidden",
      };
    } else if (response.status === 500) {
      response.data = {
        status: 500,
        message: "Internal Server Error",
      };
    } else {
      response.data = {
        status: response.status,
        message: "Unexpected response status",
      };
    }
    return response;
  }
);
