import { create } from "zustand";
import { getCart } from "@/api/cart";

interface CartState {
  cartCount: number;
  fetchCartCount: (cartId: string) => Promise<void>;
  setCartCount: (count: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0,
  fetchCartCount: async (cartId: string) => {
    try {
      if (!cartId) return;
      const response = await getCart(cartId);
      const cartItems = response?.data?.result?.cartItems || [];
      const count = cartItems.reduce(
        (acc: number, item: any) => acc + item.quantity,
        0
      );
      set({ cartCount: count });
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  },
  setCartCount: (count: number) => set({ cartCount: count }),
}));
