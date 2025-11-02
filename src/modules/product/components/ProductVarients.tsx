import { Variant } from "@/types";
import { Image } from "antd";
import useProductDetail from "../store";
import clsx from "clsx";

export default function ProductVarients({ variants }: { variants: Variant[] }) {
  const updateVariant = useProductDetail((state) => state.updateVariant);
  const currentVariant = useProductDetail((state) => state.currentVariant);
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
          onClick={() => updateVariant(variant)}
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
