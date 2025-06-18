import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios"
import { encryptData, decryptData } from "./encryption"

// This function will be set by AuthSetup to link to AuthContext's promptLogin
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
    if (config.data && (config.method === "post" || config.method === "put" || config.method === "patch")) {
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

    if (
      error.response?.status === 401 &&
      error.response.data?.errorCode === "AUTH_REQUIRED" &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true // Mark to prevent infinite loops

      if (globalAuthPromptHandler) {
        return new Promise((resolve, reject) => {
          globalAuthPromptHandler({
            onLoginSuccess: async () => {
              try {
                // Re-attempt the original request
                const response = await apiClient(originalRequest)
                resolve(response)
              } catch (retryError) {
                reject(retryError)
              }
            },
            // preserveState and redirectTo are hints for the promptLogin UI,
            // not directly used by the interceptor's retry logic here.
            // The original request config is reused.
            // preserveState: originalRequest._preserveState,
            // redirectTo: originalRequest._redirectTo,
          })
        })
      } else {
        console.warn("Global auth prompt handler not set. Cannot prompt for login via interceptor.")
        // Fallback if handler isn't set, reject or redirect.
        // For a smoother UX, rejecting is better than a hard redirect here.
      }
    }

    // Decrypt error response if it's encrypted (as per existing pattern)
    if (error.response?.data && (error.response.data as any).encrypted) {
      try {
        error.response.data = decryptData((error.response.data as any).encrypted)
      } catch (e) {
        console.error("Failed to decrypt error response data", e)
      }
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
