"use client";

import { checkGiftPromotions } from "@/api/giftPromotion";
import { CartItem, GiftItem } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useGiftPromotions(
  cartItems: CartItem[],
  orderTotal: number,
  enabled: boolean = true,
) {
  const { data: giftItems, refetch } = useQuery({
    queryKey: ["gift-promotions", cartItems, orderTotal],
    queryFn: async () => {
      const response = await checkGiftPromotions({
        orderItems: cartItems.map((item) => ({
          productId: item.product.id,
          variantId: item.variant?.id,
          quantity: item.quantity,
        })),
        orderTotal,
      });
      return response.data as GiftItem[];
    },
    enabled: enabled && cartItems.length > 0 && orderTotal > 0,
    staleTime: 30000, // Cache for 30 seconds
  });

  return {
    giftItems: giftItems || [],
    refetchGifts: refetch,
  };
}
