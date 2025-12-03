import { Product, Variant } from "@/types";
import { Image } from "antd";
import useProductDetail from "../store";
import { useMemo, useState, useEffect } from "react";
import clsx from "clsx";

export default function ProductImage({
  product,
  variants,
}: {
  product: Product;
  variants: Variant[];
}) {
  const currentVariant = useProductDetail((state) => state.currentVariant);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Combine all images from product and all variants
  const allImages = useMemo(() => {
    const images: { url: string; source: "product" | "variant"; variantId?: number }[] = [];

    // Add product images
    product.blobs?.forEach((blob) => {
      if (blob?.url) {
        images.push({ url: blob.url, source: "product" });
      }
    });

    // Add variant images (avoid duplicates with product images)
    variants.forEach((variant) => {
      variant.blobs?.forEach((blob) => {
        if (blob?.url && !images.some((img) => img.url === blob.url)) {
          images.push({ url: blob.url, source: "variant", variantId: variant.id });
        }
      });
    });

    return images;
  }, [product, variants]);

  // When variant changes, jump to that variant's first image
  useEffect(() => {
    if (currentVariant && currentVariant.blobs?.length > 0) {
      const variantFirstImageUrl = currentVariant.blobs[0]?.url;
      if (variantFirstImageUrl) {
        const imageIndex = allImages.findIndex((img) => img.url === variantFirstImageUrl);
        if (imageIndex >= 0) {
          setSelectedImageIndex(imageIndex);
        }
      }
    }
  }, [currentVariant, allImages]);

  const imagesSrc = allImages.map((img) => img.url);
  const mainImage = imagesSrc[selectedImageIndex] || imagesSrc[0];
  const thumbnailImages = imagesSrc.filter((_, index) => index !== selectedImageIndex).slice(0, 4);

  return (
    <Image.PreviewGroup>
      <div className="flex w-full md:w-[44%] aspect-square bg-white rounded-lg flex-col md:flex-row gap-1 md:gap-2">
        <div className="flex-1 rounded-lg flex items-center justify-center overflow-hidden aspect-square md:aspect-auto">
          <Image
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover"
            preview={{
              mask: "Xem ảnh",
            }}
            rootClassName="w-full h-full"
          />
        </div>

        <div className="flex flex-row md:flex-col gap-1 md:gap-2 justify-start">
          {thumbnailImages.map((image) => {
            const actualIndex = imagesSrc.indexOf(image);
            return (
              <div
                key={image}
                className={clsx(
                  "cursor-pointer w-16 md:w-20 aspect-square rounded-lg transition-all overflow-hidden border-2",
                  {
                    "border-red-500": actualIndex === selectedImageIndex,
                    "border-transparent hover:border-gray-300": actualIndex !== selectedImageIndex,
                  }
                )}
                onClick={() => setSelectedImageIndex(actualIndex)}
              >
                <Image
                  src={image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  rootClassName="w-full h-full"
                  preview={{
                    mask: "Xem",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            );
          })}
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
