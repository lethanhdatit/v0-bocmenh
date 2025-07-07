import { apiClient } from "@/lib/api/apiClient";
import { apiServer } from "@/lib/api/apiServer";

export interface TopupPackage {
  id: string;
  name: string;
  description: string;
  kind: string;
  fates: number;
  fateBonus?: number;
  fateBonusRate?: number;
  finalFates: number;
  amount: number;
  amountDiscount?: number;
  amountDiscountRate?: number;
  finalAmount: number;
  createdTs: string;
  rate: number;
}

export interface PaymentGate {
  id: string;
  name: string;
  icon: string;
  description: string;
  active: boolean;
}

export interface BuyTopupResponse {
  ipnLink: string;
}

export interface TransactionStatusResponse {
  status: "PENDING" | "SUCCESS" | "FAILED";
  message: string;
  details?: {
    amount: number;
    fatesAdded: number;
    transactionRef: string;
  };
}

export async function getTopupPackages(): Promise<TopupPackage[]> {
  try {
    const response = await apiServer.get(`/transaction/topups`);
    return response.data.data;
  } catch (error) {
    return [];
  }
}

export async function getPaymentGates(): Promise<PaymentGate[]> {
  try {
    const response = await apiServer.get(`/transaction/paymentGates`);
    return response.data.data;
  } catch (error) {
    return [];
  }
}

export async function buyTopup(
  packageId: string,
  paymentGateId: string
): Promise<BuyTopupResponse> {
  const response = await apiClient.post<{ data: BuyTopupResponse }>("/topups", {
    packageId,
    paymentGateId,
  });
  return response.data.data;
}

export async function getTransactionStatus(
  transId: string
): Promise<TransactionStatusResponse> {
  const response = await apiClient.post<{ data: TransactionStatusResponse }>(
    `/transaction-status?id=${transId}`
  );
  return response.data.data;
}
