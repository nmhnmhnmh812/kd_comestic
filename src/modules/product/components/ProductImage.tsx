import { Product } from "@/types";
import { Image } from "antd";
import useProductDetail from "../store";

export default function ProductImage({ product }: { product: Product }) {
  const currentVariant = useProductDetail((state) => state.currentVariant);
  const imagesSrc =
    (currentVariant || product)?.blobs?.map((blob) => blob?.url) || [];

  return (
    <Image.PreviewGroup>
      <div className="flex w-full md:w-[44%] aspect-square bg-white rounded-lg flex-col md:flex-row gap-1 md:gap-2">
        <div className="flex-1 rounded-lg flex items-center justify-center overflow-hidden aspect-square md:aspect-auto">
          <Image
            src={imagesSrc[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            preview={{
              mask: "Xem ảnh",
            }}
            rootClassName="w-full h-full"
          />
        </div>

        <div className="flex flex-row md:flex-col gap-1 md:gap-2 justify-start">
          {imagesSrc.slice(1, 5).map((image) => (
            <div
              key={image}
              className={
                "cursor-pointer w-16 md:w-20 aspect-square rounded-lg transition-all overflow-hidden"
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
      <div style={{ display: "none" }}>
        {imagesSrc.slice(5).map((image) => (
          <Image key={image} src={image} alt={product.name} />
        ))}
      </div>
    </Image.PreviewGroup>
  );
}
