import { Metadata } from "next";
import ServicesHistoryClient from "./ServicesHistoryClient";

export const metadata: Metadata = {
  title: "Lịch sử dịch vụ | Insight",
  description: "Xem lịch sử sử dụng các dịch vụ của bạn",
};

export default function ServicesHistoryPage() {
  return <ServicesHistoryClient />;
}
