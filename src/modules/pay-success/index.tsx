"use client";

import { useEffect, useState } from "react";
import { Spin, Result } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { getOrderDetail } from "@/api/order";
import { Order } from "@/types";
import OrderStatus from "./components/OrderStatus";
import OrderSummary from "./components/OrderSummary";
import ActionButtons from "./components/ActionButtons";
import HelpSection from "./components/HelpSection";
import { BUY_NOW_KEY } from "@/constants";

interface PaySuccessScreenProps {
  orderId: string;
}

export default function PaySuccessScreen({ orderId }: PaySuccessScreenProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Clear buy-now item on success page load
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(BUY_NOW_KEY);
    }

    const fetchOrder = async () => {
      try {
        if (!orderId) {
          setError("Không tìm thấy mã đơn hàng");
          setLoading(false);
          return;
        }

        const response = await getOrderDetail(orderId);
        if (response?.data?.result) {
          setOrder(response.data.result as Order);
        } else {
          setError("Không thể lấy thông tin đơn hàng");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi lấy thông tin đơn hàng");
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin size="large" tip="Đang tải thông tin đơn hàng..." />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Result
          status="error"
          title="Có lỗi xảy ra"
          subTitle={error || "Không thể lấy thông tin đơn hàng"}
          extra={[
            <Link key="home" href="/">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <HomeOutlined className="mr-2" /> Về trang chủ
              </button>
            </Link>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Header */}
        <OrderStatus order={order} />

        {/* Order Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <OrderSummary order={order} />
        </div>

        {/* Action Buttons */}
        <ActionButtons />

        {/* Help Section */}
        <HelpSection />
      </div>
    </div>
  );
}
