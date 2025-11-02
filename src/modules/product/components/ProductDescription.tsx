import { Product } from "@/types";

export default function ProductDescription({ product }: { product: Product }) {
  return (
    <div className="bg-white p-5 rounded-lg">
      <div className="max-w-none">
        <h3 className="text-lg font-bold mb-3">Giới thiệu sản phẩm</h3>
        {product.description}
      </div>
    </div>
  );
}
