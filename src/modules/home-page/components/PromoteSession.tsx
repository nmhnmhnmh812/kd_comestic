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
        "bg-white flex flex-col md:flex-row rounded-lg overflow-hidden mx-4 md:mx-0",
        reverse && "md:flex-row-reverse"
      )}
    >
      <div className="flex flex-col w-full md:w-1/4 md:max-w-[222px]">
        <div className="h-10 md:h-12 uppercase bg-black text-white font-bold flex items-center px-4 text-xs md:text-sm">
          <span>{category?.name}</span>
        </div>
        <div className="hidden md:block flex-1 relative min-h-[200px]">
          <Image alt="" src={banner3} fill />
        </div>
      </div>
      <div className="flex-1">
        <div
          className={clsx(
            "flex flex-col md:flex-row justify-between items-start md:items-center h-auto md:h-12 px-4 py-2 md:py-0 bg-gray-200 gap-2",
            reverse && "md:flex-row-reverse"
          )}
        >
          <div className="flex gap-2 md:gap-4 flex-wrap overflow-x-auto w-full md:w-auto">
            {!isFetching ? (
              category?.subCategories?.map((sub, index) => (
                <Link
                  key={sub?.id + index}
                  href={`/danh-muc/${convertToUrl(
                    category?.name,
                    category?.id
                  )}/${convertToUrl(sub?.name, sub?.id)}`}
                  className="uppercase text-gray-600 hover:text-black hover:font-bold transition-all text-[10px] md:text-xs whitespace-nowrap"
                >
                  {sub.name}
                </Link>
              ))
            ) : (
              <span className="text-xs">Loading...</span>
            )}
          </div>
          <Link
            href={`/danh-muc/${convertToUrl(category?.name, category?.id)}`}
            className="text-red-600 font-bold text-[10px] md:text-xs uppercase whitespace-nowrap"
          >
            Xem thêm
          </Link>
        </div>

        <div
          className={clsx("p-2 min-h-[400px] md:min-h-[616px] min-w-[80%]", {
            "flex flex-col justify-center items-center w-full": isFetching,
            "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 auto-rows-fr": !isFetching,
          })}
        >
          {!isFetching ? (
            products?.map((product) => (
              <div key={product.id} className="h-full min-h-[200px] md:min-h-[250px]">
                <Product {...product} />
              </div>
            ))
          ) : (
            <Spin />
          )}
        </div>
      </div>
    </div>
  );
}
