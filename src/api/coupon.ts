import baseAxios from ".";

export const ENDPOINTS = {
  VALIDATE: "/api/public/coupon/validate",
  ACTIVE: "/api/public/coupon/active",
};

export interface ValidateCouponRequest {
  code: string;
  orderTotal: number;
}

export async function validateCoupon(request: ValidateCouponRequest) {
  return await baseAxios.post(ENDPOINTS.VALIDATE, request);
}

export async function getActiveCoupons() {
  return await baseAxios.get(ENDPOINTS.ACTIVE);
}
