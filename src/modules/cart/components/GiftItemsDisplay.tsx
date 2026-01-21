"use client";

import { GiftItem } from "@/types";
import { convertToUrl, convertToVnd } from "@/utils";
import Link from "next/link";
import React from "react";

interface GiftItemsDisplayProps {
  giftItems: GiftItem[];
}

export default function GiftItemsDisplay({ giftItems }: GiftItemsDisplayProps) {
  return (
    <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 shadow-sm animate-fade-in">
      <h3 className="font-bold text-rose-700 mb-4 flex items-center gap-2 text-base uppercase tracking-wide">
        <span className="text-xl">🎁</span> Quà tặng của bạn
      </h3>
      <div className="flex flex-col gap-3">
        {giftItems.map((gift) => {
          const activeItem = gift.variant || gift.product;

          let imageUrl =
            gift.variant?.blobs?.[0]?.url || gift.product.blobs?.[0]?.url;

          if (imageUrl && !imageUrl.startsWith("http")) {
            const baseUrl =
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:8989";
            const cleanBase = baseUrl.endsWith("/")
              ? baseUrl.slice(0, -1)
              : baseUrl;
            const cleanPath = imageUrl.startsWith("/")
              ? imageUrl
              : `/${imageUrl}`;
            imageUrl = `${cleanBase}${cleanPath}`;
          }

          if (!imageUrl) imageUrl = "https://placehold.co/50";

          const productUrl = `/${convertToUrl(
            gift.product.name,
            gift.product.id,
          )}`;

          return (
            <Link
              href={productUrl}
              key={gift.id}
              className="group block w-full no-underline"
            >
              <div className="flex gap-4 items-start bg-white p-3 rounded-lg border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-200">
                {/* Image */}
                <div className="relative w-16 h-16 flex-shrink-0 border border-gray-100 rounded-md overflow-hidden bg-gray-50">
                  <img
                    src={imageUrl}
                    alt={activeItem.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/50";
                    }}
                  />
                  <div className="absolute bottom-0 right-0 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-tl-md font-bold leading-none shadow-sm z-10">
                    x{gift.giftQuantity}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between min-w-0 h-16 py-0.5">
                  <div>
                    <div
                      className="text-sm text-gray-800 font-bold line-clamp-1 group-hover:text-rose-600 transition-colors"
                      title={activeItem.name}
                    >
                      {activeItem.name}
                    </div>

                    {/* Reason / Promotion Name */}
                    <div className="text-xs text-rose-600 font-medium truncate mt-0.5 flex items-center gap-1">
                      <span>🎉</span>
                      <span>{gift.giftPromotionName}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-xs text-gray-500 truncate max-w-[60%]">
                      {gift.variant
                        ? `Phân loại: ${gift.variant.name}`
                        : gift.product.name}
                    </div>
                    <span className="text-[10px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full shadow-sm">
                      MIỄN PHÍ
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
