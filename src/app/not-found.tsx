import { Empty } from "antd";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Empty description="Trang bạn tìm không tồn tại." />
      <Link href="/" className="mt-8 inline-block text-blue-500">
        Quay lại trang chủ
      </Link>
    </div>
  );
}
