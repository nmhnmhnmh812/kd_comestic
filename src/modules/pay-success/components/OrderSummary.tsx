import { Divider } from "antd";
import { Order } from "@/types";
import { convertToVnd } from "@/utils";
import { getStatusLabel } from "../utils";
import OrderItems from "./OrderItems";

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

      <OrderItems order={order} />

      <Divider />

      {/* Order Total */}
      {/* Order Total */}
      {(() => {
        // Attempt to calculate Original Price from items
        // Schema assumes item.price is ORIGINAL price, item.finalPrice is SOLD price.
        // Fallback: If item.finalPrice missing, assume item.price is SOLD price (no Product Discount).
        const totalOriginalPrice = order.orderItems.reduce((sum, item) => {
          const originalPrice = item.price; // Assuming this is original
          return sum + originalPrice * item.quantity;
        }, 0);

        const totalProductAmount = order.totalProductAmount;

        // If product discount exists (Original > Sold Total)
        // Note: This relies on backend returning 'price' as Original.
        // If backend returns 'price' as Final, this will be 0.
        const productDiscount = Math.max(
          0,
          totalOriginalPrice - totalProductAmount,
        );

        const couponDiscount =
          totalProductAmount + order.shipAmount - order.totalAmountFinal;

        const totalSavings = productDiscount + couponDiscount;

        return (
          <div className="space-y-2">
            {productDiscount > 0 ? (
              <>
                <div className="flex justify-between text-sm">
                  <span>Tổng tiền hàng:</span>
                  <span>{convertToVnd(totalOriginalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Phí vận chuyển:</span>
                  <span>{convertToVnd(order.shipAmount)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Giảm giá sản phẩm:</span>
                  <span>-{convertToVnd(productDiscount)}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-sm">
                  <span>Tổng tiền hàng:</span>
                  <span>{convertToVnd(totalProductAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Phí vận chuyển:</span>
                  <span>{convertToVnd(order.shipAmount)}</span>
                </div>
              </>
            )}

            {couponDiscount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Voucher giảm giá:</span>
                <span>-{convertToVnd(couponDiscount)}</span>
              </div>
            )}

            {totalSavings > 0 && (
              <div className="flex justify-between text-red-600 font-medium border-t border-dashed pt-2 mt-2">
                <span>Tiết kiệm được:</span>
                <span>{convertToVnd(totalSavings)}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-bold text-red-600 pt-2 border-t mt-2">
              <span>Tổng cộng:</span>
              <span>{convertToVnd(order.totalAmountFinal)}</span>
            </div>
          </div>
        );
      })()}
    </>
  );
}
