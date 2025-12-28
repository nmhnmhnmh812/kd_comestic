import { Metadata } from "next";
import BrandStoryScreen from "@/modules/brand-story";

export const metadata: Metadata = {
  title:
    "Câu Chuyện Thương Hiệu - Mỹ Phẩm Khánh Diễm | Hành Trình Kiến Tạo Vẻ Đẹp",
  description:
    "Khám phá hành trình khởi nghiệp đầy cảm hứng của Mỹ Phẩm Khánh Diễm, từ những ngày giãn cách khó khăn đến thương hiệu mỹ phẩm uy tín tại Nam Hà Nội. Sự kiên trì và tử tế trong kinh doanh.",
  keywords: [
    "câu chuyện thương hiệu",
    "mỹ phẩm khánh diễm",
    "hành trình khởi nghiệp",
    "mỹ phẩm chính hãng",
    "mỹ phẩm tóc",
    "uy tín hà nội",
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
    title: "Câu Chuyện Thương Hiệu - Mỹ Phẩm Khánh Diễm",
    description: "Hành trình từ con số 0 đến thương hiệu mỹ phẩm uy tín.",
    type: "article",
    url: "https://myphamkhanhdiem.com/cau-chuyen-thuong-hieu",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Mỹ Phẩm Khánh Diễm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Câu Chuyện Thương Hiệu - Mỹ Phẩm Khánh Diễm",
    description: "Hành trình từ con số 0 đến thương hiệu mỹ phẩm uy tín.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://myphamkhanhdiem.com/cau-chuyen-thuong-hieu",
  },
};

export default function BrandStoryPage() {
  return <BrandStoryScreen />;
}
