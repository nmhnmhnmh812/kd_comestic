import { IProduct } from "@/types";
import ProductInformation from "./ProductInfomation";
import ProductImage from "./ProductImage";

export default function ProductDetail({ product }: { product: IProduct }) {
  return (
    <div className="bg-white p-5 rounded-lg flex gap-5">
      <ProductImage product={product} />
      <ProductInformation product={product} />
    </div>
  );
}
