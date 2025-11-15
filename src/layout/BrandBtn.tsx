"use client";

import { ENDPOINTS, getBrands } from "@/api/brand";
import { Brand } from "@/types";
import { convertToUrl } from "@/utils";
import { TagOutlined, DownOutlined } from "@ant-design/icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Collapse, Spin } from "antd";

const { Panel } = Collapse;

export default function BrandBtn({ isMobile = false }: { isMobile?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [ENDPOINTS.BRANDS],
      queryFn: ({ pageParam = 0 }) =>
        getBrands({ page: pageParam, size: 20, keyword: "" }),
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
      staleTime: 5 * 60 * 1000,
    });

  const brands = (data?.pages || []) as Brand[];

  // Auto load more on scroll (desktop only)
  useEffect(() => {
    if (isMobile) return;

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

    const menu = menuRef.current;
    if (menu && isMenuOpen) {
      menu.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (menu) {
        menu.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isMenuOpen, hasNextPage, isFetchingNextPage, fetchNextPage, isMobile]);

  // Mobile version - Accordion style
  if (isMobile) {
    return (
      <div className="overflow-y-auto max-h-96">
        <Collapse
          ghost
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} className="text-xs" />
          )}
          className="text-sm"
        >
          <Panel
            header={
              <span className="text-gray-800 text-sm font-semibold">
                Thương hiệu
              </span>
            }
            key="brands"
          >
            <div className="flex flex-col gap-2 pl-2 max-h-80 overflow-y-auto">
              {isLoading ? (
                <div className="text-center py-4">
                  <Spin size="small" /> Đang tải...
                </div>
              ) : brands.length > 0 ? (
                <>
                  {brands.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/danh-muc?brand=${convertToUrl(
                        brand.name,
                        brand.id
                      )}`}
                      className="text-gray-600 hover:text-red-600 py-1 text-sm"
                    >
                      {brand.name}
                    </Link>
                  ))}
                  {isFetchingNextPage && (
                    <div className="text-center py-2">
                      <Spin size="small" />
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-sm">Không có thương hiệu</p>
              )}
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }

  // Desktop version - Hover menu
  return (
    <div
      className="relative py-2"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <Link
        href="/danh-muc"
        className="uppercase hover:text-gray-300 transition-colors text-sm"
      >
        <TagOutlined /> THƯƠNG HIỆU
      </Link>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 w-64 bg-white shadow-2xl z-[99] animate-fadeIn max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <Spin size="small" /> Đang tải...
            </div>
          ) : brands.length > 0 ? (
            <>
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/danh-muc?brand=${convertToUrl(brand.name, brand.id)}`}
                >
                  <div className="px-4 py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group">
                    <span className="text-gray-800 text-sm group-hover:text-red-600">
                      {brand.name}
                    </span>
                  </div>
                </Link>
              ))}
              {isFetchingNextPage && (
                <div className="p-3 text-center border-t">
                  <Spin size="small" />
                </div>
              )}
            </>
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              Không có thương hiệu
            </div>
          )}
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
