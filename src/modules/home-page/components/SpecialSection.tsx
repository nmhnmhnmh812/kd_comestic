"use client";

import banner3 from "@/assets/images/banner3.png";
import Image from "next/image";
import Link from "next/link";
import Product from "../../../components/Product";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { getTrendingProducts, getSaleProducts, ENDPOINTS } from "@/api/product";
import { ResponseApi } from "@/types";
import { Spin } from "antd";

const SECTION_CONFIG = {
  TRENDING: {
    title: "Sản phẩm hot",
    link: "/san-pham?sort=buyCount,desc",
    queryFn: () => getTrendingProducts(10),
    queryKey: "trending",
  },
  SALE: {
    title: "Đang giảm giá",
    link: "/san-pham?hasDiscount=true",
    queryFn: () => getSaleProducts(10),
    queryKey: "sale",
  },
} as const;

type SpecialSectionType = keyof typeof SECTION_CONFIG;

interface SpecialSectionProps {
  type: SpecialSectionType;
  reverse?: boolean;
}

export default function SpecialSection({ type, reverse = false }: SpecialSectionProps) {
  const config = SECTION_CONFIG[type];

  const { data: products, isFetching } = useQuery<any[]>({
    queryKey: [ENDPOINTS.SEARCH, config.queryKey],
    queryFn: async () => {
      const { data }: ResponseApi = await config.queryFn();
      return data?.result?.content || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div
      className={clsx(
        "bg-white flex flex-col lg:flex-row md:rounded-lg overflow-hidden",
        reverse && "lg:flex-row-reverse"
      )}
    >
      <div className="flex flex-col lg:w-1/4 lg:max-w-[222px] w-full">
        <div className="h-12 uppercase bg-black text-white font-bold flex justify-center items-center">
          <span className="text-sm md:text-base">{config.title}</span>
        </div>
        <div className="flex-1 relative min-h-[200px] lg:min-h-0 hidden md:block">
          <Image alt="" src={banner3} fill className="object-cover" />
        </div>
      </div>
      <div className="flex-1">
        <div
          className={clsx(
            "flex justify-end items-center h-12 px-4 bg-gray-200",
          )}
        >
          <Link
            href={config.link}
            className="text-red-600 font-bold text-xs md:text-sm uppercase whitespace-nowrap"
          >
            Xem thêm
          </Link>
        </div>

        <div
          className={clsx("p-2 min-h-[400px] md:min-h-[616px] min-w-[80%]", {
            "flex flex-col justify-center items-center w-full": isFetching,
            "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2":
              !isFetching,
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
