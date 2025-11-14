"use client";

import {
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Spin } from "antd";
import CategoryBtn from "./CategoryBtn";
import { Logo } from "@/assets/icons";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "@/utils/lodash";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product";
import { Product } from "@/types";
import { convertToUrl } from "@/utils";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const inputRef = useRef<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedSetKeyword = useMemo(
    () =>
      debounce((value: string) => {
        setKeyword(value);
        setShowDropdown(!!value.trim());
      }, 500),
    []
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["search", keyword],
      queryFn: async ({ pageParam = 0 }) => {
        if (!keyword.trim()) return { content: [], totalPages: 0 };
        const response = await getProducts({
          keyword: keyword.trim(),
          page: pageParam,
          size: 10,
        });
        return response.data?.result || { content: [], totalPages: 0 };
      },
      getNextPageParam: (lastPage: any, allPages) => {
        const totalPages = lastPage.totalPages;
        const nextPage = allPages.length;
        return nextPage < totalPages ? nextPage : undefined;
      },
      initialPageParam: 0,
      enabled: !!keyword.trim(),
      staleTime: 5 * 60 * 1000,
    });

  const products = data?.pages.flatMap((page: any) => page.content) || [];

  // Auto load more on scroll
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const { scrollTop, scrollHeight, clientHeight } = target;

      if (
        scrollHeight - scrollTop <= clientHeight * 1.5 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    const dropdown = dropdownRef.current;
    if (dropdown) {
      dropdown.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (dropdown) {
        dropdown.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleProductClick = (product: Product) => {
    const url = `/${convertToUrl(product.name, product.id)}`;
    router.push(url);
    setShowDropdown(false);
  };

  return (
    <header className="bg-white shadow-md w-full relative">
      <div className="bg-black py-2 hidden md:block">
        <div className="flex justify-between max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-white gap-4 text-xs">
            <span>
              <PhoneOutlined /> 0988888825
            </span>
            <span>
              <MailOutlined /> myphamkhanh@gmail.com
            </span>
          </div>
          <div className="text-white cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors text-xs">
            <UserOutlined /> Đăng nhập/Đăng kí
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto py-3 md:py-4 gap-3 md:gap-10 px-4">
        <Link href="/" className="shrink-0">
          <Logo className="w-12 h-12 md:w-auto md:h-auto" />
        </Link>
        <div className="relative w-full md:max-w-[600px] flex-1">
          <Input
            ref={inputRef}
            placeholder="Tìm sản phẩm bạn mong muốn..."
            size="small"
            suffix={
              <SearchOutlined
                onClick={handleSearch}
                style={{ cursor: "pointer" }}
              />
            }
            onChange={(e) => debouncedSetKeyword(e.target.value)}
            onPressEnter={handleSearch}
            onFocus={() => setShowDropdown(!!keyword.trim())}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-96 overflow-y-auto"
            >
              {isLoading ? (
                <div className="p-4 text-center">
                  <Spin size="small" /> Đang tìm kiếm...
                </div>
              ) : products?.length ? (
                <>
                  {products.map((product: Product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.blobs?.[0]?.url || "/placeholder.jpg"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm line-clamp-2">
                            {product.name}
                          </p>
                          <p className="text-red-600 font-semibold text-sm">
                            {product.finalPrice.toLocaleString()}đ
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isFetchingNextPage && (
                    <div className="p-3 text-center">
                      <Spin size="small" /> Đang tải thêm...
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Không tìm thấy sản phẩm
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-4 md:gap-10 text-xs">
          <Link href="/cart">
            <span className="whitespace-nowrap">
              <ShoppingCartOutlined /> <span className="hidden md:inline">Giỏ hàng</span>
            </span>
          </Link>
          <span className="hidden lg:inline whitespace-nowrap">
            <PhoneOutlined /> Hỗ trợ khách hàng
          </span>
        </div>
      </div>
      <div className="bg-black overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-4 md:gap-10 justify-start text-white font-semibold px-4 text-xs md:text-sm">
          <CategoryBtn />
          <p className="uppercase py-2 cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors whitespace-nowrap">
            Flash Sale
          </p>
          <p className="uppercase py-2 cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors whitespace-nowrap">
            Thương hiệu
          </p>
          <p className="uppercase py-2 cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors whitespace-nowrap">
            Sản phẩm hot
          </p>
        </div>
      </div>
    </header>
  );
}
