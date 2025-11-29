"use client";

import { Product } from "@/types";
import DOMPurify from "dompurify";
import { useMemo } from "react";

export default function ProductDescription({ product }: { product: Product }) {
  // Sanitize HTML to prevent XSS attacks
  const sanitizedDescription = useMemo(() => {
    if (typeof window === "undefined") {
      // Server-side: return raw HTML (will be sanitized on client)
      return product?.description || "";
    }
    // Client-side: sanitize HTML
    return DOMPurify.sanitize(product?.description || "", {
      ALLOWED_TAGS: [
        "p",
        "br",
        "strong",
        "em",
        "u",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "a",
        "img",
        "div",
        "span",
        "table",
        "tr",
        "td",
        "th",
        "thead",
        "tbody",
        "blockquote",
        "code",
        "pre",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "style", "target"],
      ALLOW_DATA_ATTR: false,
    });
  }, [product?.description]);

  return (
    <div className="bg-white p-3 md:p-5 rounded-lg">
      <div className="max-w-none">
        <h3 className="text-base md:text-lg font-bold mb-3">
          Giới thiệu sản phẩm
        </h3>
        {sanitizedDescription ? (
          <div
            className="text-sm md:text-base prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        ) : (
          <p className="text-gray-500 text-sm">Chưa có mô tả sản phẩm</p>
        )}
      </div>
    </div>
  );
}
