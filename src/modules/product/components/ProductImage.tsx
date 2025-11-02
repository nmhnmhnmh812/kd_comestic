import { Product } from "@/types";
import { Image } from "antd";
import useProductDetail from "../store";

export default function ProductImage({ product }: { product: Product }) {
  const currentVariant = useProductDetail((state) => state.currentVariant);
  const imagesSrc = (currentVariant || product).blobs.map((blob) => blob.url);

  return (
    <div className="w-[44%] aspect-square bg-white rounded-lg flex gap-4">
      <div className="flex-1 rounded-lg flex items-center justify-center overflow-hidden">
        <Image
          src={imagesSrc[0]}
          alt={product.name}
          className="w-full h-full object-fill"
          preview={{
            mask: "Xem ảnh",
          }}
          rootClassName="w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-2 justify-between">
        {imagesSrc.slice(1, 5).map((image) => (
          <div
            key={image}
            className={
              "cursor-pointer w-20 aspect-square rounded-lg transition-all overflow-hidden"
            }
          >
            <Image
              src={image}
              alt={product.name}
              className="w-full h-full object-cover"
              rootClassName="w-full h-full"
              preview={{
                mask: "Xem",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
