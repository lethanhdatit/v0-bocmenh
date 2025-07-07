import { NextResponse } from "next/server"
import { encryptData } from "@/lib/infra/encryption"

export async function GET() {
  const topups = [
    {
      id: "5a37ffc8-1c15-4879-b1c3-4d0a7ceb9017",
      name: "Hữu Duyên",
      description: "Hữu Duyên",
      kind: "huuDuyen",
      fates: 190,
      fateBonus: 5,
      fateBonusRate: 4,
      finalFates: 203,
      amount: 29000,
      amountDiscount: 2000,
      amountDiscountRate: 3,
      finalAmount: 26130,
      createdTs: "2025-07-03T13:59:03.704395Z",
      rate: 128.7192118226601,
    },
    {
      id: "7948c5cf-1ade-42d8-b8ae-d6d7361dbbf9",
      name: "Thời Duyên",
      description: "Thời Duyên",
      kind: "thoiDuyen",
      fates: 290,
      fateBonus: 8,
      fateBonusRate: 6,
      finalFates: 316,
      amount: 49000,
      amountDiscount: 4500,
      amountDiscountRate: 6.5,
      finalAmount: 41315,
      createdTs: "2025-07-03T13:59:03.768208Z",
      rate: 130.74367088607596,
    },
    {
      id: "92aa98a8-f1b5-4455-b643-d1b705725627",
      name: "Nhật Duyên",
      description: "Nhật Duyên",
      kind: "nhatDuyen",
      fates: 580,
      fateBonus: 20,
      fateBonusRate: 9.5,
      finalFates: 656,
      amount: 99000,
      amountDiscount: 7900,
      amountDiscountRate: 8.5,
      finalAmount: 82685,
      createdTs: "2025-07-03T13:59:03.768836Z",
      rate: 126.04420731707317,
    },
    {
      id: "d9fe3109-cf37-4a88-b5a0-9d5844044158",
      name: "Nguyệt Duyên",
      description: "Nguyệt Duyên",
      kind: "nguyetDuyen",
      fates: 1160,
      fateBonus: 45,
      fateBonusRate: 11.5,
      finalFates: 1339,
      amount: 199000,
      amountDiscount: 14500,
      amountDiscountRate: 10.5,
      finalAmount: 163605,
      createdTs: "2025-07-03T13:59:03.768876Z",
      rate: 122.18446601941747,
    },
    {
      id: "7650cc72-4c30-4d82-93a4-7052f8377a9b",
      name: "Thiên Duyên",
      description: "Thiên Duyên",
      kind: "thienDuyen",
      fates: 1988,
      fateBonus: 80,
      fateBonusRate: 13.5,
      finalFates: 2337,
      amount: 340000,
      amountDiscount: 32000,
      amountDiscountRate: 12.5,
      finalAmount: 265500,
      createdTs: "2025-07-03T13:59:03.768906Z",
      rate: 113.60718870346598,
    },
    {
      id: "d809f699-e8b3-4ed6-87f6-cde6533d0570",
      name: "Vũ Duyên",
      description: "Vũ Duyên",
      kind: "vuDuyen",
      fates: 3391,
      fateBonus: 120,
      fateBonusRate: 15.5,
      finalFates: 4037,
      amount: 580000,
      amountDiscount: 55000,
      amountDiscountRate: 14.5,
      finalAmount: 440900,
      createdTs: "2025-07-03T13:59:03.768918Z",
      rate: 109.21476343819668,
    },
  ]

  return NextResponse.json({ success: true, data: encryptData(topups) })
}

export async function POST(req: Request) {
  const { packageId, paymentGateId } = await req.json()

  // Simulate a successful purchase and return an IPN link
  const ipnLink = `/topups-checkout?transId=${Date.now()}-${packageId}-${paymentGateId}`

  return NextResponse.json({
    success: true,
    message: "Purchase initiated successfully.",
    data: encryptData({ ipnLink }),
  })
}
