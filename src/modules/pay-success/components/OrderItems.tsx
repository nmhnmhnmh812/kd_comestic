"use client";

import { Empty } from "antd";
import { Order } from "@/types";
import { convertToVnd } from "@/utils";

interface OrderItemsProps {
  order: Order;
}

export default function OrderItems({ order }: OrderItemsProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3">Sản phẩm đã đặt</h3>
      {order.orderItems && order.orderItems.length > 0 ? (
        <div className="space-y-3">
          {order.orderItems.map((item: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded"
            >
              <div className="flex-1">
                <p className="font-semibold">{item.productName}</p>
                <p className="text-sm text-gray-600">
                  Số lượng: {item.quantity}
                </p>
              </div>
              <p className="font-bold text-red-600">
                {convertToVnd(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <Empty description="Không có sản phẩm" />
      )}
    </div>
  );
}