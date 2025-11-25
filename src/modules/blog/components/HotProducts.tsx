"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts, ENDPOINTS as PRODUCT_ENDPOINTS } from "@/api/product";
import { Product, ResponseApi } from "@/types";
import { Button, Divider, Spin, message } from "antd";
import Link from "next/link";
import ProductCard from "@/components/Product";

export default function HotProducts() {
  const { data: products, isFetching } = useQuery<Product[] | undefined>({
    queryKey: ["hot-products"],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getProducts({
        page: 0,
        size: 2,
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

  const renderProducts = products?.length ? (
    products.map((product) => <ProductCard key={product.id} {...product} />)
  ) : (
    <p className="text-center py-10 text-gray-500 text-sm">
      Không có sản phẩm nào
    </p>
  );

  return (
    <div className="bg-white rounded-lg w-full lg:w-[220px] overflow-hidden shadow-sm">
      <h2 className="font-semibold text-sm md:text-base text-center py-2">
        Sản Phẩm Hot
      </h2>
      <Divider className="my-0" />
      <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2 p-2">
        {!isFetching ? (
          renderProducts
        ) : (
          <div className="flex justify-center py-10 col-span-full">
            <Spin />
          </div>
        )}
      </div>
      <Button
        color="default"
        variant="filled"
        className="w-full rounded-none text-xs md:text-sm"
      >
        <Link href="/danh-muc?sort=buyCount,desc">Xem tất cả</Link>
      </Button>
    </div>
  );
}
