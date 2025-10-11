import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import AntdRegistry from "@/lib/AntdRegistry";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <Header />
          <main className="min-h-screen bg-slate-100 mt-[165px]">
            {children}
          </main>
          <Footer />
        </AntdRegistry>
      </body>
    </html>
  );
}
