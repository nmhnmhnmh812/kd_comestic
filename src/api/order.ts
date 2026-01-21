import baseAxios from ".";

export const ENDPOINTS = {
  CHECK_ORDER_INFO: "/orders/check-order-info",
  CREATE_ORDER: "/orders/create-order",
  ORDERS: "/orders",
  GET_USER_ORDERS: "/orders/get-user-orders",
};

type CheckOrderInfoParams = {
  orderItems: {
    productId: number;
    variantId: number;
    quantity: number;
  }[];
  province: string;
  couponCode?: string;
};

export async function checkOrderInfo(params: CheckOrderInfoParams) {
  return await baseAxios.post(ENDPOINTS.CHECK_ORDER_INFO, params);
}

type CreateOrderParams = {
  userId: number;
  userName: string;
  address: string;
  phoneNumber: string;
  note: string;
  orderItems: [
    {
      productId: number;
      variantId: number;
      quantity: number;
    },
  ];
  totalProductAmount: number;
  shipAmount: number;
  totalAmountFinal: number;
  paymentMethod: string;
  couponCode?: string;
};
export async function createOrder(params: CreateOrderParams) {
  return await baseAxios.post(ENDPOINTS.CREATE_ORDER, params);
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
