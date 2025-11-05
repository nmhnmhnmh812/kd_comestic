"use client";

import Link from "next/link";
import { AppstoreOutlined } from "@ant-design/icons";
import clsx from "clsx";
import useCategories from "@/hooks/useCategories";
import { ApiCategory } from "@/types";
import { convertToUrl } from "@/utils";

interface CategorySidebarProps {
  currentCategoryId?: number;
  currentCategorySlug?: string;
}

export default function CategorySidebar({
  currentCategoryId,
  currentCategorySlug,
}: CategorySidebarProps) {
  const { categories, isFetching } = useCategories();

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
            const categorySlug = convertToUrl(category.name);
            const link = `/danh-muc/${categorySlug}`;
            // Match by ID or by slug for more robust highlighting
            const isActive =
              category.id === currentCategoryId ||
              categorySlug === currentCategorySlug;

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
