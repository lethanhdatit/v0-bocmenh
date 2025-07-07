import { NextResponse } from "next/server"
import { encryptData } from "@/lib/infra/encryption"

// In-memory store for transaction statuses (for demonstration)
const transactionStatuses: Record<string, { status: string; message: string; details?: any }> = {}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const transId = searchParams.get("id")

  if (!transId) {
    return NextResponse.json({ success: false, message: "Missing transaction ID" }, { status: 400 })
  }

  // Simulate status changes over time
  if (!transactionStatuses[transId]) {
    transactionStatuses[transId] = { status: "PENDING", message: "Giao dịch đang chờ xử lý..." }
    // Simulate a delay and then a status change
    setTimeout(() => {
      const randomStatus = Math.random() > 0.7 ? "FAILED" : "SUCCESS"
      transactionStatuses[transId] = {
        status: randomStatus,
        message: randomStatus === "SUCCESS" ? "Giao dịch thành công!" : "Giao dịch thất bại. Vui lòng thử lại.",
        details: {
          amount: 26130, // Example amount
          fatesAdded: 203, // Example fates
          transactionRef: `TXN-${transId.substring(0, 8)}`,
        },
      }
    }, 5000) // Simulate 5 seconds for status change
  }

  const statusData = transactionStatuses[transId]

  return NextResponse.json({ success: true, data: encryptData(statusData) })
}
