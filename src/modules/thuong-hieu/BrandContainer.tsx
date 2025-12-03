"use client";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import BrandHeader from "./components/BrandHeader";
import useBrands from "./hooks/useBrands";
import AlphabetNav from "./components/AlphabetNav";
import BrandList from "./components/BrandList";

export default function BrandContainer() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  const {
    brands,
    groupedBrands,
    sortedLetters,
    isLoading,
    isFetchingNextPage,
    loaderRef,
  } = useBrands(debouncedKeyword);

  return (
    <div className="bg-gray-50 min-h-screen">
      <BrandHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search bar */}
        <div className="mb-8">
          <Input
            size="large"
            placeholder="Tìm kiếm thương hiệu..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="max-w-md"
            allowClear
          />
        </div>

        {/* Alphabet navigation */}
        <AlphabetNav sortedLetters={sortedLetters} />

        {/* Brand list */}
        <BrandList
          brands={brands}
          groupedBrands={groupedBrands}
          sortedLetters={sortedLetters}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          loaderRef={loaderRef}
        />
      </div>
    </div>
  );
}
