import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { encryptData, decryptData } from "../infra/encryption";
import { NextResponse } from "next/server";
import { getTranslations } from "@/i18n/server";
import {
  showGlobalLoading,
  hideGlobalLoading,
  getIsLoading,
} from "@/lib/utils";

let globalAuthPromptHandler: ((options?: any) => void) | null = null;

export function setGlobalAuthPrompt(handler: typeof globalAuthPromptHandler) {
  globalAuthPromptHandler = handler;
}

let globalLogoutHandler: (() => void | Promise<void>) | null = null;

export function setGlobalLogoutHandler(handler: typeof globalLogoutHandler) {
  globalLogoutHandler = handler;
}

// Global language state for API client
let currentLanguage: string = "vi";

export function setApiClientLanguage(language: string) {
  currentLanguage = language;
}

export function getApiClientLanguage(): string {
  return currentLanguage;
}

export const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for encryption and language headers
apiClient.interceptors.request.use(
  (config) => {
    if (
      config.data &&
      ["post", "put", "patch"].includes(config.method?.toLowerCase() || "")
    ) {
      if (!(config.data instanceof FormData)) {
        config.data = { encrypted: encryptData(config.data) };
      }
    }
    
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    config.headers['X-Time-Zone-Id'] = timeZone;
    
    // Set Accept-Language header based on current language
    config.headers['Accept-Language'] = currentLanguage === "vi" ? "vi-VN,vi;q=0.9,en;q=0.8" : "en-US,en;q=0.9,vi;q=0.8";

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for decryption and auth handling
apiClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.encrypted) {
      try {
        response.data = decryptData(response.data.encrypted);
      } catch (e) {
        console.error("Failed to decrypt response data", e);
      }
    }
    return response;
  },
  async (error: AxiosError<ApiBaseResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _preserveState?: boolean;
      _redirectTo?: string;
    };

    let data = error.response?.data as any;

    if (data?.encrypted) {
      data = decryptData(data.encrypted);
    }

    if (error.response?.status === 401 && globalLogoutHandler) {
      await globalLogoutHandler();
    }

    if (
      error.response?.status === 401 &&
      (data?.errorCode === "AUTH_REQUIRED_RETRY" ||
        data?.errorCode === "AUTH_REQUIRED") &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark to prevent infinite loops
      originalRequest.data = data.forwardData;
      
      if (globalAuthPromptHandler) {
        const needReloading = getIsLoading();

        if (needReloading) hideGlobalLoading();

        return new Promise((resolve, reject) => {
          globalAuthPromptHandler!({
            onLoginSuccess: async () => {
              try {
                if (needReloading) showGlobalLoading();
                // Re-attempt the original request
                if (data?.errorCode === "AUTH_REQUIRED_RETRY") {
                  const response = await apiClient(originalRequest);
                  resolve(response);
                } else {
                  const { t } = await getTranslations(["common", "common"]);
                  reject(
                    NextResponse.json(
                      {
                        success: false,
                        message: t("common.tryAgain"),
                        errors: { general: t("common.tryAgain") },
                      } as ApiBaseResponse,
                      { status: 400 }
                    )
                  );
                }
              } catch (retryError) {
                reject(retryError);
              }
            },
          });
        });
      }
    }

    if (data) {
      error.response!.data = data;
    }
    return Promise.reject(error);
  }
);

// SWR fetcher function
export const fetcher = (url: string) =>
  apiClient.get(url).then((res) => res.data);

export interface ApiBaseResponse {
  success: boolean;
  message?: string;
  data?: any;
  forwardData?: any;
  beErrorCode?: string;
  beErrorMetaData?: any;
  beErrorMessage?: string;
  error?: string;
  errorCode?: string;
  errors?: Record<string, string>;
}
