import { Product, Variant } from "@/types";
import { Image } from "antd";
import useProductDetail from "../store";
import { useMemo, useState, useEffect } from "react";

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
    const images: {
      url: string;
      source: "product" | "variant";
      variantId?: number;
    }[] = [];

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
          images.push({
            url: blob.url,
            source: "variant",
            variantId: variant.id,
          });
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
        const imageIndex = allImages.findIndex(
          (img) => img.url === variantFirstImageUrl
        );
        if (imageIndex >= 0) {
          setSelectedImageIndex(imageIndex);
        }
      }
    }
  }, [currentVariant, allImages]);

  const imagesSrc = allImages.map((img) => img.url);
  const mainImage = imagesSrc[selectedImageIndex] || imagesSrc[0];
  // Show thumbnails excluding the currently selected main image
  const thumbnailImages = imagesSrc
    .filter((_, index) => index !== selectedImageIndex)
    .slice(0, 4);

  return (
    <Image.PreviewGroup>
      <div className="grid w-full min-w-0 md:w-1/2 md:max-w-[520px] md:flex-none aspect-square grid-cols-1 grid-rows-[minmax(0,1fr)_auto] md:grid-cols-[minmax(0,1fr)_5rem] md:grid-rows-1 gap-1 md:gap-2 bg-white rounded-lg overflow-hidden">
        <div className="relative w-full h-full min-w-0 min-h-0 rounded-lg bg-white flex items-center justify-center overflow-hidden">
          <Image
            src={mainImage}
            alt={product.name}
            width="100%"
            height="100%"
            className="!block !w-full !h-full !object-contain"
            preview={{
              mask: "Xem ảnh",
            }}
            rootClassName="!block !w-full !h-full"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <div className="flex min-w-0 flex-row md:flex-col gap-1 md:gap-2 justify-start overflow-hidden">
          {thumbnailImages.map((image) => {
            const actualIndex = imagesSrc.indexOf(image);
            return (
              <div
                key={image}
                className="relative cursor-pointer w-16 h-16 md:w-20 md:h-20 flex-none aspect-square rounded-lg transition-all overflow-hidden border-2 border-transparent hover:border-gray-300"
                onClick={() => setSelectedImageIndex(actualIndex)}
              >
                <Image
                  src={image}
                  alt={product.name}
                  width="100%"
                  height="100%"
                  className="!block !w-full !h-full !object-contain"
                  rootClassName="!block !w-full !h-full"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  preview={false}
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
