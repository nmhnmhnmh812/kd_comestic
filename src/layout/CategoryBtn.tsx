"use client";

import { ENDPOINTS, getCategories } from "@/api/category";
import { Category } from "@/types";
import { convertToUrl } from "@/utils";
import { MenuOutlined, RightOutlined, DownOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

export default function CategoryBtn({
  isMobile = false,
}: {
  isMobile?: boolean;
}) {
  const { data: categories = [] } = useQuery<any, Error, Category[]>({
    queryKey: [ENDPOINTS.CATEGORIES],
    queryFn: getCategories,
    select: (res) => (res.data.result as Category[]) || [],
    staleTime: Infinity,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  // Mobile version - Accordion style
  if (isMobile) {
    return (
      <div className="overflow-y-auto h-screen pb-32">
        <Collapse
          accordion
          ghost
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} className="text-xs" />
          )}
          className="text-sm"
        >
          {categories.map((category) => {
            // Nếu không có subcategory, render link thường
            if (!category.subCategories?.length) {
              return (
                <div key={category.id} className="border-b border-gray-100">
                  <Link
                    href={`/danh-muc/${convertToUrl(
                      category.name,
                      category.id
                    )}`}
                    className="block py-2 px-4 text-gray-800 hover:bg-gray-50 text-sm"
                  >
                    {category.name}
                  </Link>
                </div>
              );
            }

            // Nếu có subcategory, render collapse
            return (
              <Panel
                header={
                  <span className="text-gray-800 text-sm">{category.name}</span>
                }
                key={category.id}
              >
                <div className="flex flex-col gap-1 pl-2">
                  <Link
                    href={`/danh-muc/${convertToUrl(
                      category.name,
                      category.id
                    )}`}
                    className="text-gray-600 hover:text-red-600 py-1 text-sm"
                  >
                    Tất cả {category.name}
                  </Link>
                  {category.subCategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={`/danh-muc/${convertToUrl(
                        category.name,
                        category.id
                      )}/${convertToUrl(subcategory.name, subcategory.id)}`}
                      className="text-gray-600 hover:text-red-600 py-1 text-sm"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    );
  }

  // Desktop version - Hover menu
  return (
    <div
      className="relative py-2"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => {
        setIsMenuOpen(false);
        setActiveMenu(null);
      }}
    >
      <Link
        href="/danh-muc"
        className="uppercase hover:text-gray-300 transition-colors text-sm"
      >
        <MenuOutlined /> DANH MỤC SẢN PHẨM
      </Link>
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-56 bg-white shadow-2xl overflow-visible z-[99] animate-fadeIn">
          {categories.map((category) => (
            <div
              key={category.id}
              onMouseEnter={() => {
                if (category.subCategories?.length) {
                  setActiveMenu(category.id);
                }
              }}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={`/danh-muc/${convertToUrl(category.name, category.id)}`}
              >
                <div className="px-4 py-2 flex items-center justify-between border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group">
                  <span className="text-gray-800 text-sm">{category.name}</span>
                  {category.subCategories?.length ? (
                    <RightOutlined className="text-xs text-black group-hover:text-red-600 transition-colors" />
                  ) : null}
                </div>
              </Link>

              {activeMenu === category.id && category.subCategories?.length && (
                <div
                  className="absolute left-full top-0 w-[500px] h-full bg-white border border-gray-200 shadow-2xl z-[100] animate-slideIn"
                  onMouseEnter={() => setActiveMenu(category.id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-6">
                      {category.subCategories.map((subcategory) => (
                        <div key={subcategory.id}>
                          <Link
                            href={`/danh-muc/${convertToUrl(
                              category.name,
                              category.id
                            )}/${convertToUrl(
                              subcategory.name,
                              subcategory.id
                            )}`}
                          >
                            <h3 className="font-semibold text-gray-900 mb-2 pb-1 border-b border-red-600 hover:text-red-600 cursor-pointer transition-colors text-sm">
                              {subcategory.name}
                            </h3>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
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
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
