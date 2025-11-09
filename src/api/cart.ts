import baseAxios from ".";

export const ENDPOINTS = {
  CART: "/cart",
  ADD_ITEM: "/cart/add-item",
  REMOVE_ITEM: "/cart/remove-item",
  UPDATE_ITEM: "/cart/update-item",
};

export async function createCart() {
  return await baseAxios.post(ENDPOINTS.CART);
}

export async function addItemToCart(item) {
  return await baseAxios.post(ENDPOINTS.ADD_ITEM, item);
}

export async function getCart(cartId: string) {
  return await baseAxios.get(`${ENDPOINTS.CART}/${cartId}`);
}

export async function removeItemFromCart(cartId: string, cartItemId: string) {
  return await baseAxios.delete(ENDPOINTS.REMOVE_ITEM, {
    params: { cartId, cartItemId },
  });
}

export async function updateCartItem(
  cartId: string,
  cartItemId: string,
  quantity: number
) {
  return await baseAxios.put(ENDPOINTS.UPDATE_ITEM, {
    cartId,
    cartItemId,
    quantity,
  });
}
