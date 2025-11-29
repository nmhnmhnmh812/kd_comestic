import { BUY_NOW_KEY } from "@/constants";
import { BuyNowItem, CartItem } from "@/types";
import { useEffect, useState } from "react";

export default function useBuyNow() {
  const [buyNowItem, setBuyNowItem] = useState<BuyNowItem | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const item = localStorage.getItem(BUY_NOW_KEY);
      if (item) {
        try {
          setBuyNowItem(JSON.parse(item));
        } catch {
          setBuyNowItem(null);
        }
      }
    }
  }, []);

  const clearBuyNow = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(BUY_NOW_KEY);
      setBuyNowItem(null);
    }
  };

  // Convert buy-now item to cart item format for compatibility with existing components
  const buyNowAsCartItem: CartItem[] | null = buyNowItem
    ? [
        {
          id: `buy-now-${buyNowItem.product.id}`,
          product: buyNowItem.product,
          variant: buyNowItem.variant,
          quantity: buyNowItem.quantity,
        },
      ]
    : null;

  // Calculate total amount for buy-now item
  // Use variant price if variant exists, otherwise use product's finalPrice
  const buyNowTotalAmount = buyNowItem
    ? (buyNowItem.variant?.price ?? buyNowItem.product.finalPrice) * buyNowItem.quantity
    : 0;

  return {
    buyNowItem,
    buyNowAsCartItem,
    buyNowTotalAmount,
    clearBuyNow,
    isBuyNow: !!buyNowItem,
  };
}
