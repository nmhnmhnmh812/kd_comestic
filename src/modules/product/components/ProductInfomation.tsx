import QuantityInput from "@/components/QuantityInput";
import { Product, Variant, GiftPromotion } from "@/types";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { addItemToCart } from "@/api/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BUY_NOW_KEY } from "@/constants";
import { useCartStore } from "@/store/useCartStore";
import { getActivePromotions } from "@/api/giftPromotion";

// Type guard to check if the item is a Product (has finalPrice) or Variant
const isProductType = (item: Product | Variant): item is Product => {
  return "finalPrice" in item;
};

export default function ProductInformation({
  product,
  variants,
  initialVariantId,
}: {
  product: Product;
  variants: Variant[];
  initialVariantId?: number;
}) {
  const [quantity, setQuantity] = React.useState(1);
  const currentVariant = useProductDetail((state) => state.currentVariant);
  const router = useRouter();

  const { data: activePromotions } = useQuery({
    queryKey: ["active-gift-promotions"],
    queryFn: async () => {
      const res = await getActivePromotions();
      return res.data as GiftPromotion[];
    },
    staleTime: 60000,
  });

  const applicablePromotions = React.useMemo(() => {
    if (!activePromotions) return [];
    return activePromotions.filter(
      (promo) =>
        promo.isActive &&
        promo.qualifyingProductIds &&
        promo.qualifyingProductIds.includes(product.id),
    );
  }, [activePromotions, product.id]);

  const currentProduct = currentVariant || product;

  const displayPrice = isProductType(currentProduct)
    ? currentProduct.finalPrice
    : currentProduct.price;
  const originalPrice = isProductType(currentProduct)
    ? currentProduct.price
    : convertToOriginalPrice(currentProduct.price, currentProduct.discount);

  const discountPercent = calculateDiscountPercent(
    originalPrice,
    currentProduct.discount,
  );

  const hasRealVariants = variants.length > 0 && variants[0]?.id !== product.id;

  const { mutate, isPending } = useMutation({
    mutationFn: addItemToCart,
    onSuccess: (_, variables) => {
      message.success("Đã thêm vào giỏ hàng");
      if (variables.cartId) {
        useCartStore.getState().fetchCartCount(variables.cartId);
      }
    },
    onError: () => {
      message.error("Thêm vào giỏ hàng thất bại. Vui lòng thử lại.");
    },
  });

  const addToCart = () => {
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
    if (hasRealVariants && !currentVariant) {
      message.warning("Vui lòng chọn phân loại sản phẩm");
      return;
    }
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
    <div className="flex-1 flex flex-col justify-between gap-2 md:gap-3 min-w-0">
      <h2 className="text-base md:text-lg font-semibold text-red-600 uppercase">
        <Link
          href={`/danh-muc?brand=${convertToUrl(
            product.brand?.name,
            product.brand?.id,
          )}`}
        >
          {product.brand?.name}
        </Link>
      </h2>
      <h1 className="text-lg md:text-xl font-bold text-gray-800 break-words">
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
        Giá gốc: {convertToVnd(originalPrice)}{" "}
        {currentProduct.discount
          ? `- Tiết kiệm: ${convertToVnd(currentProduct.discount)}`
          : ""}{" "}
        {discountPercent ? (
          <span className="text-red-600">{`(${discountPercent}%)`}</span>
        ) : null}
      </p>

      {/* Gift Promotion Section */}
      {applicablePromotions.length > 0 && (
        <div className="bg-rose-50 p-3 sm:p-4 rounded-xl border border-rose-100 mt-3 sm:mt-4 w-full animate-fade-in">
          <div className="text-rose-600 font-bold mb-3 flex items-center gap-2 text-sm sm:text-base uppercase tracking-wide">
            <span className="text-lg">🎁</span> Quà tặng độc quyền:
          </div>
          <div className="flex flex-col gap-3">
            {applicablePromotions.map((promo) => (
              <React.Fragment key={promo.id}>
                {promo.giftItems.map((gift) => {
                  const activeItem = gift.variant || gift.product;
                  const variantImage = gift.variant?.blobs?.[0]?.url;
                  const productImage = gift.product?.blobs?.[0]?.url;
                  let imageUrl = variantImage || productImage;

                  if (imageUrl && !imageUrl.startsWith("http")) {
                    const baseUrl =
                      process.env.NEXT_PUBLIC_API_URL ||
                      "http://localhost:8989";
                    const cleanBase = baseUrl.endsWith("/")
                      ? baseUrl.slice(0, -1)
                      : baseUrl;
                    const cleanPath = imageUrl.startsWith("/")
                      ? imageUrl
                      : `/${imageUrl}`;
                    imageUrl = `${cleanBase}${cleanPath}`;
                  }

                  if (!imageUrl) imageUrl = "https://placehold.co/50";

                  const productUrl = `/${convertToUrl(
                    gift.product.name,
                    gift.product.id,
                  )}`;

                  return (
                    <Link
                      href={productUrl}
                      key={gift.id}
                      className="group block w-full no-underline"
                    >
                      <div className="flex gap-3 sm:gap-4 items-start bg-white p-2 sm:p-3 rounded-lg border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-200 overflow-hidden">
                        {/* Image Container */}
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border border-gray-100 rounded-md overflow-hidden bg-gray-50">
                          <img
                            src={imageUrl}
                            alt={activeItem.name}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://placehold.co/50";
                            }}
                          />
                          <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-bl-md font-bold leading-none shadow-sm z-10">
                            x{gift.giftQuantity}
                          </div>
                        </div>

                        {/* Content Container */}
                        <div className="flex-1 flex flex-col justify-between min-w-0 h-16 sm:h-20 py-0.5">
                          <div>
                            <div
                              className="text-xs sm:text-sm text-gray-800 font-semibold line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors mb-1"
                              title={activeItem.name}
                            >
                              {activeItem.name}
                            </div>
                            {gift.variant && (
                              <div
                                className="text-[10px] sm:text-xs text-gray-500 truncate"
                                title={gift.product.name}
                              >
                                Phân loại: {gift.variant.name}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mt-auto">
                            <span className="text-[10px] sm:text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                              MIỄN PHÍ
                            </span>
                            <span className="text-[10px] text-gray-400 line-through">
                              {convertToVnd(
                                gift.variant?.price || gift.product.price,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 md:gap-3 mt-2">
        <p className="text-sm md:text-base">Phân loại:</p>
        <ProductVarients
          product={product}
          variants={variants}
          initialVariantId={initialVariantId}
        />
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
          onClick={buyNow}
        >
          <span className="text-xs sm:text-sm md:text-base">Mua ngay</span>
        </Button>
      </div>
    </div>
  );
}
