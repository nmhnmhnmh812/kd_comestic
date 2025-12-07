"use client";

import { Product } from "@/types";
import { sanitizedDescription } from "@/utils";

export default function ProductDescription({ product }: { product: Product }) {
  // Sanitize HTML to prevent XSS attacks
  const sanitizedDescriptionContent = sanitizedDescription(
    product?.description || ""
  );

  return (
    <div className="bg-white p-3 md:p-5 rounded-lg">
      <div className="max-w-none">
        <h3 className="text-base md:text-lg font-bold mb-3">
          Giới thiệu sản phẩm
        </h3>
        {sanitizedDescriptionContent ? (
          <div
            className="text-sm md:text-base prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedDescriptionContent }}
          />
        ) : (
          <p className="text-gray-500 text-sm">Chưa có mô tả sản phẩm</p>
        )}
      </div>
    </div>
  );
}
