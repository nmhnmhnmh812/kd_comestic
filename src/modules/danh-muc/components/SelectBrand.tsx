"use client";
import { ENDPOINTS, getBrands } from "@/api/brand";
import { Brand } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Select, Spin } from "antd";
import { debounce } from "@/utils/lodash";
import { useMemo, useRef, useState } from "react";
import useProductList from "../store";

export default function SelectBrand() {
  const [keyword, setKeyword] = useState("");
  const selectRef = useRef<any>(null);
  const updateFilter = useProductList((state) => state.updateFilter);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [ENDPOINTS.BRANDS, keyword],
      queryFn: ({ pageParam = 0 }) =>
        getBrands({ page: pageParam, size: 20, keyword }),
      getNextPageParam: (lastPage, allPages) => {
        const totalPages = lastPage.data.result.totalPages;
        const nextPage = allPages.length;
        return nextPage < totalPages ? nextPage : undefined;
      },
      initialPageParam: 0,
      select: (data) => ({
        pages: data.pages.flatMap((page) => page.data.result.content),
        pageParams: data.pageParams,
      }),
    });

  const brands = data?.pages || [];

  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        setKeyword(value);
      }, 500),
    []
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop <= clientHeight * 1.5 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  return (
    <Select
      ref={selectRef}
      showSearch
      placeholder="Thương hiệu"
      onChange={(val) => {
        updateFilter({ brandId: val });
      }}
      onSearch={handleSearch}
      filterOption={false}
      loading={isLoading}
      onPopupScroll={handleScroll}
      notFoundContent={isLoading ? <Spin size="small" /> : "Không có dữ liệu"}
      className="min-w-40"
      size="large"
    >
      {brands.map((brand: Brand) => (
        <Select.Option key={brand.id} value={brand.id}>
          {brand.name}
        </Select.Option>
      ))}
      {isFetchingNextPage && (
        <Select.Option disabled value="loading">
          <Spin size="small" /> Đang tải...
        </Select.Option>
      )}
    </Select>
  );
}
