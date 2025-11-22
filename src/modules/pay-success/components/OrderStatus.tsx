import { CheckCircleOutlined } from "@ant-design/icons";
import { Order } from "@/types";

interface OrderStatusProps {
  order: Order;
}

export default function OrderStatus({ order }: OrderStatusProps) {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
        <CheckCircleOutlined className="text-4xl text-green-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Đặt hàng thành công!
      </h1>
      <p className="text-gray-600 text-lg">
        Mã đơn hàng: <span className="font-bold">{order.id}</span>
      </p>
      <p className="text-gray-600 mt-1">
        Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.
      </p>
    </div>
  );
}
