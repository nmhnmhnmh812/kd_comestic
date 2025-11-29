import { BUY_NOW_KEY } from "@/constants";
import { BuyNowItem, CartItem } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/api/product";

export default function useBuyNow() {
  const [buyNowItem, setBuyNowItem] = useState<BuyNowItem | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  
  // Check if buy-now mode from URL params
  const isBuyNowFromUrl = searchParams.get("buyNow") === "true";
  const productIdFromUrl = searchParams.get("productId");
  const variantIdFromUrl = searchParams.get("variantId");
  const quantityFromUrl = searchParams.get("quantity");

  useEffect(() => {
    const loadBuyNowItem = async () => {
      setLoading(true);
      
      // Priority 1: Check URL parameters
      if (isBuyNowFromUrl && productIdFromUrl) {
        try {
          const { data } = await getProductById(productIdFromUrl);
          const { product, variants } = data?.result || {};
          
          if (product) {
            // Parse variantId with validation
            const parsedVariantId = variantIdFromUrl ? parseInt(variantIdFromUrl, 10) : NaN;
            const variant = !isNaN(parsedVariantId)
              ? variants?.find((v: { id: number }) => v.id === parsedVariantId)
              : null;
            
            // Parse quantity with validation, default to 1
            const parsedQuantity = quantityFromUrl ? parseInt(quantityFromUrl, 10) : 1;
            const quantity = !isNaN(parsedQuantity) && parsedQuantity > 0 ? parsedQuantity : 1;
            
            const item: BuyNowItem = {
              product,
              variant: variant || null,
              quantity,
            };
            
            setBuyNowItem(item);
            // Also save to localStorage as backup
            localStorage.setItem(BUY_NOW_KEY, JSON.stringify(item));
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("Failed to load product for buy-now:", error);
        }
      }
      
      setLoading(false);
    };

    loadBuyNowItem();
  }, [isBuyNowFromUrl, productIdFromUrl, variantIdFromUrl, quantityFromUrl]);

  const clearBuyNow = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(BUY_NOW_KEY);
      setBuyNowItem(null);
    }
  };

  // Convert buy-now item to cart item format for compatibility with existing components
  const buyNowAsCartItem: CartItem[] | null = buyNowItem
    ? [
        {
          id: `buy-now-${buyNowItem.product.id}`,
          product: buyNowItem.product,
          variant: buyNowItem.variant,
          quantity: buyNowItem.quantity,
        },
      ]
    : null;

  // Calculate total amount for buy-now item
  // Use variant price if variant exists, otherwise use product's finalPrice
  const buyNowTotalAmount = buyNowItem
    ? (buyNowItem.variant?.price ?? buyNowItem.product.finalPrice) * buyNowItem.quantity
    : 0;

  // Only return isBuyNow as true if we actually have a buyNowItem loaded
  return {
    buyNowItem,
    buyNowAsCartItem,
    buyNowTotalAmount,
    clearBuyNow,
    isBuyNow: !!buyNowItem,
    loading,
  };
}
