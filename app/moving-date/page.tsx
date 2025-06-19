import type { Metadata } from "next"
import MovingDateForm from "@/components/forms/MovingDateForm"
import { getBaseUrl } from "@/lib/infra/utils"

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Chọn Ngày Chuyển Nhà | Bóc Mệnh",
  description:
    "Tìm ngày tốt để chuyển nhà theo phong thủy. Tính toán dựa trên ngày sinh và các yếu tố phong thủy để chọn ngày chuyển nhà may mắn nhất.",
  keywords: "chọn ngày chuyển nhà, phong thủy chuyển nhà, ngày tốt chuyển nhà, xem ngày chuyển nhà",
}

export default function MovingDatePage() {
  return <MovingDateForm />
}
