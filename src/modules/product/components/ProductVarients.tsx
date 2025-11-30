import { Variant } from "@/types";
import { Image } from "antd";
import useProductDetail from "../store";
import clsx from "clsx";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function ProductVarients({ variants }: { variants: Variant[] }) {
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(null);
  const updateVariant = useProductDetail((state) => state.updateVariant);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Memoize the variant selection handler
  const selectVariant = useCallback(
    (variant: Variant) => {
      setCurrentVariant(variant);
      updateVariant(variant);
    },
    [updateVariant]
  );

  // Initialize variant from URL or default to first variant
  useEffect(() => {
    if (variants.length > 0) {
      const variantIdFromUrl = searchParams.get("variant");
      if (variantIdFromUrl) {
        const variantFromUrl = variants.find(
          (v) => v.id === parseInt(variantIdFromUrl, 10)
        );
        if (variantFromUrl) {
          selectVariant(variantFromUrl);
          return;
        }
      }
      // Default to first variant if no URL param or invalid variant ID
      selectVariant(variants[0]);
    }
  }, [variants, searchParams, selectVariant]);

  // Update URL when variant is selected
  const handleVariantSelect = (variant: Variant) => {
    selectVariant(variant);

    // Update URL with variant ID
    const params = new URLSearchParams(searchParams.toString());
    if (variant.id !== undefined && variant.id !== null) {
      params.set("variant", variant.id.toString());
    } else {
      params.delete("variant");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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
