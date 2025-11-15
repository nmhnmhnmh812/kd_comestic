"use client";

import {
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Input, Spin, Drawer, Button } from "antd";
import CategoryBtn from "./CategoryBtn";
import BrandBtn from "./BrandBtn";
import { Logo } from "@/assets/icons";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "@/utils/lodash";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product";
import { Product } from "@/types";
import { convertToUrl } from "@/utils";
import Image from "next/image";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
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
      {/* Top bar - hide on mobile */}
      <div className="hidden md:block bg-black py-2">
        <div className="flex justify-between max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-white gap-4">
            <span className="text-sm">
              <PhoneOutlined /> 0988888825
            </span>
            <span className="text-sm">
              <MailOutlined /> myphamkhanh@gmail.com
            </span>
          </div>
          <div className="text-white cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors text-sm">
            <UserOutlined /> Đăng nhập/Đăng kí
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="flex justify-between items-center max-w-7xl mx-auto py-3 md:py-4 px-4 gap-2 md:gap-10">
        {/* Mobile menu button */}
        <Button
          className="md:hidden"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
        />

        <Link href="/" className="shrink-0">
          <Logo className="w-20 h-auto md:w-auto" />
        </Link>

        {/* Search - responsive width */}
        <div className="relative flex-1 max-w-[600px]">
          <Input
            ref={inputRef}
            placeholder="Tìm sản phẩm..."
            className="text-sm md:text-base"
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
                        <Image
                          src={product.blobs?.[0]?.url || "/placeholder.jpg"}
                          alt={product.name}
                          className="object-cover rounded"
                          width={48}
                          height={48}
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

        {/* Right icons - hide text on mobile */}
        <div className="flex gap-3 md:gap-10 items-center">
          <Link href="/cart" className="flex items-center gap-1">
            <ShoppingCartOutlined className="text-lg" />
            <span className="hidden md:inline text-sm">Giỏ hàng</span>
          </Link>
          <span className="hidden lg:flex items-center gap-1 text-sm">
            <PhoneOutlined /> Hỗ trợ
          </span>
        </div>
      </div>

      {/* Bottom nav - hide on mobile, show in drawer */}
      <div className="hidden md:block bg-black">
        <div className="max-w-7xl mx-auto flex gap-10 text-white font-semibold px-4 items-center">
          <CategoryBtn isMobile={false} />
          <p className="uppercase py-2 cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors text-sm">
            Flash Sale
          </p>
         <Link href="/thuong-hieu" className="uppercase py-2 cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors text-sm">
           Thương hiệu
         </Link>
          <p className="uppercase py-2 cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors text-sm">
            Sản phẩm hot
          </p>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="flex flex-col gap-4">
          <Link href="/" onClick={() => setDrawerVisible(false)}>
            Trang chủ
          </Link>
          <CategoryBtn isMobile={true} />
          <Link href="/flash-sale" onClick={() => setDrawerVisible(false)}>
            Flash Sale
          </Link>
          <BrandBtn isMobile={true} />
          <Link href="/hot" onClick={() => setDrawerVisible(false)}>
            Sản phẩm hot
          </Link>
          <div className="border-t pt-4 mt-4">
            <p className="mb-2">
              <PhoneOutlined /> 0988888825
            </p>
            <p>
              <MailOutlined /> myphamkhanh@gmail.com
            </p>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
