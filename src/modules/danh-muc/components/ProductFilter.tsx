"use client";

import { Divider, Select } from "antd";
import SelectCard from "./SelectCard";
import { useEffect, useState } from "react";
import SelectBrand from "./SelectBrand";
import useProductList from "../store";
import { useRouter, useSearchParams } from "next/navigation";

const SORT_BY = [
  {
    title: "Bán chạy nhất",
    value: "buyCount,desc",
    query: "ban-chay-nhat",
  },
  {
    title: "Xem nhiều nhất",
    value: "viewCount,desc",
    query: "xem-nhieu-nhat",
  },
  {
    title: "Hàng mới",
    value: "createdDate,desc",
    query: "hang-moi",
  },
  {
    title: "Giá: Thấp đến cao",
    value: "finalPrice,asc",
    query: "gia-thap-den-cao",
  },
  {
    title: "Giá: Cao đến thấp",
    value: "finalPrice,desc",
    query: "gia-cao-den-thap",
  },
];

const PRICE_OPTIONS = [
  { label: "Dưới 200k", value: "0-200000" },
  { label: "200k - 500k", value: "200000-500000" },
  { label: "500k - 1 triệu", value: "500000-1000000" },
  { label: "1 triệu - 2 triệu", value: "1000000-2000000" },
  { label: "Trên 2 triệu", value: "2000000-9999999" },
];

export default function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | undefined>();
  const updateFilter = useProductList((state) => state.updateFilter);
  const filter = useProductList((state) => state.filter);

  // Parse URL params - CHỈ khi searchParams thay đổi
  useEffect(() => {
    const sortQuery = searchParams.get("sort");
    const minPriceStr = searchParams.get("minPrice");
    const maxPriceStr = searchParams.get("maxPrice");
    const brandSlug = searchParams.get("brand");

    const newFilter: any = {};

    // Handle sort
    if (sortQuery) {
      const sortItem = SORT_BY.find((s) => s.query === sortQuery);
      if (sortItem) {
        setSelectedSort(sortItem.value);
        newFilter.sort = sortItem.value;
      }
    } else {
      setSelectedSort(null);
      newFilter.sort = undefined;
    }

    // Handle price
    if (minPriceStr || maxPriceStr) {
      const min = minPriceStr ? parseInt(minPriceStr, 10) : 0;
      const max = maxPriceStr ? parseInt(maxPriceStr, 10) : 9999999;

      newFilter.minPrice = min;
      newFilter.maxPrice = max === 9999999 ? undefined : max;

      // Find matching price option
      const priceOption = PRICE_OPTIONS.find((opt) => {
        const [optMinStr, optMaxStr] = opt.value.split("-");
        const optMin = parseInt(optMinStr, 10);
        const optMax = optMaxStr ? parseInt(optMaxStr, 10) : 9999999;

        return optMin === min && optMax === max;
      });

      if (priceOption) {
        setSelectedPrice(priceOption.value);
      } else {
        setSelectedPrice(undefined);
      }
    } else {
      setSelectedPrice(undefined);
      newFilter.minPrice = undefined;
      newFilter.maxPrice = undefined;
    }

    // Handle brand
    if (brandSlug) {
      const idMatch = brandSlug.match(/\.(\d+)$/);
      if (idMatch) {
        const id = parseInt(idMatch[1], 10);
        newFilter.brandId = id;
      }
    } else {
      newFilter.brandId = undefined;
    }

    // Update filter một lần duy nhất
    updateFilter(newFilter);
  }, [searchParams]);

  // Update URL params helper
  const updateURLParams = (updates: {
    sort?: string | null;
    minPrice?: number | null;
    maxPrice?: number | null;
    brand?: string | null;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    // Handle sort
    if (updates.sort !== undefined) {
      if (updates.sort) {
        const sortItem = SORT_BY.find((s) => s.value === updates.sort);
        if (sortItem) {
          params.set("sort", sortItem.query);
        }
      } else {
        params.delete("sort");
      }
    }

    // Handle price - check for null explicitly
    if ("minPrice" in updates) {
      if (updates.minPrice !== null && updates.minPrice !== undefined) {
        params.set("minPrice", updates.minPrice.toString());
      } else {
        params.delete("minPrice");
      }
    }
    if ("maxPrice" in updates) {
      if (updates.maxPrice !== null && updates.maxPrice !== undefined) {
        params.set("maxPrice", updates.maxPrice.toString());
      } else {
        params.delete("maxPrice");
      }
    }

    // Handle brand - check for null explicitly
    if ("brand" in updates) {
      if (updates.brand !== null && updates.brand !== undefined) {
        params.set("brand", updates.brand);
      } else {
        params.delete("brand");
      }
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handlePriceChange = (value: string | undefined) => {
    if (!value) {
      setSelectedPrice(undefined);
      // Update store ngay lập tức
      updateFilter({ ...filter, minPrice: undefined, maxPrice: undefined });
      // Update URL - pass null to delete params
      updateURLParams({ minPrice: null, maxPrice: null });
      return;
    }

    setSelectedPrice(value);
    const [minPriceStr, maxPriceStr] = value.split("-");
    const minPrice = parseInt(minPriceStr, 10);
    const maxPrice = maxPriceStr ? parseInt(maxPriceStr, 10) : undefined;

    // Update store ngay lập tức
    updateFilter({ ...filter, minPrice, maxPrice });
    // Update URL
    updateURLParams({ minPrice, maxPrice });
  };

  const handleSortChange = (value: string) => {
    const newSelected = selectedSort === value ? null : value;
    setSelectedSort(newSelected);
    // Update store ngay lập tức
    updateFilter({ ...filter, sort: newSelected });
    // Update URL
    updateURLParams({ sort: newSelected });
  };

  return (
    <div className="w-full bg-gray-200">
      <div className="flex flex-col md:flex-row md:items-center gap-2 p-2">
        <span className="font-bold text-sm">Lọc theo</span>
        <div className="flex flex-wrap gap-2 md:gap-3">
          <Select
            placeholder="Giá thành"
            size="large"
            options={PRICE_OPTIONS}
            onChange={handlePriceChange}
            value={selectedPrice}
            allowClear
            className="w-full md:w-40"
          />
          <SelectBrand
            onBrandChange={(brandSlug) =>
              updateURLParams({ brand: brandSlug || null })
            }
          />
        </div>
      </div>
      <Divider className="m-0" />
      <div className="flex flex-col md:flex-row md:items-center gap-2 p-2">
        <span className="font-bold text-sm">Sắp xếp theo</span>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {SORT_BY.map((item) => (
            <SelectCard
              key={item.title}
              title={item.title}
              onClick={() => handleSortChange(item.value)}
              active={selectedSort === item.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
