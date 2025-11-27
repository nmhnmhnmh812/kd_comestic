"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product";
import { Product, ResponseApi } from "@/types";
import { Spin, message } from "antd";
import Link from "next/link";
import Image from "next/image";
import { convertToUrl, convertToVnd } from "@/utils";

export default function HotProducts() {
  const { data: products, isFetching } = useQuery<Product[] | undefined>({
    queryKey: ["hot-products"],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getProducts({
        page: 0,
        size: 5,
        sort: ["buyCount,desc"],
      });
      if (error) {
        message.error(error || "Đã có lỗi xảy ra");
        return undefined;
      }
      return data?.result?.content || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  if (!products?.length && !isFetching) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-lg mb-4 text-gray-800">Sản phẩm nổi bật</h3>
      <div className="flex flex-col gap-4">
        {!isFetching ? (
          products?.map((product) => {
            const url = convertToUrl(product.name, product.id);
            const imageUrl = product.blobs?.[0]?.url;

            return (
              <Link
                key={product.id}
                href={`/${url}`}
                className="flex gap-3 group"
              >
                <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border border-gray-100">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-semibold text-xs">
                      {convertToVnd(product.finalPrice)}
                    </span>
                    {product.price !== product.finalPrice && (
                      <span className="text-gray-400 text-[10px] line-through">
                        {convertToVnd(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="flex justify-center py-4">
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
}
