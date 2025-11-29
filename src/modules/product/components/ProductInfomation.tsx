import QuantityInput from "@/components/QuantityInput";
import { Product, Variant } from "@/types";
import { convertToOriginalPrice, convertToUrl, convertToVnd } from "@/utils";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import ProductVarients from "./ProductVarients";
import useProductDetail from "../store";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { addItemToCart } from "@/api/cart";
import Link from "next/link";

export default function ProductInformation({
  product,
  variants,
}: {
  product: Product;
  variants: Variant[];
}) {
  const [quantity, setQuantity] = React.useState(1);
  const currentVariant = useProductDetail((state) => state.currentVariant);
  const currentProduct = currentVariant || product;
  const originalPrice = convertToOriginalPrice(
    currentProduct.price,
    currentProduct.discount
  );
  const { mutate, isPending } = useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      message.success("Đã thêm vào giỏ hàng");
    },
    onError: () => {
      message.error("Thêm vào giỏ hàng thất bại. Vui lòng thử lại.");
    },
  });
  const addToCart = () => {
    const cartId = localStorage.getItem("cart_id");
    const productId = product.id;
    const variantId = currentVariant?.id;
    const params = {
      cartId,
      productId,
      variantId,
      quantity,
    };
    mutate(params);
  };
  return (
    <div className="flex-1 flex flex-col justify-between gap-2 md:gap-3">
      <h2 className="text-base md:text-lg font-semibold text-red-600 uppercase">
        <Link
          href={`/danh-muc?brand=${convertToUrl(
            product.brand.name,
            product.brand.id
          )}`}
        >
          {product.brand.name}
        </Link>
      </h2>
      <h1 className="text-lg md:text-xl font-bold text-gray-800">
        {currentProduct.name}
      </h1>
      <p className="text-xs md:text-sm">Mã sản phẩm: {currentProduct.id}</p>
      <p>
        <span className="text-red-600 font-bold text-base md:text-lg">
          Giá: {convertToVnd(currentProduct.price)}
        </span>{" "}
        <span className="text-xs md:text-sm">(Đã bao gồm VAT)</span>
      </p>
      <p className="text-sm md:text-base">
        Giá gốc: {convertToVnd(originalPrice)} - Tiết kiệm:{" "}
        {convertToVnd(originalPrice - currentProduct.price)}{" "}
        <span className="text-red-600">{`(${currentProduct.discount}%)`}</span>
      </p>
      <div className="flex flex-col gap-2 md:gap-3">
        <p className="text-sm md:text-base">Phân loại:</p>
        <ProductVarients variants={variants} />
      </div>
      <div className="flex gap-2 md:gap-3 items-center">
        <span className="text-sm md:text-base">Số lượng: </span>
        <QuantityInput value={quantity} onChange={setQuantity} />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
        <Button
          color="default"
          size="large"
          variant="solid"
          className="w-full"
          icon={<ShoppingCartOutlined />}
          loading={isPending}
          onClick={addToCart}
        >
          <span className="text-xs sm:text-sm md:text-base">
            Thêm vào giỏ hàng
          </span>
        </Button>
        <Button
          color="danger"
          variant="solid"
          size="large"
          className="w-full"
          icon={<ShoppingOutlined />}
        >
          <span className="text-xs sm:text-sm md:text-base">Mua ngay</span>
        </Button>
      </div>
    </div>
  );
}
