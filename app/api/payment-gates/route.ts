import { NextResponse } from "next/server"
import { encryptData } from "@/lib/infra/encryption"

export async function GET() {
  const paymentGates = [
    {
      id: "pg_momo",
      name: "Momo",
      icon: "/imgs/momo-icon.png", // Placeholder icon
      description: "Thanh toán qua ví điện tử Momo",
    },
    {
      id: "pg_zalopay",
      name: "ZaloPay",
      icon: "/imgs/zalopay-icon.png", // Placeholder icon
      description: "Thanh toán qua ví điện tử ZaloPay",
    },
    {
      id: "pg_banktransfer",
      name: "Chuyển khoản ngân hàng",
      icon: "/imgs/bank-icon.png", // Placeholder icon
      description: "Thanh toán qua chuyển khoản ngân hàng",
    },
  ]

  return NextResponse.json({ success: true, data: encryptData(paymentGates) })
}
