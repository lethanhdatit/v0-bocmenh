import { apiClient } from "@/lib/api/apiClient";

export interface EmailVerificationRequest {
  email: string;
}

export interface EmailConfirmationRequest {
  email: string;
  otp: string;
}

export interface EmailVerificationResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function sendEmailVerification(
  data: EmailVerificationRequest
): Promise<EmailVerificationResponse> {
  const response = await apiClient.post<EmailVerificationResponse>(
    `/auth/email/verification`,
    data
  );
  return response.data;
}

export async function confirmEmailVerification(
  data: EmailConfirmationRequest
): Promise<EmailVerificationResponse> {
  const response = await apiClient.post<EmailVerificationResponse>(
    `/auth/email/confirmation`,
    data
  );
  return response.data;
}