"use client";
import { ENDPOINTS, getBrands } from "@/api/brand";
import { Brand } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Select, Spin } from "antd";
import { debounce } from "@/utils/lodash";
import { useMemo, useRef, useState, useEffect } from "react";
import useProductList from "../store";
import { useSearchParams } from "next/navigation";
import { convertToUrl } from "@/utils";

export default function SelectBrand({
  onBrandChange,
}: {
  onBrandChange?: (brandSlug: string | undefined, brandId?: number) => void;
}) {
  const [keyword, setKeyword] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<number | undefined>();
  const selectRef = useRef<any>(null);
  const updateFilter = useProductList((state) => state.updateFilter);
  const searchParams = useSearchParams();

  // Parse brand from URL on mount
  useEffect(() => {
    const brandSlug = searchParams.get("brand");
    if (brandSlug) {
      // Extract ID from slug: "thuong-hieu-abc.123" -> 123
      const idMatch = brandSlug.match(/\.(\d+)$/);
      if (idMatch) {
        const id = parseInt(idMatch[1]);
        setSelectedBrand(id);
        updateFilter({ brandId: id });
      }
    }
  }, []);

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

  const handleChange = (value: number | undefined) => {
    setSelectedBrand(value);
    updateFilter({ brandId: value });

    if (value) {
      const brand = brands.find((b: Brand) => b.id === value);
      if (brand) {
        const brandSlug = convertToUrl(brand.name, brand.id);
        onBrandChange?.(brandSlug, value);
      }
    } else {
      onBrandChange?.(undefined, undefined);
    }
  };

  return (
    <Select
      ref={selectRef}
      showSearch
      placeholder="Thương hiệu"
      value={selectedBrand}
      onChange={handleChange}
      onSearch={handleSearch}
      filterOption={false}
      loading={isLoading}
      onPopupScroll={handleScroll}
      notFoundContent={isLoading ? <Spin size="small" /> : "Không có dữ liệu"}
      className="w-full md:w-40"
      size="large"
      allowClear
      onClear={() => handleChange(undefined)}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
    >
      {brands.map((brand: Brand) => (
        <Select.Option key={brand.id} value={brand.id}>
          {brand.name}
        </Select.Option>
      ))}
      {isFetchingNextPage && (
        <Select.Option disabled value="loading" key="loading">
          <div className="text-center py-2">
            <Spin size="small" /> Đang tải...
          </div>
        </Select.Option>
      )}
    </Select>
  );
}
