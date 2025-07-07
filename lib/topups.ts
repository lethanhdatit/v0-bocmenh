import { apiClient } from "@/lib/api/apiClient"

export interface TopupPackage {
  id: string
  name: string
  description: string
  kind: string
  fates: number
  fateBonus?: number
  fateBonusRate?: number
  finalFates: number
  amount: number
  amountDiscount?: number
  amountDiscountRate?: number
  finalAmount: number
  createdTs: string
  rate: number
}

export interface PaymentGate {
  id: string
  name: string
  icon: string
  description: string
}

export interface BuyTopupResponse {
  ipnLink: string
}

export interface TransactionStatusResponse {
  status: "PENDING" | "SUCCESS" | "FAILED"
  message: string
  details?: {
    amount: number
    fatesAdded: number
    transactionRef: string
  }
}

export async function getTopupPackages(): Promise<TopupPackage[]> {
  const response = await apiClient.get<{ data: TopupPackage[] }>("/topups")
  return response.data.data
}

export async function getPaymentGates(): Promise<PaymentGate[]> {
  const response = await apiClient.get<{ data: PaymentGate[] }>("/payment-gates")
  return response.data.data
}

export async function buyTopup(packageId: string, paymentGateId: string): Promise<BuyTopupResponse> {
  const response = await apiClient.post<{ data: BuyTopupResponse }>("/topups", { packageId, paymentGateId })
  return response.data.data
}

export async function getTransactionStatus(transId: string): Promise<TransactionStatusResponse> {
  const response = await apiClient.post<{ data: TransactionStatusResponse }>(`/transaction-status?id=${transId}`)
  return response.data.data
}
