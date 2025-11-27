import { Divider } from "antd";
import { Order } from "@/types";
import { convertToVnd } from "@/utils";

interface OrderSummaryProps {
  order: Order;
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <>
      {/* Customer Info */}
      <div className="mb-6">
        <h3 className="text-base font-bold mb-3">Thông tin khách hàng</h3>
        <p className="text-sm mb-1">
          <span className="text-gray-600">Tên:</span> {order.userName}
        </p>
        <p className="text-sm mb-1">
          <span className="text-gray-600">SĐT:</span> {order.phoneNumber}
        </p>
        <p className="text-sm">
          <span className="text-gray-600">Địa chỉ:</span> {order.address}
        </p>
      </div>

      <Divider />

      {/* Order Total */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Tiền hàng:</span>
          <span>
            {convertToVnd(order.totalProductAmount - order.shipAmount)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Phí ship:</span>
          <span>{convertToVnd(order.shipAmount)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-red-600 pt-2 border-t">
          <span>Thành tiền:</span>
          <span>{convertToVnd(order.totalAmountFinal)}</span>
        </div>
      </div>
    </>
  );
}
