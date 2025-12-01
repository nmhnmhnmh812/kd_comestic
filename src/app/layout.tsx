import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import AntdRegistry from "@/lib/AntdRegistry";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@ant-design/v5-patch-for-react-19";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata: Metadata = {
  title: "KMP Cosmetics",
  description: "Mỹ phẩm chính hãng",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="font-sans">
        <ReactQueryProvider>
          <AntdRegistry>
            <Header />
            <main className="bg-slate-100 min-h-[50vh]">
              <div className="max-w-7xl mx-auto px-4 md:px-6">{children}</div>
            </main>
            <Footer />
            <FloatingButtons />
          </AntdRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
