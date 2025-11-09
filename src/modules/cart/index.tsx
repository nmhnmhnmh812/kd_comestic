"use client";

import CartTable from "./components/CartTable";
import useCart from "@/hooks/useCart";

export default function CartScreen() {
  const { cartId, cartItems, isFetching, refetch } = useCart();

  return (
    <div className="flex flex-col gap-4 py-4">
      <h1 className="font-bold">
        Giỏ hàng ({cartItems?.length || 0} sản phẩm)
      </h1>
      <CartTable
        cartItems={cartItems}
        loading={isFetching}
        cartId={cartId}
        refetch={refetch}
      />
    </div>
  );
}
