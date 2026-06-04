"use client";

import banner3 from "@/assets/images/banner3.png";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { getBrands, ENDPOINTS } from "@/api/brand";
import { Brand } from "@/types";
import { convertToUrl } from "@/utils";
import { Spin } from "antd";

export default function BrandSection({ reverse = false }: { reverse?: boolean }) {
  const { data: brands, isFetching } = useQuery<Brand[]>({
    queryKey: [ENDPOINTS.SEARCH_BRANDS, "home-section"],
    queryFn: async () => {
      const { data } = await getBrands({ page: 0, size: 20, keyword: "" });
      return (data?.result?.content ?? []).filter((b: Brand) => !b.isDeleted);
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
          <span className="text-sm md:text-base">Thương hiệu</span>
        </div>
        <div className="flex-1 relative min-h-[200px] lg:min-h-0 hidden md:block">
          <Image alt="" src={banner3} fill className="object-cover" />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-end items-center h-12 px-4 bg-gray-200">
          <Link
            href="/thuong-hieu"
            className="text-red-600 font-bold text-xs md:text-sm uppercase whitespace-nowrap"
          >
            Xem thêm
          </Link>
        </div>
        <div
          className={clsx("p-4 min-h-[200px]", {
            "flex justify-center items-center": isFetching,
            "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4": !isFetching,
          })}
        >
          {isFetching ? (
            <Spin />
          ) : (
            brands?.map((brand) => (
              <Link
                key={brand.id}
                href={`/danh-muc?brand=${convertToUrl(brand.name, brand.id)}`}
                className="flex flex-col items-center gap-2 p-2 rounded-lg hover:shadow-md transition-all border border-gray-100"
              >
                {brand.image?.url ? (
                  <div className="relative w-full aspect-square">
                    <Image
                      alt={brand.name}
                      src={brand.image.url}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded">
                    <span className="text-xs text-gray-400 text-center p-1">{brand.name}</span>
                  </div>
                )}
                <span className="text-xs font-semibold text-gray-700 line-clamp-1 text-center">
                  {brand.name}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
