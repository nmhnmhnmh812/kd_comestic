import { IProduct } from "@/types";
import { Image } from "antd";
import { StaticImageData } from "next/image";

export default function ProductImage({ product }: { product: IProduct }) {
  const imageSrc =
    typeof product.image === "string"
      ? product.image
      : (product.image as StaticImageData).src;

  return (
    <div className="w-[44%] bg-white rounded-lg">
      <div className="flex gap-2">
        <div className="flex-1 rounded-lg flex items-center justify-center overflow-hidden">
          <Image
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-fill"
            preview={{
              mask: "Xem ảnh",
            }}
            rootClassName="w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-2 justify-between">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={
                  "cursor-pointer w-20 aspect-square rounded-lg transition-all overflow-hidden"
                }
              >
                <Image
                  src={imageSrc}
                  alt={`${product.name} - ${index + 1}`}
                  className="w-full h-full object-contain"
                  preview={{
                    mask: "Xem",
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
