import { Metadata } from "next";
import ContactScreen from "@/modules/contact";

export const metadata: Metadata = {
  title: "Liên Hệ - Mỹ phẩm Khánh Diễm",
  description:
    "Thông tin liên hệ chính thức của Mỹ phẩm Khánh Diễm. Địa chỉ các cơ sở tại Hà Nội, số điện thoại hotline và email hỗ trợ khách hàng.",
  keywords: [
    "liên hệ",
    "mỹ phẩm khánh diễm",
    "địa chỉ mỹ phẩm khánh diễm",
    "hotline khánh diễm",
    "my pham khanh diem contact",
  ],
  authors: [{ name: "Mỹ phẩm Khánh Diễm" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Liên Hệ - Mỹ phẩm Khánh Diễm",
    description: "Thông tin liên hệ chính thức của Mỹ phẩm Khánh Diễm.",
    type: "website",
    url: "https://myphamkhanhdiem.com/lien-he",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Liên Hệ - Mỹ Phẩm Khánh Diễm",
      },
    ],
  },
  alternates: {
    canonical: "https://myphamkhanhdiem.com/lien-he",
  },
};

export default function ContactPage() {
  return <ContactScreen />;
}
