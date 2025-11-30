import { ENDPOINTS, getCart } from "@/api/cart";
import { CartItem } from "@/types";
import { getDisplayPrice } from "@/utils/cartUtils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useCart() {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setCartId(localStorage.getItem("cart_id"));
    }
  }, []);

  const { data, isFetching, refetch } = useQuery({
    queryKey: [ENDPOINTS.CART, cartId],
    queryFn: async () => {
      const response = await getCart(cartId!);
      return response.data;
    },
    enabled: !!cartId,
    select: (data) => data.result.cartItems,
    staleTime: 0,
    retryOnMount: true,
  });

  const totalAmount =
    data?.reduce((acc: number, item: CartItem) => {
      return acc + getDisplayPrice(item) * item.quantity;
    }, 0) || 0;

  return { cartItems: data, isFetching, refetch, cartId, totalAmount };
}
