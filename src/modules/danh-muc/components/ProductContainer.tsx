"use client";

import Product from "@/components/Product";
import ProductFilter from "./ProductFilter";
import { Empty, message, Pagination, Spin } from "antd";
import { ISlug, ResponseApi } from "@/types";
import useProductList from "../store";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getProducts } from "@/api/product";
import { useState } from "react";

export default function ProductContainer({ slug }: { slug?: ISlug }) {
  const category = useProductList((state) => state.category);
  const filter = useProductList((state) => state.filter);
  const [pagination, setPagination] = useState({ page: 0, size: 20 });

  const { data, isFetching } = useQuery<
    { content: any[]; totalElements: number } | undefined
  >({
    queryKey: [ENDPOINTS.SEARCH, category.id, pagination, filter],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getProducts({
        categoryId: category.id || undefined,
        subCategoryId: category.subCategoryId || undefined,
        ...pagination,
        ...filter,
      });
      if (error) {
        message.error(error || "Đã có lỗi xảy ra");
      }
      return data?.result;
    },
    staleTime: 0,
  });

  const products = data?.content || [];
  const totalItems = data?.totalElements || 0;

  const renderPropducts = products?.length ? (
    products.map((product) => <Product key={product.id} {...product} />)
  ) : (
    <p className="text-center col-span-5 py-10">
      <Empty description="Không có sản phẩm nào" />
    </p>
  );

  return (
    <div className="w-full">
      <h1 className="text-base md:text-xl font-bold uppercase p-3 md:p-5">
        {category.title || "Danh mục"} ({totalItems} kết quả)
      </h1>
      <ProductFilter />
      {!isFetching ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">{renderPropducts}</div>
      ) : (
        <div className="flex justify-center items-center h-60">
          <Spin />
        </div>
      )}
      <div className="p-4">
        <Pagination
          align="end"
          current={pagination.page + 1}
          total={totalItems}
          pageSize={pagination.size}
          onChange={(page, pageSize) =>
            setPagination({ page: page - 1, size: pageSize })
          }
          size="default"
          responsive
          className="[&_.ant-pagination-item]:min-w-[36px] [&_.ant-pagination-item]:h-[36px] [&_.ant-pagination-item]:leading-[34px] [&_.ant-pagination-item]:mx-1 [&_.ant-pagination-prev]:min-w-[36px] [&_.ant-pagination-prev]:h-[36px] [&_.ant-pagination-next]:min-w-[36px] [&_.ant-pagination-next]:h-[36px] [&_.ant-pagination-jump-prev]:mx-1 [&_.ant-pagination-jump-next]:mx-1"
        />
      </div>
    </div>
  );
}
