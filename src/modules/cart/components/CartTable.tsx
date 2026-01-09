"use client";

import { removeItemFromCart, updateCartItem } from "@/api/cart";
import QuantityInput from "@/components/QuantityInput";
import { CartItem } from "@/types";
import { convertToUrl, convertToVnd } from "@/utils";
import {
  getDisplayImage,
  getDisplayName,
  getDisplayPrice,
  getOriginalPrice,
} from "@/utils/cartUtils";
import { useMutation } from "@tanstack/react-query";
import { Button, message, Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";

export default function CartTable({
  cartItems,
  loading,
  cartId,
  refetch,
}: {
  cartItems?: CartItem[];
  loading?: boolean;
  cartId?: string;
  refetch: () => void;
}) {
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>(
    cartItems || []
  );

  useEffect(() => {
    if (cartItems) {
      setLocalCartItems(cartItems);
    }
  }, [cartItems]);

  const { mutate: removeItem } = useMutation<
    any,
    unknown,
    { cartId: string; cartItemId: string }
  >({
    mutationFn: ({
      cartId,
      cartItemId,
    }: {
      cartId: string;
      cartItemId: string;
    }) => removeItemFromCart(cartId, cartItemId),
    onSuccess: (_, { cartItemId }) => {
      const find = localCartItems.find((item) => item.id === cartItemId);
      if (find) {
        const index = localCartItems.indexOf(find);
        localCartItems.splice(index, 1);
        setLocalCartItems([...localCartItems]);
        useCartStore.getState().fetchCartCount(cartId);
      }
      refetch();
    },
    onError: (error: { error: string }) => {
      message.error(error.error || "Xóa sản phẩm thất bại. Vui lòng thử lại.");
    },
  });

  const { mutate: updateItem } = useMutation<
    any,
    unknown,
    { cartId: string; cartItemId: string; quantity: number }
  >({
    mutationFn: ({
      cartId,
      cartItemId,
      quantity,
    }: {
      cartId: string;
      cartItemId: string;
      quantity: number;
    }) => updateCartItem(cartId, cartItemId, quantity),
    onSuccess: (_, { cartItemId, quantity }) => {
      const find = localCartItems.find((item) => item.id === cartItemId);
      if (find) {
        find.quantity = quantity;
        setLocalCartItems([...localCartItems]);
        useCartStore.getState().fetchCartCount(cartId);
      }
    },
    onError: (error: { error: string; cartItemId: string }) => {
      message.error(
        error.error || "Cập nhật số lượng thất bại. Vui lòng thử lại."
      );
      const find = localCartItems.find((item) => item.id === error.cartItemId);
      if (find) {
        find.quantity = find.quantity - 1;
        setLocalCartItems([...localCartItems]);
      }
    },
  });

  const handleUpdateQuantity = (cartItemId: string, quantity: number) => {
    updateItem({ cartId: cartId!, cartItemId, quantity });
  };

  const totalAmount = cartItems?.reduce((total, item) => {
    return total + getDisplayPrice(item) * (item?.quantity || 0);
  }, 0);

  const columns = [
    {
      title: "Sản phẩm",
      render: (_: unknown, record: CartItem) => {
        const productUrl = convertToUrl(
          record.product?.name,
          record.product?.id
        );
        const varientUrl = convertToUrl(
          record.variant?.name,
          record.variant?.id
        );
        return (
          <Link
            href={`${productUrl}${varientUrl ? `/${varientUrl}` : ""}`}
            className="flex items-center gap-2"
          >
            <Image
              src={getDisplayImage(record)}
              alt={getDisplayName(record)}
              width={40}
              height={40}
              className="rounded overflow-hidden"
            />
            <p className="text-xs md:text-sm line-clamp-2">
              {getDisplayName(record)}
            </p>
          </Link>
        );
      },
    },
    {
      title: "Giá",
      render: (_: unknown, record: CartItem) => {
        const displayPrice = getDisplayPrice(record);
        const originalPrice = getOriginalPrice(record);
        const hasDiscount = originalPrice > displayPrice;

        return (
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-semibold">
              {convertToVnd(displayPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {convertToVnd(originalPrice)}
              </span>
            )}
          </div>
        );
      },
      responsive: ["sm" as const],
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (quantity: number, record: CartItem) => {
        return (
          <QuantityInput
            value={quantity}
            size="small"
            onChange={(value) => handleUpdateQuantity(record.id!, value)}
          />
        );
      },
    },
    {
      title: "Thành tiền",
      render: (_: unknown, record: CartItem) => {
        const displayPrice = getDisplayPrice(record);
        const originalPrice = getOriginalPrice(record);
        const hasDiscount = originalPrice > displayPrice;
        const quantity = record?.quantity || 0;

        return (
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-semibold text-red-600">
              {convertToVnd(displayPrice * quantity)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {convertToVnd(originalPrice * quantity)}
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      width: 100,
      render: (_: unknown, record: CartItem) => (
        <a
          onClick={() =>
            removeItem({ cartId: cartId!, cartItemId: record.id! })
          }
          className="text-red-600 text-xs md:text-sm"
        >
          Xóa
        </a>
      ),
    },
  ];

  const totalOriginalAmount = cartItems?.reduce((total, item) => {
    return total + getOriginalPrice(item) * (item?.quantity || 0);
  }, 0);

  const totalSavings = (totalOriginalAmount || 0) - (totalAmount || 0);

  return (
    <>
      <Table
        columns={columns}
        loading={loading}
        dataSource={localCartItems}
        rowKey="id"
        pagination={false}
        scroll={{ x: 800 }}
      />
      <div className="flex flex-col gap-2 items-end mt-4">
        {totalSavings > 0 && (
          <div className="text-sm md:text-base text-gray-500">
            Tiết kiệm:{" "}
            <span className="text-red-600 font-medium">
              {convertToVnd(totalSavings)}
            </span>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center">
          <h1 className="font-bold text-base md:text-lg">
            Tổng tiền: {convertToVnd(totalAmount)}
          </h1>
          <Link href="/pay">
            <Button
              type="primary"
              size="large"
              className="bg-red-600 w-full sm:w-auto"
            >
              Thanh toán
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
