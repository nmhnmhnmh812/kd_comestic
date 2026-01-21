import baseAxios from ".";

export const ENDPOINTS = {
  CHECK: "/api/public/gift-promotion/check",
  ACTIVE: "/api/public/gift-promotion/active",
};

export interface CheckGiftRequest {
  orderItems: Array<{
    productId: number;
    variantId?: number;
    quantity: number;
  }>;
  orderTotal: number;
}

export async function checkGiftPromotions(request: CheckGiftRequest) {
  return await baseAxios.post(ENDPOINTS.CHECK, request);
}

export async function getActivePromotions() {
  return await baseAxios.get(ENDPOINTS.ACTIVE);
}
