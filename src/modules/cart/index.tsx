"use client";

import { useCoupon } from "@/hooks/useCoupon";
import { useGiftPromotions } from "@/hooks/useGiftPromotions";
import useCart from "@/hooks/useCart";
import CartTable from "./components/CartTable";
// import CouponSection from "./components/CouponSection";
import GiftItemsDisplay from "./components/GiftItemsDisplay";
import CouponModal from "./components/CouponModal";
import PurchaseSuggestion from "./components/PurchaseSuggestion";
import CartSummary from "./components/CartSummary";
import { useMemo, useState, useEffect } from "react";
import { convertToVnd } from "@/utils";
import usePayment from "../pay/store";
import { getOriginalPrice } from "@/utils/cartUtils";

export default function CartScreen() {
  const { cartId, cartItems, isFetching, refetch, totalAmount } = useCart();

  // Coupon management
  const { appliedCoupon, couponDiscount, handleApplyCoupon, activeCoupons } =
    useCoupon();

  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const setCoupon = usePayment((state) => state.setCoupon);

  // Sync with payment store when coupon is applied locally
  useEffect(() => {
    if (appliedCoupon) {
      setCoupon(appliedCoupon.code, appliedCoupon.discountAmount);
    } else {
      setCoupon("", 0);
    }
  }, [appliedCoupon, setCoupon]);

  // Auto-apply best coupon
  useEffect(() => {
    if (
      !appliedCoupon &&
      activeCoupons.length > 0 &&
      totalAmount &&
      totalAmount > 0
    ) {
      // Find eligible coupons
      const eligible = activeCoupons.filter(
        (c) => totalAmount >= c.minOrderAmount,
      );

      if (eligible.length > 0) {
        // Sort by discount amount (desc)
        const best = eligible.sort(
          (a, b) => b.discountAmount - a.discountAmount,
        )[0];
        if (best) {
          handleApplyCoupon(best.code, totalAmount, true);
        }
      }
    }
  }, [activeCoupons, totalAmount, appliedCoupon, handleApplyCoupon]);

  // Calculate final total after coupon
  const finalTotal = useMemo(() => {
    return Math.max(0, (totalAmount || 0) - couponDiscount);
  }, [totalAmount, couponDiscount]);

  const totalOriginalPrice = useMemo(() => {
    return (
      cartItems?.reduce((total, item) => {
        return total + getOriginalPrice(item) * (item.quantity || 0);
      }, 0) || 0
    );
  }, [cartItems]);

  const productDiscountTotal = useMemo(() => {
    return Math.max(0, totalOriginalPrice - (totalAmount || 0));
  }, [totalOriginalPrice, totalAmount]);

  // Gift promotions
  const { giftItems } = useGiftPromotions(
    cartItems || [],
    finalTotal,
    (cartItems?.length || 0) > 0,
  );

  // Calculate suggested amount to reach coupon minimum
  const suggestedAmount = useMemo(() => {
    if (appliedCoupon || !totalAmount) return 0;
    // This would ideally come from active coupons API
    // For now, return 0
    return 0;
  }, [appliedCoupon, totalAmount]);

  return (
    <div className="flex flex-col gap-3 md:gap-4 py-3 md:py-4">
      <h1 className="font-bold text-base md:text-lg">
        Giỏ hàng ({cartItems?.length || 0} sản phẩm)
      </h1>

      {/* Cart Items Table */}
      <CartTable
        cartItems={cartItems}
        loading={isFetching}
        cartId={cartId}
        refetch={refetch}
      />

      {/* Coupon Section */}
      {cartItems && cartItems.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 font-bold text-lg">🎫</span>
            <span className="font-semibold text-gray-700">KD Voucher</span>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCouponModalVisible(true)}
          >
            {appliedCoupon ? (
              <div className="flex flex-col items-end">
                <span className="text-green-600 font-medium text-sm">
                  Đã chọn 1 voucher
                </span>
                <span className="text-xs text-gray-500">
                  Giảm {convertToVnd(couponDiscount)}
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
      )}

      {/* Coupon Modal */}
      <CouponModal
        visible={couponModalVisible}
        onClose={() => setCouponModalVisible(false)}
        activeCoupons={activeCoupons}
        currentTotal={totalAmount || 0}
        onApply={(coupon) => {
          handleApplyCoupon(coupon.code, totalAmount || 0);
        }}
        appliedCoupon={appliedCoupon}
      />

      {/* Purchase Suggestion */}
      {suggestedAmount > 0 && (
        <PurchaseSuggestion suggestedAmount={suggestedAmount} />
      )}

      {/* Gift Items Display */}
      {giftItems && giftItems.length > 0 && (
        <GiftItemsDisplay giftItems={giftItems} />
      )}

      {/* Cart Summary */}
      {cartItems && cartItems.length > 0 && (
        <CartSummary
          subtotal={totalAmount || 0}
          couponDiscount={couponDiscount}
          appliedCoupon={appliedCoupon}
          finalTotal={finalTotal}
          originalTotal={totalOriginalPrice}
          productDiscount={productDiscountTotal}
          loading={isFetching}
        />
      )}
    </div>
  );
}
