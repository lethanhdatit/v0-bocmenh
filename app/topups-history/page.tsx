import { Metadata } from "next";
import TopupsHistoryClient from "./TopupsHistoryClient";

export const metadata: Metadata = {
  title: "Lịch sử nạp tiền | Insight",
  description: "Xem lịch sử giao dịch nạp tiền của bạn",
};

export default function TopupsHistoryPage() {
  return <TopupsHistoryClient />;
}