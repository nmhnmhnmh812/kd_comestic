"use client";

import useCart from "@/hooks/useCart";
import { Button, Divider } from "antd";
import PayItems from "./PayItems";
import { convertToVnd } from "@/utils";

export default function CartInfo() {
  const { cartItems, isFetching, totalAmount } = useCart();
  return (
    <div className="bg-white rounded w-full lg:w-96">
      <div className="px-3 md:px-4 py-3">
        <h3 className="font-bold text-sm md:text-base">Danh sách sản phẩm</h3>
      </div>
      <Divider className="m-0" />
      <PayItems cartItems={cartItems} loading={isFetching} />
      <Divider className="m-0" />
      <div className="px-3 md:px-4 py-3 flex flex-col gap-2">
        <div className="text-sm md:text-base">
          <span>Tạm tính:</span>
          <span className="float-right font-bold">
            {convertToVnd(totalAmount)}
          </span>
        </div>
        <div className="text-sm md:text-base">
          <span>Phí vận chuyển:</span>
          <span className="float-right font-bold">0đ</span>
        </div>
        <div className="text-sm md:text-base">
          <span>Tổng cộng:</span>
          <span className="float-right font-bold text-red-600">
            {convertToVnd(totalAmount)}
          </span>
        </div>
        <Button type="primary" size="large" className="bg-red-600">
          Thanh toán
        </Button>
      </div>
    </div>
  );
}
