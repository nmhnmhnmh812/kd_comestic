import { Product } from "@/types";

export default function ProductDescription({ product }: { product: Product }) {
  return (
    <div className="bg-white p-3 md:p-5 rounded-lg">
      <div className="max-w-none">
        <h3 className="text-base md:text-lg font-bold mb-3">Giới thiệu sản phẩm</h3>
        <div className="text-sm md:text-base">{product.description}</div>
      </div>
    </div>
  );
}
