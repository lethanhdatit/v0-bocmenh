import { apiClient } from "@/lib/api/apiClient";
import { apiServer } from "@/lib/api/apiServer";
import { getBaseUrl } from "@/lib/infra/utils";

// Profile related interfaces
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdTs: string;
  totalDays: number;
  currentFates: number;
}

export async function getUserProfile(): Promise<UserProfile> {
  const response = await apiClient.get<{ data: UserProfile }>(`/profile`);
  return response.data.data;
}

export async function updateUserProfile(data: {
  displayName?: string;
  avatar?: string;
  password?: string;
  newPassword?: string;
}): Promise<UserProfile> {
  const response = await apiClient.put<{ data: UserProfile }>(`/profile`, data);
  return response.data.data;
}