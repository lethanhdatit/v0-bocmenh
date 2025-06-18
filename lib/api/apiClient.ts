import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios"
import { encryptData, decryptData } from "../infra/encryption"

// This function will be set by AuthSetup to link to AuthContext's openLoginModal
let globalAuthPromptHandler: ((options?: any) => void) | null = null

export function setGlobalAuthPrompt(handler: typeof globalAuthPromptHandler) {
  globalAuthPromptHandler = handler
}

export const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for encryption
apiClient.interceptors.request.use(
  (config) => {
    if (config.data) {
      if (!(config.data instanceof FormData)) {
        config.data = { encrypted: encryptData(config.data) }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for decryption and auth handling
apiClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.encrypted) {
      try {
        response.data = decryptData(response.data.encrypted)
      } catch (e) {
        console.error("Failed to decrypt response data", e)
      }
    }
    return response
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
      _preserveState?: boolean
      _redirectTo?: string
    }

    let data = error.response?.data;

    if ((data as any)?.encrypted) {
      data = decryptData((data as any).encrypted)
    }

    if (
      error.response?.status === 401 &&
      data?.errorCode === "AUTH_REQUIRED" &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true // Mark to prevent infinite loops

      if (globalAuthPromptHandler) {
        return new Promise((resolve, reject) => {
          globalAuthPromptHandler!({
            onLoginSuccess: async () => {
              try {
                // Re-attempt the original request
                const response = await apiClient(originalRequest)
                resolve(response)
              } catch (retryError) {
                reject(retryError)
              }
            },
          })
        })
      } else {
        console.warn("Global auth prompt handler not set. Cannot prompt for login via interceptor.")
      }
    }

    if (data) {
      error.response!.data = data
    }
    return Promise.reject(error)
  },
)

// SWR fetcher function
export const fetcher = (url: string) => apiClient.get(url).then((res) => res.data)

export interface ApiErrorResponse {
  success: boolean
  error: string
  errorCode?: string
  errors?: Record<string, string>
}
