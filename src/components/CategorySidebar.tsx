"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppstoreOutlined } from "@ant-design/icons";
import clsx from "clsx";
import slugify from "slugify";
import useCategories from "@/hooks/useCategories";
import { ApiCategory } from "@/types";

interface CategorySidebarProps {
  currentCategoryId?: number;
}

export default function CategorySidebar({
  currentCategoryId,
}: CategorySidebarProps) {
  const { categories, isFetching } = useCategories();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white p-5 flex flex-col gap-4 w-1/4 border-r min-h-[400px]">
      <p className="text-xl font-semibold uppercase">
        <AppstoreOutlined /> Danh mục sản phẩm
      </p>
      {isFetching ? (
        <div className="text-gray-500">Đang tải...</div>
      ) : categories.length === 0 ? (
        <div className="text-gray-500">Không có danh mục</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {categories.map((category: ApiCategory) => {
            const categorySlug = slugify(category.name, {
              lower: true,
              locale: "vi",
              strict: true,
            });
            const link = `/danh-muc/${categorySlug}`;
            const isActive = category.id === currentCategoryId;

            return (
              <li
                key={category.id}
                className={clsx(
                  "hover:text-red-600 transition-colors cursor-pointer",
                  {
                    "text-red-600 font-bold": isActive,
                  }
                )}
              >
                <Link href={link}>{category.name}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
