import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import AntdRegistry from "@/lib/AntdRegistry";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@ant-design/v5-patch-for-react-19";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="vi" className="text-[14px]">
      <body className={`${geistSans.variable} ${geistMono.variable} text-sm leading-relaxed`}>
        <ReactQueryProvider>
          <AntdRegistry>
            <Header />
            <main className="bg-slate-100 min-h-[50vh]">
              <div className="max-w-7xl mx-auto px-0 md:px-4 lg:px-0">{children}</div>
            </main>
            <Footer />
          </AntdRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
