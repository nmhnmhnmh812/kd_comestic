import { Metadata } from "next";
import GeneralRegulationsScreen from "@/modules/general-regulations";
import { getStoreLocations } from "@/api/storeLocation";

export const metadata: Metadata = {
  title: "Quy định chung - Mỹ phẩm Khánh Diễm",
  description:
    "Quy định chung và chính sách thanh toán, vận chuyển, giao nhận tại Mỹ phẩm Khánh Diễm. Cam kết hàng chính hãng, giao hàng toàn quốc.",
  keywords: [
    "quy định chung",
    "chính sách thanh toán",
    "chính sách vận chuyển",
    "mỹ phẩm khánh diễm",
    "my pham khanh diem",
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
    title: "Quy định chung - Mỹ phẩm Khánh Diễm",
    description:
      "Quy định chung về thanh toán và vận chuyển tại Mỹ phẩm Khánh Diễm.",
    url: "https://myphamkhanhdiem.vn/quy-dinh-chung",
    siteName: "Mỹ phẩm Khánh Diễm",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mỹ phẩm Khánh Diễm - Quy định chung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quy định chung - Mỹ phẩm Khánh Diễm",
    description:
      "Quy định chung về thanh toán và vận chuyển tại Mỹ phẩm Khánh Diễm.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://myphamkhanhdiem.vn/quy-dinh-chung",
  },
};

export default async function GeneralRegulations() {
  const storeLocations = await getStoreLocations();
  return <GeneralRegulationsScreen storeLocations={storeLocations} />;
}
