import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import AntdRegistry from "@/lib/AntdRegistry";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@ant-design/v5-patch-for-react-19";
import FloatingButtons from "@/components/FloatingButtons";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import LocalBusinessSchema, {
  WebsiteSchema,
} from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Mỹ phẩm Khánh Diễm – Mỹ phẩm chính hãng",
  description:
    "Mỹ phẩm Khánh Diễm chuyên cung cấp mỹ phẩm chính hãng, an toàn, giá tốt.",
  keywords: [
    "mỹ phẩm khánh diễm",
    "my pham khanh diem",
    "mỹ phẩm chính hãng",
    "shop mỹ phẩm",
    "mỹ phẩm giá tốt",
    "mỹ phẩm an toàn",
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
    title: "Mỹ phẩm Khánh Diễm",
    description: "Mỹ phẩm chính hãng – Khánh Diễm",
    url: "https://myphamkhanhdiem.vn",
    siteName: "Mỹ phẩm Khánh Diễm",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mỹ phẩm Khánh Diễm - Mỹ phẩm chính hãng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mỹ phẩm Khánh Diễm",
    description: "Mỹ phẩm chính hãng – Khánh Diễm",
    images: ["/og-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    // Uncomment and add your verification codes when available
    // google: "your-google-verification-code",
    // other: "your-other-verification-code",
  },
  alternates: {
    canonical: "https://myphamkhanhdiem.vn",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <LocalBusinessSchema />
        <WebsiteSchema />
      </head>
      <body className="font-sans">
        <ReactQueryProvider>
          <AntdRegistry>
            <Header />
            <main className="bg-slate-100 min-h-[50vh]">
              <div className="max-w-[1320px] mx-auto">{children}</div>
            </main>
            <Footer />
            <FloatingButtons />
          </AntdRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
