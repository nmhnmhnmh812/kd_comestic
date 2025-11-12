"use client";

import { removeItemFromCart, updateCartItem } from "@/api/cart";
import QuantityInput from "@/components/QuantityInput";
import { CartItem, Product } from "@/types";
import { convertToVnd } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { Button, message, Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  const [updateQueue, setUpdateQueue] = React.useState<
    { cartItemId: string; quantity: number }[]
  >([]);

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
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      message.error("Xóa sản phẩm thất bại. Vui lòng thử lại.");
    },
  });

  const handleUpdate = async () => {
    if (!updateQueue.length) return;
    await Promise.all(
      updateQueue.map((item) =>
        updateCartItem(cartId, item.cartItemId, item.quantity)
      )
    );
    setUpdateQueue([]);
    refetch();
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    const existingIndex = updateQueue.findIndex(
      (item) => item.cartItemId === cartItemId
    );
    const newQueue = [...updateQueue];
    if (existingIndex !== -1) {
      newQueue[existingIndex].quantity = quantity;
    } else {
      newQueue.push({ cartItemId, quantity });
    }
    setUpdateQueue(newQueue);
  };

  // Helper function to get current quantity
  const getCurrentQuantity = (cartItemId: string, originalQuantity: number) => {
    const queueItem = updateQueue.find(
      (item) => item.cartItemId === cartItemId
    );
    return queueItem ? queueItem.quantity : originalQuantity;
  };

  const totalAmount = cartItems?.reduce((total, item) => {
    const currentQuantity = getCurrentQuantity(item.id!, item.quantity);
    return total + item.product.finalPrice * currentQuantity;
  }, 0);

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      render: (product: Product) => (
        <Link href={`/abcd.${product.id}`} className="flex items-center gap-2">
          <Image
            src={product.blobs[0].url}
            alt={product.name}
            width={40}
            height={40}
          />
          <p>{product.name}</p>
        </Link>
      ),
    },
    {
      title: "Giá",
      dataIndex: ["product", "finalPrice"],
      render: (price: number) => convertToVnd(price),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (quantity: number, record: CartItem) => {
        const currentQuantity = getCurrentQuantity(record.id!, quantity);
        return (
          <QuantityInput
            value={currentQuantity}
            size="small"
            onChange={(value) => updateQuantity(record.id!, value)}
          />
        );
      },
    },
    {
      title: "Thành tiền",
      render: (_: any, record: CartItem) => {
        const currentQuantity = getCurrentQuantity(record.id!, record.quantity);
        return convertToVnd(record.product.finalPrice * currentQuantity);
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (_: any, record: CartItem) => (
        <a
          onClick={() =>
            removeItem({ cartId: cartId!, cartItemId: record.id! })
          }
          className="text-red-600"
        >
          Xóa
        </a>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        loading={loading}
        dataSource={cartItems}
        rowKey="id"
        pagination={false}
      />
      <div className="flex gap-4 items-center justify-end">
        <h1 className="font-bold">Tổng tiền: {convertToVnd(totalAmount)}</h1>
        <Link href="/pay">
          <Button
            type="primary"
            size="large"
            className="bg-red-600"
            onClick={handleUpdate}
          >
            Thanh toán
          </Button>
        </Link>
      </div>
    </>
  );
}
