import axios from "axios"
import { encryptData, decryptData } from "./encryption"

// Create axios instance
export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
})

// Request interceptor to encrypt data
apiClient.interceptors.request.use(
  (config) => {
    if (config.data) {
      config.data = { encrypted: encryptData(config.data) }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor to decrypt data
apiClient.interceptors.response.use(
  (response) => {
    if (response.data?.encrypted) {
      response.data = decryptData(response.data.encrypted)
    }
    return response
  },
  (error) => Promise.reject(error),
)

// SWR fetcher function
export const fetcher = (url: string) => apiClient.get(url).then((res) => res.data)
