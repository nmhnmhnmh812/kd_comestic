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
import { message, Spin } from "antd";
import { convertToUrl } from "@/utils";

interface PromoteSessionProps {
  categoryId: number;
  reverse?: boolean;
}

export default function PromoteSession({
  categoryId,
  reverse = false,
}: PromoteSessionProps) {
  const [pagination, setPagination] = useState({ page: 0, size: 10 });

  const { data: products, isFetching } = useQuery<any[]>({
    queryKey: [ENDPOINTS.SEARCH, categoryId, pagination],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getProducts({
        categoryId,
        ...pagination,
      });
      if (error) {
        message.error(error || "Đã có lỗi xảy ra");
      }
      return data?.result?.content || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const category = products?.[0]?.category;

  return (
    <div
      className={clsx(
        "bg-white flex flex-col lg:flex-row rounded-lg overflow-hidden",
        reverse && "lg:flex-row-reverse"
      )}
    >
      <div className="flex flex-col lg:w-1/4 lg:max-w-[222px] w-full">
        <div className="h-12 uppercase bg-black text-white font-bold flex justify-center items-center">
          <span className="text-sm md:text-base">{category?.name}</span>
        </div>
        <div className="flex-1 relative min-h-[200px] lg:min-h-0">
          <Image alt="" src={banner3} fill className="object-cover" />
        </div>
      </div>
      <div className="flex-1">
        <div
          className={clsx(
            "flex flex-col sm:flex-row justify-between items-start sm:items-center h-auto sm:h-12 px-4 py-2 sm:py-0 gap-2 sm:gap-0 bg-gray-200",
            reverse && "sm:flex-row-reverse"
          )}
        >
          <div className="flex gap-2 md:gap-4 flex-wrap">
            {!isFetching ? (
              category?.subCategories?.map((sub, index) => (
                <Link
                  key={sub?.id + index}
                  href={`/danh-muc/${convertToUrl(
                    category?.name,
                    category?.id
                  )}/${convertToUrl(sub?.name, sub?.id)}`}
                  className="uppercase text-gray-600 hover:text-black hover:font-bold transition-all text-xs md:text-sm"
                >
                  {sub.name}
                </Link>
              ))
            ) : (
              <span>Loading...</span>
            )}
          </div>
          <Link
            href={`/danh-muc/${convertToUrl(category?.name, category?.id)}`}
            className="text-red-600 font-bold text-xs md:text-sm uppercase whitespace-nowrap"
          >
            Xem thêm
          </Link>
        </div>

        <div
          className={clsx(" p-2 min-h-[400px] md:min-h-[616px] min-w-[80%]", {
            "flex flex-col justify-center items-center w-full": isFetching,
            "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2": !isFetching,
          })}
        >
          {!isFetching ? (
            products?.map((product) => (
              <Product key={product.id} {...product} />
            ))
          ) : (
            <Spin />
          )}
        </div>
      </div>
    </div>
  );
}
