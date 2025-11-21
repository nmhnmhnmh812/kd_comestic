import { Order } from "@/types";

interface CustomerInfoProps {
  order: Order;
}

export default function CustomerInfo({ order }: CustomerInfoProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold mb-3">Thông tin khách hàng</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Tên khách hàng</p>
          <p className="font-semibold">{order.customerName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Số điện thoại</p>
          <p className="font-semibold">{order.phoneNumber}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-600">Địa chỉ giao hàng</p>
          <p className="font-semibold">{order.address}</p>
        </div>
      </div>
    </div>
  );
}
