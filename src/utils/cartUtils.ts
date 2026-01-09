import { CartItem } from "@/types";
import { convertToOriginalPrice } from ".";

/**
 * Get display name for cart item
 * Returns variant name appended to product name if variant exists, otherwise just product name
 */
export const getDisplayName = (item: CartItem): string => {
  if (item.variant) {
    return `${item.product?.name} - ${item.variant.name}`;
  }
  return item.product?.name || "";
};

/**
 * Get display image URL for cart item
 * Returns variant's image if exists and has images, otherwise falls back to product image
 */
export const getDisplayImage = (item: CartItem): string => {
  if (item.variant && item.variant.blobs && item.variant.blobs.length > 0) {
    return item.variant.blobs[0].url;
  }
  return item.product?.blobs?.[0]?.url || "";
};

/**
 * Get display price for cart item
 * Returns variant price if exists, otherwise product's finalPrice
 */
export const getDisplayPrice = (item: CartItem): number => {
  if (item.variant) {
    return item?.variant?.finalPrice;
  }
  return item.product?.finalPrice || 0;
};

/**
 * Get original price for cart item (before discount)
 * Returns calculated original price from variant's price and discount if variant exists,
 * otherwise returns product's original price
 */
export const getOriginalPrice = (item: CartItem): number => {
  if (item.variant) {
    return convertToOriginalPrice(
      item.variant.finalPrice,
      item.variant.discount
    );
  }
  return item.product?.finalPrice || 0;
};
