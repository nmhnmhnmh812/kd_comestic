"use client";

import { Form, message, Spin } from "antd";
import PayInfo from "./components/PayInfo";
import TransferInfo from "./components/TranferInfo";
import CartInfo from "./components/CartInfo";
import { checkOrderInfo } from "@/api/order";
import useCart from "@/hooks/useCart";
import useBuyNow from "@/hooks/useBuyNow";
import usePayment from "./store";
import { useGiftPromotions } from "@/hooks/useGiftPromotions";
import GiftItemsDisplay from "../cart/components/GiftItemsDisplay";
import { useMemo, useState, useCallback, useEffect } from "react";
import CouponModal from "../cart/components/CouponModal";
import { useCoupon } from "@/hooks/useCoupon";
import { convertToVnd } from "@/utils";

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
  const couponCode = usePayment((state) => state.couponCode);
  const discountAmount = usePayment((state) => state.discountAmount);
  const setCoupon = usePayment((state) => state.setCoupon);

  const [couponModalVisible, setCouponModalVisible] = useState(false);

  const {
    activeCoupons,
    handleApplyCoupon: applyCouponValidation,
    appliedCoupon,
    setAppliedCoupon,
    setCouponDiscount,
  } = useCoupon();

  const activeItems = isBuyNow ? buyNowAsCartItem : cartItems;
  const activeTotalAmount = isBuyNow ? buyNowTotalAmount : cartTotalAmount;

  // Calculate final total to check for gifts
  const finalTotal = useMemo(() => {
    return Math.max(0, (activeTotalAmount || 0) - discountAmount);
  }, [activeTotalAmount, discountAmount]);

  // Gift promotions
  const { giftItems } = useGiftPromotions(
    activeItems || [],
    finalTotal,
    (activeItems?.length || 0) > 0,
  );

  // Initialize local coupon state from store if available
  useState(() => {
    if (couponCode && discountAmount) {
      // Logic to restore appliedCoupon object could go here if we had full object in store
      // For now we trust the discount amount and code.
      setCouponDiscount(discountAmount);
      // setAppliedCoupon(...) -> complicated without full object,
      // but CouponModal needs 'appliedCoupon'.
      // For 'Shopee style', we might just need to pass the ID or Code to modal.
      // Let's rely on finding it in activeCoupons list later or fetch logic.
    }
  });

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
          couponCode: couponCode || undefined,
        });
        const { shipAmount, totalAmountFinal, totalProductAmount } =
          response.data.result;
        updateAmount({ shipAmount, totalAmountFinal, totalProductAmount });
      } catch (error: any) {
        message.error(error.error);
      }
    },
    [activeItems, form, updateAmount, couponCode],
  );

  // Re-calculate order info when coupon changes
  useEffect(() => {
    // Identify if we have province already to trigger calc
    const province = form.getFieldValue("province");
    if (province) {
      getShipFee(province);
    }
  }, [couponCode, getShipFee, form]);

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

        {/* Coupon Section directly in PayScreen */}
        <div className="bg-white p-4 rounded shadow">
          <div
            className="flex items-center justify-between"
            onClick={() => setCouponModalVisible(true)}
          >
            <div className="flex items-center gap-2">
              <span className="text-orange-500 font-bold text-lg">🎫</span>
              <span className="font-semibold text-gray-700">KD Voucher</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              {couponCode ? (
                <div className="flex flex-col items-end">
                  <span className="text-green-600 font-medium text-sm">
                    Đã chọn 1 voucher
                  </span>
                  <span className="text-xs text-gray-500">
                    Giảm {convertToVnd(discountAmount)}
                  </span>
                </div>
              ) : (
                <span className="text-blue-600 text-sm hover:underline">
                  Chọn hoặc nhập mã
                </span>
              )}
              <span className="text-gray-400">❯</span>
            </div>
          </div>
        </div>

        {/* Gift Items Display */}
        {giftItems && giftItems.length > 0 && (
          <GiftItemsDisplay giftItems={giftItems} />
        )}

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

      {/* Coupon Modal */}
      <CouponModal
        visible={couponModalVisible}
        onClose={() => setCouponModalVisible(false)}
        activeCoupons={activeCoupons}
        currentTotal={activeTotalAmount || 0}
        onApply={(coupon) => {
          // Update local useCoupon state
          setAppliedCoupon(coupon);
          setCouponDiscount(coupon.discountAmount);
          // Update global store
          setCoupon(coupon.code, coupon.discountAmount);

          // Re-validate logic if needed (e.g. backend validation)
          applyCouponValidation(coupon.code, activeTotalAmount);
        }}
        appliedCoupon={
          appliedCoupon ||
          activeCoupons.find((c) => c.code === couponCode) ||
          null
        }
      />
    </div>
  );
}
