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
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const [total, setTotal] = useState(0);

  const { data: products, isFetching } = useQuery<any[]>({
    queryKey: [ENDPOINTS.SEARCH, category.id, pagination, filter],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getProducts({
        categoryId: category.id,
        subCategoryId: category.subCategoryId || undefined,
        ...pagination,
        ...filter,
      });
      if (error) {
        message.error(error || "Đã có lỗi xảy ra");
      }
      const products = data?.result?.content || [];
      setTotal(data?.result?.totalElements || 0);
      return products;
    },
    staleTime: 5 * 60 * 1000,
  });

  const renderPropducts = products?.length ? (
    products.map((product) => <Product key={product.id} {...product} />)
  ) : (
    <p className="text-center col-span-5 py-10">
      <Empty description="Không có sản phẩm nào" />
    </p>
  );

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold uppercase p-5">{category.title}</h1>
      <ProductFilter />
      {!isFetching ? (
        <div className="grid grid-cols-5 gap-2 px-2">{renderPropducts}</div>
      ) : (
        <div className="flex justify-center items-center h-60">
          <Spin />
        </div>
      )}
      <div className="p-2">
        <Pagination
          align="end"
          current={pagination.page + 1}
          total={total}
          pageSize={pagination.size}
          onChange={(page, pageSize) =>
            setPagination({ page: page - 1, size: pageSize })
          }
        />
      </div>
    </div>
  );
}
