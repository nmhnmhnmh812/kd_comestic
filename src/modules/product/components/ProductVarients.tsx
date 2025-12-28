import { Product, Variant } from "@/types";
import { Image } from "antd";
import useProductDetail from "../store";
import clsx from "clsx";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { convertToUrl } from "@/utils";

export default function ProductVarients({
  product,
  variants,
  initialVariantId,
}: {
  product: Product;
  variants: Variant[];
  initialVariantId?: number;
}) {
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(null);
  const updateVariant = useProductDetail((state) => state.updateVariant);
  const router = useRouter();

  // Memoize the variant selection handler
  const selectVariant = useCallback(
    (variant: Variant) => {
      setCurrentVariant(variant);
      updateVariant(variant);
    },
    [updateVariant]
  );

  // Initialize variant from URL (initialVariantId)
  useEffect(() => {
    if (variants.length > 0 && initialVariantId !== undefined) {
      const variantFromUrl = variants.find((v) => v.id === initialVariantId);
      if (variantFromUrl) {
        selectVariant(variantFromUrl);
      }
    }
  }, [variants, initialVariantId, selectVariant]);

  // Build URL with product and variant in path format: /product-name.123/variant-name.456
  const buildVariantUrl = (variant: Variant): string => {
    const productSlug = convertToUrl(product.name, product.id);
    // Only include variant in URL if it has a valid ID
    if (variant.id !== undefined && variant.id !== null) {
      const variantSlug = convertToUrl(variant.name, variant.id);
      return `/${productSlug}/${variantSlug}`;
    }
    // Return product-only URL if variant has no ID
    return `/${productSlug}`;
  };

  // Update URL when variant is selected
  const handleVariantSelect = (variant: Variant) => {
    selectVariant(variant);

    // Update URL with variant in path format
    const newUrl = buildVariantUrl(variant);
    router.replace(newUrl, { scroll: false });
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {variants.map((variant) => (
        <div
          className={clsx(
            "border border-solid rounded-lg hover:border-gray-400 cursor-pointer transition-all flex items-center p-2 gap-2",
            {
              "border-red-500": variant.id === currentVariant?.id,
            }
          )}
          key={variant.id}
          onClick={() => handleVariantSelect(variant)}
        >
          <Image
            src={variant?.blobs?.[0]?.url || ""}
            alt={variant?.name || ""}
            width={28}
            height={28}
          />
          <p className="text-sm line-clamp-1">{variant.name}</p>
        </div>
      ))}
    </div>
  );
}
