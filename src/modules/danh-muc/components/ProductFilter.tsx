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
      <div className="flex justify-between items-center p-2">
        <span className="font-bold">Lọc theo:</span>
        <div className="flex gap-3">
          <Select placeholder="Giá thành" size="large" />
          <Select placeholder="Thương hiệu" size="large" />
          <Select placeholder="Xuất xứ" size="large" />
        </div>
      </div>
      <Divider className="m-0" />
      <div className="flex justify-between items-center p-2">
        <span className="font-bold">Sắp xếp theo:</span>
        <div className="flex gap-3">
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
