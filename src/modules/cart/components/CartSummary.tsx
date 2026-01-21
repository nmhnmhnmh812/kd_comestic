"use client";

import { Coupon } from "@/types";
import { convertToVnd } from "@/utils";
import { Button, Skeleton } from "antd";
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
  couponDiscount: number;
  appliedCoupon: Coupon | null;
  finalTotal: number;
  originalTotal?: number;
  productDiscount?: number;
  loading?: boolean;
}

export default function CartSummary({
  subtotal,
  couponDiscount,
  appliedCoupon,
  finalTotal,
  originalTotal = 0,
  productDiscount = 0,
  loading = false,
}: CartSummaryProps) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-4">
          <Skeleton active paragraph={{ rows: 3 }} />
          <Skeleton.Button
            active
            block
            size="large"
            className="!h-12 !rounded-lg"
          />
        </div>
      </div>
    );
  }

  const totalSavings = (productDiscount || 0) + couponDiscount;

  return (
    <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-5 sticky top-4">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3">
        Thông tin đơn hàng
      </h3>

      <div className="flex flex-col gap-3">
        {originalTotal > subtotal ? (
          <>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Tổng tiền hàng</span>
              <span className="font-medium text-gray-900">
                {convertToVnd(originalTotal)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Giảm giá trực tiếp</span>
              <span className="font-medium text-green-600">
                -{convertToVnd(productDiscount)}
              </span>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Tổng tiền hàng</span>
            <span className="font-medium text-gray-900">
              {convertToVnd(subtotal)}
            </span>
          </div>
        )}

        {couponDiscount > 0 && appliedCoupon && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 flex items-center gap-1">
              Voucher{" "}
              <span className="text-xs bg-red-50 text-red-600 px-1 rounded border border-red-100 font-bold">
                {appliedCoupon.code}
              </span>
            </span>
            <span className="font-medium text-green-600">
              -{convertToVnd(couponDiscount)}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gray-50 my-1"></div>

        {totalSavings > 0 && (
          <div className="flex justify-between items-center text-sm bg-red-50 p-2 rounded-lg border border-red-100">
            <span className="text-red-600 font-medium">Tiết kiệm được</span>
            <span className="text-red-700 font-bold">
              {convertToVnd(totalSavings)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-end mt-2">
          <span className="text-base font-bold text-gray-800">Tổng cộng</span>
          <div className="text-right flex flex-col items-end">
            <span className="text-2xl font-bold text-red-600 leading-none">
              {convertToVnd(finalTotal)}
            </span>
            <span className="text-[10px] text-gray-400 mt-1 font-medium">
              (Đã bao gồm VAT nếu có)
            </span>
          </div>
        </div>
      </div>

      <Link href="/pay" className="block w-full">
        <Button
          type="primary"
          size="large"
          className="!bg-red-600 hover:!bg-red-700 !h-12 !rounded-lg !text-sm !font-bold !uppercase !tracking-wider w-full shadow-lg shadow-red-200"
          style={{ border: "none" }}
        >
          TIẾN HÀNH THANH TOÁN
        </Button>
      </Link>
    </div>
  );
}
