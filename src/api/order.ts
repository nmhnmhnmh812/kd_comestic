import baseAxios from ".";
import { Product, Variant } from "@/types";

export const ENDPOINTS = {
  CHECK_ORDER_INFO: "/orders/check-order-info",
  CREATE_ORDER: "/orders/create-order",
  ORDERS: "/orders",
  GET_USER_ORDERS: "/orders/get-user-orders",
};

export type OrderPreview = {
  shipAmount: number;
  totalAmountFinal: number;
  totalProductAmount: number;
  giftSelectionToken: string;
  giftItems: {
    giftPromotionItemId: number;
    product: Product;
    variant?: Variant;
    quantity: number;
    giftPromotionName: string;
  }[];
};

type CheckOrderInfoParams = {
  orderItems: {
    productId: number;
    variantId?: number;
    quantity: number;
  }[];
  province: string;
  couponCode?: string;
};

export async function checkOrderInfo(params: CheckOrderInfoParams) {
  return await baseAxios.post(ENDPOINTS.CHECK_ORDER_INFO, params);
}

type CreateOrderParams = {
  userId?: number;
  userName: string;
  address: string;
  phoneNumber: string;
  note: string;
  province: string;
  district: string;
  ward: string;
  giftSelectionToken: string;
  orderItems: {
      productId: number;
      variantId?: number;
      quantity: number;
  }[];
  totalProductAmount: number;
  shipAmount: number;
  totalAmountFinal: number;
  paymentMethod: string;
  checkoutToken?: string;
  couponCode?: string;
};
export async function createOrder(params: CreateOrderParams) {
  return await baseAxios.post(ENDPOINTS.CREATE_ORDER, params);
}

export async function cancelPendingOrder(orderId: string, checkoutToken: string) {
  return baseAxios.post(`${ENDPOINTS.ORDERS}/${orderId}/cancel-pending`, null, {
    headers: { "X-Order-Token": checkoutToken },
  });
}

export async function switchPendingOrderToCod(orderId: string, checkoutToken: string) {
  return baseAxios.post(`${ENDPOINTS.ORDERS}/${orderId}/switch-to-cod`, null, {
    headers: { "X-Order-Token": checkoutToken },
  });
}

export async function getPendingCheckout(orderId: string, checkoutToken: string) {
  return baseAxios.get(`${ENDPOINTS.ORDERS}/${orderId}/pending-checkout`, {
    headers: { "X-Order-Token": checkoutToken },
  });
}

export const getOrderDetail = async (orderId: string) => {
  return baseAxios.get(`${ENDPOINTS.ORDERS}/${orderId}`);
};

// Get user orders by phone number
export const getUserOrders = async (phoneNumber: string) => {
  return baseAxios.get(ENDPOINTS.GET_USER_ORDERS, {
    params: { phoneNumber },
  });
};
