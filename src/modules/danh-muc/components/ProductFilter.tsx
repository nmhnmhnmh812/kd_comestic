"use client";

import { Divider, Select } from "antd";
import SelectCard from "./SelectCard";
import { useEffect, useState } from "react";
import SelectBrand from "./SelectBrand";
import useProductList from "../store";

const SORT_BY = [
  {
    title: "Bán chạy nhất",
    value: "buyCount,desc",
  },
  {
    title: "Xem nhiều nhất",
    value: "viewCount,desc",
  },
  {
    title: "Hàng mới",
    value: "createdDate,desc",
  },
  {
    title: "Giá: Thấp đến cao",
    value: "finalPrice,asc",
  },
  {
    title: "Giá: Cao đến thấp",
    value: "finalPrice,desc",
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
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const updateFilter = useProductList((state) => state.updateFilter);

  useEffect(() => {
    useProductList.getState().updateFilter({});
  }, []);

  const handlePriceChange = (value: string) => {
    const [minPriceStr, maxPriceStr] = value.split("-");
    const minPrice = parseInt(minPriceStr, 10);
    const maxPrice = maxPriceStr ? parseInt(maxPriceStr, 10) : undefined;

    updateFilter({ minPrice, maxPrice });
  };

  const handleSortChange = (value: string) => {
    const newSelected = selectedSort === value ? null : value;
    setSelectedSort(newSelected);
    updateFilter({ sort: newSelected });
  };

  return (
    <div className="w-full bg-gray-200">
      <div className="flex items-center gap-2 p-2">
        <span className="font-bold">Lọc theo</span>
        <div className="flex gap-3">
          <Select
            placeholder="Giá thành"
            size="large"
            options={PRICE_OPTIONS}
            onChange={handlePriceChange}
            allowClear
            className="w-40"
          />
          <SelectBrand />
        </div>
      </div>
      <Divider className="m-0" />
      <div className="flex items-center gap-2 p-2">
        <span className="font-bold">Sắp xếp theo</span>
        <div className="flex gap-3">
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
