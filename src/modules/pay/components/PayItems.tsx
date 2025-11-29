import { CartItem } from "@/types";
import { convertToOriginalPrice, convertToVnd } from "@/utils";
import { Spin } from "antd";
import Image from "next/image";

// Helper function to get display name for cart item (variant name if exists, otherwise product name)
const getDisplayName = (item: CartItem): string => {
  if (item.variant) {
    return `${item.product?.name} - ${item.variant.name}`;
  }
  return item.product?.name || "";
};

// Helper function to get display image for cart item (variant image if exists, otherwise product image)
const getDisplayImage = (item: CartItem): string => {
  if (item.variant && item.variant.blobs && item.variant.blobs.length > 0) {
    return item.variant.blobs[0].url;
  }
  return item.product?.blobs?.[0]?.url || "";
};

// Helper function to get display price for cart item (variant price if exists, otherwise product finalPrice)
const getDisplayPrice = (item: CartItem): number => {
  if (item.variant) {
    return item.variant.price;
  }
  return item.product?.finalPrice || 0;
};

// Helper function to get original price for cart item
const getOriginalPrice = (item: CartItem): number => {
  if (item.variant) {
    return convertToOriginalPrice(item.variant.price, item.variant.discount);
  }
  return item.product?.price || 0;
};

export default function PayItems({
  cartItems,
  loading,
}: {
  cartItems: CartItem[];
  loading: boolean;
}) {
  const originalPrice = (item: CartItem) => {
    const oldPrice = getOriginalPrice(item);
    return convertToVnd(oldPrice * (item?.quantity || 0));
  };
  return (
    <div className="px-4 py-3 flex flex-col gap-4">
      {!loading ? (
        cartItems?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4"
          >
            <Image
              src={getDisplayImage(item)}
              alt={getDisplayName(item)}
              width={80}
              height={80}
            />
            <div className="flex flex-col gap-2 flex-1">
              <span
                className="font-medium line-clamp-2"
                title={getDisplayName(item)}
              >
                {getDisplayName(item)}
              </span>
              <span>SL: {item.quantity}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-red-600">
                {convertToVnd(getDisplayPrice(item) * (item?.quantity || 0))}
              </span>
              <span className="font-bold">{originalPrice(item)}</span>
            </div>
          </div>
        ))
      ) : (
        <Spin />
      )}
    </div>
  );
}
