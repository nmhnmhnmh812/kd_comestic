import { Product, Variant } from "@/types";
import ProductInformation from "./ProductInfomation";
import ProductImage from "./ProductImage";

export default function ProductDetail({
  product,
  variants,
  initialVariantId,
}: {
  product: Product;
  variants: Variant[];
  initialVariantId?: number;
}) {
  return (
    <div className="bg-white p-3 md:p-5 rounded-lg flex flex-col md:flex-row gap-3 md:gap-5">
      <ProductImage product={product} variants={variants} />
      <ProductInformation
        product={product}
        variants={variants}
        initialVariantId={initialVariantId}
      />
    </div>
  );
}
