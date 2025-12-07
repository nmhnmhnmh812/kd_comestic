"use client";

import { Form, message, Spin } from "antd";
import PayInfo from "./components/PayInfo";
import TransferInfo from "./components/TranferInfo";
import CartInfo from "./components/CartInfo";
import { checkOrderInfo } from "@/api/order";
import useCart from "@/hooks/useCart";
import useBuyNow from "@/hooks/useBuyNow";
import usePayment from "./store";
import { useState, useCallback } from "react";

export default function PayScreen() {
  const [form] = Form.useForm();
  const { cartItems, totalAmount: cartTotalAmount } = useCart();
  const {
    buyNowAsCartItem,
    buyNowTotalAmount,
    isBuyNow,
    clearBuyNow,
    loading: buyNowLoading,
  } = useBuyNow();
  const updateAmount = usePayment((state) => state.updateAmount);

  const activeItems = isBuyNow ? buyNowAsCartItem : cartItems;
  const activeTotalAmount = isBuyNow ? buyNowTotalAmount : cartTotalAmount;

  const getShipFee = useCallback(
    async (province: string) => {
      const orderItems =
        activeItems?.map((item) => ({
          productId: item?.product?.id || undefined,
          variantId: item?.variant?.id || undefined,
          quantity: item?.quantity,
        })) || [];
      try {
        const response = await checkOrderInfo({
          orderItems,
          province,
        });
        const { shipAmount, totalAmountFinal, totalProductAmount } =
          response.data.result;
        updateAmount({ shipAmount, totalAmountFinal, totalProductAmount });
      } catch (error: any) {
        message.error(error.error);
      }
    },
    [activeItems, form, updateAmount]
  );

  // Show loading while fetching buy-now product data
  if (buyNowLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" tip="Đang tải thông tin sản phẩm..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-3 md:gap-4 py-3 md:py-4">
      <Form
        form={form}
        layout="vertical"
        className="flex flex-1 flex-col gap-3 md:gap-4"
      >
        <PayInfo getShipFee={getShipFee} />
        <TransferInfo />
      </Form>
      <CartInfo
        form={form}
        getShipFee={getShipFee}
        cartItems={activeItems}
        totalAmount={activeTotalAmount}
        isBuyNow={isBuyNow}
        clearBuyNow={clearBuyNow}
      />
    </div>
  );
}
