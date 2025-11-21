import { Product, Variant } from "@/types";
import ProductInformation from "./ProductInfomation";
import ProductImage from "./ProductImage";

export default function ProductDetail({
  product,
  variants,
}: {
  product: Product;
  variants: Variant[];
}) {
  return (
    <div className="bg-white p-3 md:p-5 rounded-lg flex flex-col md:flex-row gap-3 md:gap-5">
      <ProductImage product={product} />
      <ProductInformation product={product} variants={variants} />
    </div>
  );
}
