import QuantityInput from "@/components/QuantityInput";
import { Product, Variant } from "@/types";
import {
  calculateDiscountPercent,
  convertToOriginalPrice,
  convertToUrl,
  convertToVnd,
} from "@/utils";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import ProductVarients from "./ProductVarients";
import useProductDetail from "../store";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { addItemToCart } from "@/api/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BUY_NOW_KEY } from "@/constants";

// Type guard to check if the item is a Product (has finalPrice) or Variant
const isProductType = (item: Product | Variant): item is Product => {
  return "finalPrice" in item;
};

export default function ProductInformation({
  product,
  variants,
}: {
  product: Product;
  variants: Variant[];
}) {
  const [quantity, setQuantity] = React.useState(1);
  const currentVariant = useProductDetail((state) => state.currentVariant);
  const router = useRouter();

  const currentProduct = currentVariant || product;

  const displayPrice = isProductType(currentProduct)
    ? currentProduct.finalPrice
    : currentProduct.price;
  const originalPrice = isProductType(currentProduct)
    ? currentProduct.price
    : convertToOriginalPrice(currentProduct.price, currentProduct.discount);

  const discountPercent = calculateDiscountPercent(
    originalPrice,
    currentProduct.discount
  );

  const hasRealVariants = variants.length > 0 && variants[0]?.id !== product.id;

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
    // Require variant selection if product has variants
    if (hasRealVariants && !currentVariant) {
      message.warning("Vui lòng chọn phân loại sản phẩm");
      return;
    }

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

  const buyNow = () => {
    // Require variant selection if product has variants
    if (hasRealVariants && !currentVariant) {
      message.warning("Vui lòng chọn phân loại sản phẩm");
      return;
    }

    // Save buy-now item to localStorage for backup
    const buyNowItem = {
      product,
      variant: currentVariant,
      quantity,
    };
    localStorage.setItem(BUY_NOW_KEY, JSON.stringify(buyNowItem));
    
    // Build URL with query parameters for persistence
    const params = new URLSearchParams();
    params.set("productId", product.id.toString());
    if (currentVariant) {
      params.set("variantId", currentVariant.id.toString());
    }
    params.set("quantity", quantity.toString());
    params.set("buyNow", "true");
    
    // Navigate to payment page with query params
    router.push(`/pay?${params.toString()}`);
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
          Giá: {convertToVnd(displayPrice)}
        </span>{" "}
        <span className="text-xs md:text-sm">(Đã bao gồm VAT)</span>
      </p>
      <p className="text-sm md:text-base">
        Giá gốc: {convertToVnd(originalPrice)} - Tiết kiệm:{" "}
        {convertToVnd(currentProduct.discount)}{" "}
        <span className="text-red-600">{`(${discountPercent}%)`}</span>
      </p>
      <div className="flex flex-col gap-2 md:gap-3">
        <p className="text-sm md:text-base">Phân loại:</p>
        <ProductVarients variants={variants} />
      </div>
      <div className="flex gap-2 md:gap-3 items-center">
        <span className="text-sm md:text-base">Số lượng: </span>
        <QuantityInput onChange={setQuantity} />
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
          onClick={buyNow}
        >
          <span className="text-xs sm:text-sm md:text-base">Mua ngay</span>
        </Button>
      </div>
    </div>
  );
}
