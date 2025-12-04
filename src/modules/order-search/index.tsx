"use client";

import { useState } from "react";
import { Input, Button, Empty, Spin, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getUserOrders } from "@/api/order";
import { UserOrder } from "@/types";
import OrderCard from "./components/OrderCard";

export default function OrderSearchScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!phoneNumber.trim()) {
      message.warning("Vui lòng nhập số điện thoại");
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const response = await getUserOrders(phoneNumber.trim());
      if (response?.data?.result) {
        setOrders(response.data.result);
      } else {
        setOrders([]);
      }
    } catch (error: any) {
      message.error(error?.error || "Có lỗi xảy ra khi tìm kiếm đơn hàng");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4 md:py-6">
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">
          Tra cứu đơn hàng
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Nhập số điện thoại đặt hàng để tra cứu thông tin đơn hàng của bạn
        </p>
        <div className="max-w-md mx-auto flex gap-2">
          <Input
            size="large"
            placeholder="Nhập số điện thoại"
            prefix={<SearchOutlined className="text-gray-400" />}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Button
            type="primary"
            size="large"
            className="bg-red-600"
            onClick={handleSearch}
            loading={loading}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spin size="large" tip="Đang tìm kiếm đơn hàng..." />
        </div>
      ) : searched && orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Empty
            description={
              <span className="text-gray-500">
                Không tìm thấy đơn hàng nào với số điện thoại này
              </span>
            }
          />
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Tìm thấy {orders.length} đơn hàng
          </h2>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
