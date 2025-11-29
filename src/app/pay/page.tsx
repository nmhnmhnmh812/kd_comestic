import PayScreen from "@/modules/pay";
import { Suspense } from "react";
import { Spin } from "antd";

function PayLoading() {
  return (
    <div className="flex justify-center items-center py-20">
      <Spin size="large" tip="Đang tải..." />
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={<PayLoading />}>
      <PayScreen />
    </Suspense>
  );
}
