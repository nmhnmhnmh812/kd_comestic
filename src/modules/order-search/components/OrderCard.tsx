"use client";

import { Tag, Divider, Collapse } from "antd";
import { UserOrder } from "@/types";
import { convertToVnd } from "@/utils";
import Image from "next/image";

interface OrderCardProps {
  order: UserOrder;
}

const getStatusTag = (status: string) => {
  const statusMap: Record<string, { color: string; text: string }> = {
    WAITING_CONFIRMATION: { color: "orange", text: "Chờ xác nhận" },
    CONFIRMED: { color: "blue", text: "Đã xác nhận" },
    SHIPPING: { color: "cyan", text: "Đang giao" },
    DELIVERED: { color: "purple", text: "Đã giao hàng" },
    FINISHED: { color: "green", text: "Hoàn thành" },
    RETURNED: { color: "volcano", text: "Đã trả hàng" },
    CANCELED: { color: "red", text: "Đã hủy" },
  };
  const statusInfo = statusMap[status] || { color: "default", text: status };
  return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
};

const getPaymentStatusTag = (status: string) => {
  const statusMap: Record<string, { color: string; text: string }> = {
    NOT_YET: { color: "orange", text: "Chưa thanh toán" },
    COMPLETED: { color: "green", text: "Đã thanh toán" },
    FAILED: { color: "red", text: "Thanh toán thất bại" },
  };
  const statusInfo = statusMap[status] || { color: "default", text: status };
  return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
};

const getPaymentMethodText = (method: string) => {
  const methodMap: Record<string, string> = {
    BANK_TRANSFER: "Chuyển khoản ngân hàng",
    COD: "Thanh toán khi nhận hàng",
  };
  return methodMap[method] || method;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Order Header */}
      <div className="px-4 py-3 bg-gray-50 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-700">
            Đơn hàng #{order.id}
          </span>
          {getStatusTag(order.status)}
        </div>
        <span className="text-sm text-gray-500">
          {formatDate(order.createdAt)}
        </span>
      </div>

      <div className="p-4">
        {/* Customer Info */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Thông tin người nhận
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium">Họ tên:</span> {order.userName}
            </p>
            <p>
              <span className="font-medium">Số điện thoại:</span>{" "}
              {order.phoneNumber}
            </p>
            <p>
              <span className="font-medium">Địa chỉ:</span> {order.address}
            </p>
            {order.note && (
              <p>
                <span className="font-medium">Ghi chú:</span> {order.note}
              </p>
            )}
          </div>
        </div>

        <Divider className="my-3" />

        {/* Payment Info */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Thông tin thanh toán
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="flex items-center gap-2">
              <span className="font-medium">Phương thức:</span>{" "}
              {getPaymentMethodText(order.payment.paymentMethod)}
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium">Trạng thái:</span>{" "}
              {getPaymentStatusTag(order.payment.paymentStatus)}
            </p>
            {order.payment.transferCode && (
              <p>
                <span className="font-medium">Mã chuyển khoản:</span>{" "}
                {order.payment.transferCode}
              </p>
            )}
          </div>
        </div>

        <Divider className="my-3" />

        {/* Order Items */}
        <Collapse
          ghost
          items={[
            {
              key: "1",
              label: (
                <span className="font-semibold text-gray-700">
                  Sản phẩm ({order.orderItems.length})
                </span>
              ),
              children: (
                <div className="space-y-3">
                  {order.orderItems.map((item) => {
                    const imageUrl =
                      item.variant?.blobs?.[0]?.url ||
                      item.product?.blobs?.[0]?.url ||
                      "/placeholder.jpg";
                    const productName = item.variant?.name
                      ? `${item.product.name} - ${item.variant.name}`
                      : item.product.name;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                      >
                        <Image
                          src={imageUrl}
                          alt={productName}
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2">
                            {productName}
                          </p>
                          <p className="text-sm text-gray-500">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-600">
                            {convertToVnd(item.finalPrice * item.quantity)}
                          </p>
                          {item.discount > 0 && (
                            <p className="text-xs text-gray-400 line-through">
                              {convertToVnd(item.price * item.quantity)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ),
            },
          ]}
        />

        <Divider className="my-3" />

        {/* Order Total */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Tạm tính:</span>
            <span>{convertToVnd(order.totalProductAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phí vận chuyển:</span>
            <span>{convertToVnd(order.shipAmount)}</span>
          </div>
          <div className="flex justify-between font-bold text-base">
            <span>Tổng cộng:</span>
            <span className="text-red-600">
              {convertToVnd(order.totalAmountFinal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
