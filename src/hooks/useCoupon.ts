"use client";

import { validateCoupon, getActiveCoupons } from "@/api/coupon";
import { Coupon } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useState } from "react";

export function useCoupon() {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Fetch active coupons
  const { data: activeCouponsResponse, isLoading: loadingCoupons } = useQuery({
    queryKey: ["active-coupons"],
    queryFn: async () => {
      const response = await getActiveCoupons();
      return response.data as Coupon[];
    },
    staleTime: 60000, // 1 minute
  });

  const activeCoupons = activeCouponsResponse || [];

  const { mutate: validateCouponMutation, isPending } = useMutation({
    mutationFn: ({
      code,
      total,
      isSilent,
    }: {
      code: string;
      total: number;
      isSilent?: boolean;
    }) => validateCoupon({ code, orderTotal: total }),
    onSuccess: (response, variables) => {
      const coupon = response.data as Coupon;
      setAppliedCoupon(coupon);
      setCouponDiscount(coupon.discountAmount);
      if (!variables.isSilent) {
        message.success("Áp dụng mã giảm giá thành công!");
      }
    },
    onError: (error: any) => {
      // We might want to suppress errors too for auto-apply, but usually errors mean something is wrong.
      // For now, let's keep errors visible or maybe silent too if needed.
      message.error(
        error.response?.data?.message || "Mã giảm giá không hợp lệ",
      );
    },
  });

  const handleApplyCoupon = (
    code: string,
    orderTotal: number,
    isSilent: boolean = false,
  ) => {
    if (!code.trim()) {
      message.warning("Vui lòng nhập mã giảm giá");
      return;
    }
    validateCouponMutation({ code, total: orderTotal, isSilent });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode("");
    message.info("Đã xóa mã giảm giá");
  };

  return {
    couponCode,
    setCouponCode,
    appliedCoupon,
    couponDiscount,
    handleApplyCoupon,
    handleRemoveCoupon,
    validating: isPending,
    activeCoupons,
    loadingCoupons,
    setAppliedCoupon,
    setCouponDiscount,
  };
}
