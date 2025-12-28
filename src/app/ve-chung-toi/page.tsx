import { Metadata } from "next";
import AboutScreen from "@/modules/about";

export const metadata: Metadata = {
  title: "Về chúng tôi - Mỹ phẩm Khánh Diễm",
  description:
    "Mỹ phẩm Khánh Diễm là nhà phân phối mỹ phẩm tóc uy tín tại Hà Nội. Thành lập từ 2021, chuyên cung cấp sỉ và lẻ sản phẩm làm đẹp chất lượng cao, nguồn gốc rõ ràng, giá cả hợp lý.",
  keywords: [
    "về chúng tôi",
    "mỹ phẩm khánh diễm",
    "my pham khanh diem",
    "phân phối mỹ phẩm",
    "mỹ phẩm chính hãng",
    "mỹ phẩm tóc",
    "Tricol",
    "Real Star",
    "Lacoha",
    "Sophia",
    "Obsidian",
    "Ecolove",
    "Goldwell",
    "Davines",
    "L'Oréal",
    "Schwarzkopf",
  ],
  authors: [{ name: "Mỹ phẩm Khánh Diễm" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Về chúng tôi - Mỹ phẩm Khánh Diễm",
    description:
      "Mỹ phẩm Khánh Diễm - Nhà phân phối mỹ phẩm tóc uy tín tại Hà Nội từ 2021. Chuyên cung cấp sản phẩm làm đẹp chất lượng cao.",
    url: "https://myphamkhanhdiem.vn/ve-chung-toi",
    siteName: "Mỹ phẩm Khánh Diễm",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mỹ phẩm Khánh Diễm - Về chúng tôi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Về chúng tôi - Mỹ phẩm Khánh Diễm",
    description:
      "Mỹ phẩm Khánh Diễm - Nhà phân phối mỹ phẩm tóc uy tín tại Hà Nội từ 2021.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://myphamkhanhdiem.vn/ve-chung-toi",
  },
};

export default function AboutPage() {
  return <AboutScreen />;
}
