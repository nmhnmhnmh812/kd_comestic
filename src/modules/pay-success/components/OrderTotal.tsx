import { Order } from "@/types";
import { convertToVnd } from "@/utils";

interface OrderTotalProps {
  order: Order;
}

export default function OrderTotal({ order }: OrderTotalProps) {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex justify-between text-gray-700">
        <span>Tạm tính:</span>
        <span>{convertToVnd(order.totalProductAmount)}</span>
      </div>
      <div className="flex justify-between text-gray-700">
        <span>Phí vận chuyển:</span>
        <span>{convertToVnd(order.shipAmount)}</span>
      </div>
      <div className="flex justify-between text-lg font-bold text-red-600 pt-3 border-t">
        <span>Tổng cộng:</span>
        <span>{convertToVnd(order.totalAmountFinal)}</span>
      </div>
    </div>
  );
}