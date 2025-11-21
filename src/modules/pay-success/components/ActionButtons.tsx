import Link from "next/link";
import { HomeOutlined, ShoppingOutlined } from "@ant-design/icons";

export default function ActionButtons() {
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      <Link href="/">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2">
          <HomeOutlined /> Về trang chủ
        </button>
      </Link>
      <Link href="/danh-muc">
        <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold flex items-center gap-2">
          <ShoppingOutlined /> Tiếp tục mua sắm
        </button>
      </Link>
    </div>
  );
}