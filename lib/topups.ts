import { apiClient } from "@/lib/api/apiClient";
import { apiServer } from "@/lib/api/apiServer";
import { getBaseUrl } from "@/lib/infra/utils";

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
  vaTaxIncluded: boolean;
  vaTaxRate: number;
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

export interface MemoCheckoutResponse extends TopupPackage {
  currency: "USD" | "VND";
  memoCheckout: TransactionStatusResponse;
}

export interface TransactionStatusResponse {
  id: string;
  status: "new" | "processing" | "partiallyPaid" | "paid" | "cancelled";
  provider: "vietQR" | "paypal";
  currency: "USD" | "VND";
  exchangeRate: number;
  total: number;
  subTotal: number;
  discountTotal: number;
  finalTotal: number;
  paid: number;
  buyerPaysFee: boolean;
  feeRate: number;
  feeTotal: number;
  vaTaxIncluded: boolean;
  vaTaxRate: number;
  vaTaxTotal: number;
  note: string;
  packageName: string;
  fates: number;
  finalFates: number;
  fateBonus: number;
  fateBonusRate: number;
  providerMeta?: any;
  meta?: any;
  createdTs?: string;
}

export interface PaginatedBase<TDto> {
  pageNumber?: number;
  pageSize?: number;
  totalRecords?: number;
  totalSelected?: number;
  totalPages?: number;
  items: TDto[];
}

// Interface cho transaction history response
export interface TransactionHistoryResponse extends PaginatedBase<TransactionStatusResponse> {}

export async function getTopupPackages(): Promise<TopupPackage[]> {
  try {
    const response = await apiServer.get(`/transaction/topups`);
    return response.data.data;
  } catch (error) {
    return [];
  }
}

export async function buyTopup(
  packageId?: string,
  paymentGateId?: string,
  miniMode: boolean = false,
  autoClose: boolean = false,
  id?: string | null | undefined
): Promise<BuyTopupResponse> {
  const callbackUrl = `${getBaseUrl()}/topups-checkout?miniMode=${miniMode}&autoClose=${autoClose}`;
  const response = await apiClient.post<{ data: BuyTopupResponse }>("/topups", {
    packageId,
    paymentGateId,
    callbackUrl,
    id,
  });
  return response.data.data;
}

export async function memoCheckout(
  packageId: string,
  paymentGateId: string
): Promise<MemoCheckoutResponse> {
  const url = `/topups/memo-checkout?topupPackageId=${packageId}&provider=${paymentGateId}`;
  const response = await apiClient.get<{ data: MemoCheckoutResponse }>(url);
  return response.data.data;
}

export async function getMyFates(): Promise<number> {
  try {
    const response = await apiClient.get(`/topups`);
    return response?.data?.data ?? 0;
  } catch (error) {
    return 0;
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

export async function cancelTopup(
  transId: string
): Promise<TransactionStatusResponse> {
  const response = await apiClient.post<{ data: TransactionStatusResponse }>(
    `/transaction/cancel?id=${transId}`
  );
  return response.data.data;
}

export async function payService(id: string): Promise<any> {
  const response = await apiClient.post<{ data: any }>(`/transaction/pay`, {
    id,
  });
  return response.data.data;
}

export async function getTransactionStatus(
  transId: string
): Promise<TransactionStatusResponse> {
  const response = await apiClient.post<{ data: TransactionStatusResponse }>(
    `/transaction/status?id=${transId}`
  );
  return response.data.data;
}

export async function getTransactionHistory(
  pageSize: number,
  pageNumber: number
): Promise<TransactionHistoryResponse> {
  const response = await apiClient.get<{ data: TransactionHistoryResponse }>(
    `/transaction/history?pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
  return response.data.data;
}