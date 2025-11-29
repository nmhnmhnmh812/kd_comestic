import { Variant } from "@/types";
import { Image } from "antd";
import useProductDetail from "../store";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function ProductVarients({ variants }: { variants: Variant[] }) {
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(null);
  const updateVariant = useProductDetail((state) => state.updateVariant);

  useEffect(() => {
    if (variants.length > 0 && !currentVariant) {
      setCurrentVariant(variants[0]);
      updateVariant(variants[0]);
    }
  }, [variants]);

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
          onClick={() => {
            setCurrentVariant(variant);
            updateVariant(variant);
          }}
        >
          <Image
            src={variant.blobs[0].url}
            alt={variant.name}
            width={28}
            height={28}
          />
          <p className="text-sm line-clamp-1">{variant.name}</p>
        </div>
      ))}
    </div>
  );
}
