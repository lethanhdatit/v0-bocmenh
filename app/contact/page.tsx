import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Liên hệ - Bóc Mệnh | Kết nối với chúng tôi",
  description:
    "Liên hệ với Bóc Mệnh qua Facebook, YouTube, Zalo, Email. Hỗ trợ khách hàng 24/7, cơ hội hợp tác đối tác và affiliate marketing.",
  keywords: "liên hệ bóc mệnh, hỗ trợ khách hàng, đối tác affiliate, hợp tác quảng cáo, phong thủy online",
  openGraph: {
    title: "Liên hệ - Bóc Mệnh",
    description: "Kết nối với Bóc Mệnh - Chúng tôi luôn sẵn sàng hỗ trợ bạn",
    type: "website",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
