"use client";

import { ENDPOINTS, getCategories } from "@/api/category";
import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

type Categories = {
  id: string;
  name: string;
  link: string;
  subCategories?: {
    id: string;
    name: string;
    link: string;
    items?: { name: string; link: string }[];
  }[];
};

export default function CategoryBtn() {
  const { data: categories = [] } = useQuery<any, Error, Categories[]>({
    queryKey: [ENDPOINTS.CATEGORIES],
    queryFn: getCategories,
    select: (res) => (res.data.result as Categories[]) || [],
    staleTime: Infinity,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div
      className="relative py-2"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => {
        setIsMenuOpen(false);
      }}
    >
      <Link href="/danh-muc">DANH MỤC SẢN PHẨM</Link>
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-64 bg-white shadow-2xl overflow-visible z-50 animate-fadeIn">
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
              <Link href={`/danh-muc?category=${category.id}`}>
                <div className="px-6 py-3 flex items-center justify-between border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group">
                  <span className="text-gray-800 font-medium">
                    {category.name}
                  </span>
                  {category.subCategories?.length && (
                    <RightOutlined
                      style={{ color: "black" }}
                      twoToneColor="#eb2f96"
                      className="w-4 h-4 text-black group-hover:text-red-600 transition-colors"
                    />
                  )}
                </div>
              </Link>

              {activeMenu === category.id && category.subCategories?.length && (
                <div
                  className="absolute left-full top-0 w-[600px] h-full bg-white border border-gray-200 shadow-2xl z-[100] animate-slideIn"
                  onMouseEnter={() => setActiveMenu(category.id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-8">
                      {category.subCategories.map((subcategory, idx) => (
                        <div key={idx}>
                          <Link
                            href={`/danh-muc?category=${category.id}&subCategory=${subcategory.id}`}
                          >
                            <h3 className="font-bold text-gray-900 mb-3 pb-2 border-b-2 border-red-600 hover:text-red-600 cursor-pointer transition-colors">
                              {subcategory.name}
                            </h3>
                          </Link>
                          {subcategory.items && (
                            <ul className="space-y-2">
                              {subcategory.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link
                                    href={`/danh-muc?category=${category.id}&subCategory=${subcategory.id}&item=${item.name}`}
                                    className="text-gray-600 hover:text-red-600 transition-colors inline-block text-sm"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
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
