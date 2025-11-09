import { IProduct } from "@/types";
import ProductInformation from "./ProductInfomation";
import ProductImage from "./ProductImage";

export default function ProductDetail({ product }: { product: IProduct }) {
  return (
    <div className="bg-white p-3 sm:p-5 rounded-lg flex flex-col md:flex-row gap-3 sm:gap-5">
      <ProductImage product={product} />
      <ProductInformation product={product} />
    </div>
  );
}
