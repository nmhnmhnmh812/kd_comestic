"use client";

import { Divider, Select } from "antd";
import SelectCard from "./SelectCard";
import { useState } from "react";

const SORT_BY = [
  {
    title: "Nổi bật",
  },
  {
    title: "Bán chạy",
  },
  {
    title: "Hàng mới",
  },
  {
    title: "Giá: Thấp đến cao",
  },
  {
    title: "Giá: Cao đến thấp",
  },
];
export default function ProductFilter() {
  const [currentSortBy, setCurrentSortBy] = useState<string | null>(null);
  return (
    <div className="w-full bg-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 gap-2">
        <span className="font-bold text-sm">Lọc theo:</span>
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          <Select placeholder="Giá thành" size="large" className="flex-1 sm:flex-none min-w-[120px]" />
          <Select placeholder="Thương hiệu" size="large" className="flex-1 sm:flex-none min-w-[120px]" />
          <Select placeholder="Xuất xứ" size="large" className="flex-1 sm:flex-none min-w-[120px]" />
        </div>
      </div>
      <Divider className="m-0" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 gap-2">
        <span className="font-bold text-sm whitespace-nowrap">Sắp xếp theo:</span>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {SORT_BY.map((item) => (
            <SelectCard
              key={item.title}
              title={item.title}
              onClick={() => setCurrentSortBy(item.title)}
              active={currentSortBy === item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
