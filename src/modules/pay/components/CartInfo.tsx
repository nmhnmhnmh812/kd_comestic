"use client";

import { CartItem } from "@/types";
import { Button, Divider, FormInstance, message } from "antd";
import PayItems from "./PayItems";
import { convertToVnd } from "@/utils";
import { getOriginalPrice } from "@/utils/cartUtils";
import { useState } from "react";
import usePayment from "../store";
import { createOrder } from "@/api/order";
import QRmodal from "./QRmodal";

const ERROR_STATUS = [
  "PRICE_CHANGED",
  "SHIPPING_FEE_CHANGED",
  "TOTAL_AMOUNT_NOT_MATCH",
];

export default function CartInfo({
  form,
  getShipFee,
  cartItems,
  totalAmount,
  isBuyNow,
  clearBuyNow,
}: {
  form: FormInstance;
  getShipFee: (address: string) => void;
  cartItems: CartItem[] | null | undefined;
  totalAmount: number;
  isBuyNow: boolean;
  clearBuyNow: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    qrUrl: "",
    transferCode: "",
    orderId: "",
  });
  const amount = usePayment((state) => state.amount);
  const couponCode = usePayment((state) => state.couponCode);
  const discountAmount = usePayment((state) => state.discountAmount);

  const handlePay = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const params = {
        ...values,
        orderItems: cartItems?.map((item) => ({
          productId: item?.product?.id || undefined,
          variantId: item?.variant?.id || undefined,
          quantity: item?.quantity,
        })),
        ...amount,
        couponCode: couponCode || undefined, // Add coupon code to API params
      };
      const response = await createOrder(params);
      const result = response?.data?.result;

      // Clear buy-now item after successful order creation
      if (isBuyNow) {
        clearBuyNow();
      }

      if (values.paymentMethod === "COD") {
        window.location.href = `/pay-success/${response?.data?.result?.id}`;
        return;
      }
      if (ERROR_STATUS.includes(result.status)) {
        message.error(
          "Có thay đổi về giá sản phẩm hoặc phí vận chuyển. Vui lòng kiểm tra lại giỏ hàng.",
        );
        getShipFee(values.province);
        setLoading(false);
        return;
      }
      const qrUrl = result?.qrCodeUrl;
      const transferCode = result?.payment?.transferCode;
      setModal({
        visible: true,
        qrUrl,
        transferCode,
        orderId: result?.id,
      });
    } catch {
      message.error("Có lỗi xảy ra khi kiểm tra thông tin đơn hàng.");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 sticky top-4 w-full lg:w-96 flex flex-col gap-5">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {isBuyNow ? "Sản phẩm mua ngay" : "Danh sách sản phẩm"}
        </h3>
      </div>

      {/* Scrollable list if too long */}
      <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
        <PayItems cartItems={cartItems || []} loading={false} />
      </div>

      <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
        {(() => {
          const totalOriginalAmount = (cartItems || []).reduce(
            (total, item) => {
              return total + getOriginalPrice(item) * (item?.quantity || 0);
            },
            0,
          );
          const productDiscount = totalOriginalAmount - totalAmount;
          const totalSavings = productDiscount + discountAmount;

          return (
            <>
              {productDiscount > 0 ? (
                <>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Tổng tiền hàng</span>
                    <span className="font-medium text-gray-900">
                      {convertToVnd(totalOriginalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Phí vận chuyển</span>
                    <span className="font-medium text-gray-900">
                      {convertToVnd(amount.shipAmount)}
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
                <>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Tổng tiền hàng</span>
                    <span className="font-medium text-gray-900">
                      {convertToVnd(totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Phí vận chuyển</span>
                    <span className="font-medium text-gray-900">
                      {convertToVnd(amount.shipAmount)}
                    </span>
                  </div>
                </>
              )}

              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-1">
                    Voucher{" "}
                    <span className="text-xs bg-red-50 text-red-600 px-1 rounded border border-red-100 font-bold">
                      {couponCode}
                    </span>
                  </span>
                  <span className="font-medium text-green-600">
                    -{convertToVnd(discountAmount)}
                  </span>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-gray-50 my-1"></div>

              {totalSavings > 0 && (
                <div className="flex justify-between items-center text-sm bg-red-50 p-2 rounded-lg border border-red-100">
                  <span className="text-red-600 font-medium">
                    Tiết kiệm được
                  </span>
                  <span className="text-red-700 font-bold">
                    {convertToVnd(totalSavings)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-end mt-2">
                <span className="text-base font-bold text-gray-800">
                  Tổng cộng
                </span>
                <div className="text-right flex flex-col items-end">
                  <span className="text-2xl font-bold text-red-600 leading-none">
                    {convertToVnd(
                      Math.max(
                        0,
                        totalAmount + amount.shipAmount - discountAmount,
                      ),
                    )}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-1 font-medium">
                    (Đã bao gồm VAT nếu có)
                  </span>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      <Button
        type="primary"
        size="large"
        className="!bg-red-600 hover:!bg-red-700 !h-12 !rounded-lg !text-sm !font-bold !uppercase !tracking-wider w-full shadow-lg shadow-red-200"
        style={{ border: "none" }}
        loading={loading}
        onClick={handlePay}
      >
        ĐẶT HÀNG NGAY
      </Button>

      <QRmodal
        onClose={() => {
          if (isBuyNow) {
            clearBuyNow();
          }
          setModal({
            visible: false,
            qrUrl: "",
            transferCode: "",
            orderId: "",
          });
        }}
        visible={modal.visible}
        qrCodeUrl={modal.qrUrl}
        transferCode={modal.transferCode}
        orderId={modal.orderId}
      />
    </div>
  );
}
