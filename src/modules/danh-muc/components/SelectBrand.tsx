"use client";
import { ENDPOINTS, getBrands } from "@/api/brand";
import { Brand, ResponseApi } from "@/types";
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
  const filter = useProductList((state) => state.filter);
  const searchParams = useSearchParams();

  // Parse brand from URL on mount và khi searchParams thay đổi
  useEffect(() => {
    const brandSlug = searchParams.get("brand");
    if (brandSlug) {
      // Extract ID from slug: "thuong-hieu-abc.123" -> 123
      const idMatch = brandSlug.match(/\.(\d+)$/);
      if (idMatch) {
        const id = parseInt(idMatch[1]);
        if (selectedBrand !== id) {
          setSelectedBrand(id);
        }
      }
    } else {
      // Clear selection khi không có brand trong URL
      if (selectedBrand !== undefined) {
        setSelectedBrand(undefined);
      }
    }
  }, [searchParams, selectedBrand]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [ENDPOINTS.BRANDS, keyword],
      queryFn: async ({ pageParam = 0 }) => {
        try {
          const response: ResponseApi = await getBrands({
            page: pageParam,
            size: 20,
            keyword,
          });

          // Safe check for response structure
          if (!response?.data?.result) {
            console.error("Invalid response structure:", response);
            return { content: [], totalPages: 0, totalElements: 0 };
          }

          return response.data.result;
        } catch (error) {
          console.error("Error fetching brands:", error);
          return { content: [], totalPages: 0, totalElements: 0 };
        }
      },
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage?.totalPages) return undefined;
        const totalPages = lastPage.totalPages;
        const nextPage = allPages.length;
        return nextPage < totalPages ? nextPage : undefined;
      },
      initialPageParam: 0,
      select: (data) => {
        if (!data?.pages) return { pages: [], pageParams: [] };
        return {
          pages: data.pages.flatMap((page) =>
            (page?.content || []).filter((brand: Brand) => !brand.isDeleted)
          ),
          pageParams: data.pageParams,
        };
      },
    });

  const brands = (data?.pages || []) as Brand[];

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
    updateFilter({ ...filter, brandId: value });

    if (value) {
      const brand = brands.find((b) => b?.id === value);
      if (brand?.name) {
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
      popupMatchSelectWidth={false}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
    >
      {brands.map((brand) =>
        brand?.id && brand?.name ? (
          <Select.Option key={brand.id} value={brand.id}>
            {brand.name}
          </Select.Option>
        ) : null
      )}
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
