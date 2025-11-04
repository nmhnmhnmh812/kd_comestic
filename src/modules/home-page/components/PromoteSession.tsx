"use client";

import banner3 from "@/assets/images/banner3.png";
import Image from "next/image";
import Link from "next/link";
import Product from "../../../components/Product";
import clsx from "clsx";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getProducts } from "@/api/product";
import { ResponseApi } from "@/types";
import { message } from "antd";

interface PromoteSessionProps {
  categoryId: number;
  reverse?: boolean;
}

export default function PromoteSession({
  categoryId,
  reverse = false,
}: PromoteSessionProps) {
  const [pagination, setPagination] = useState({ page: 0, size: 10 });

  const { data: products } = useQuery({
    queryKey: [ENDPOINTS.SEARCH, categoryId, pagination],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getProducts({
        categoryId,
        ...pagination,
      });
      if (error) {
        message.error(error || "Đã có lỗi xảy ra");
      }
      return data;
    },
    select: (data) => data?.result?.content || [],
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  const category = products?.[0]?.category;
  console.log(products);

  return (
    <div
      className={clsx(
        "bg-white flex rounded-lg overflow-hidden",
        reverse && "flex-row-reverse"
      )}
    >
      <div className="flex flex-col w-1/4 max-w-[222px]">
        <div className="h-12 uppercase bg-black text-white font-bold flex justify-center items-center">
          <span>{category?.name}</span>
        </div>
        <div className="flex-1 relative">
          <Image alt="" src={banner3} fill />
        </div>
      </div>
      <div>
        <div
          className={clsx(
            "flex justify-between items-center h-12 px-4 bg-gray-200",
            reverse && "flex-row-reverse"
          )}
        >
          <div className="flex gap-4">
            {category?.subCategories?.map((sub, index) => (
              <Link
                key={sub?.id + index}
                href={`/danh-muc?categoryId=${categoryId}&subCategoryId=${sub?.id}`}
                className="uppercase text-gray-600 hover:text-black hover:font-bold transition-all text-sm"
              >
                {sub.name}
              </Link>
            ))}
          </div>
          <Link
            href={`/danh-muc?categoryId=${categoryId}`}
            className="text-red-600 font-bold text-sm uppercase"
          >
            Xem thêm
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-2 p-2 min-h-[616px] min-w-[80%]">
          {products?.map((product, index) => (
            <Product
              key={index}
              imageUrl={product?.blobs[0]?.url}
              brandName={product?.brand?.name}
              name={product.name}
              price={product.price}
              discountPercent={product.discount}
              id={product.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
