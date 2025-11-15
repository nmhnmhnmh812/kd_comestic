"use client";
import Link from "next/link";
import { FilterFilled } from "@ant-design/icons";
import clsx from "clsx";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getCategories } from "@/api/category";
import { convertToUrl } from "@/utils";
import { useEffect } from "react";
import useProductList from "../store";
import { usePathname } from "next/navigation";

export default function NavFilter({ path }: { path: string[] }) {
  const pathname = usePathname();
  const updateTitle = useProductList((state) => state.updateTitle);
  const { data: categories } = useQuery({
    queryKey: [ENDPOINTS.CATEGORIES],
    queryFn: getCategories,
    staleTime: Infinity,
    select: (res) => res.data.result as Category[],
  });
  const currentPath = `/danh-muc/${path?.join("/") || ""}`;

  useEffect(() => {
    if (!path || path.length === 0) return;
    const [category, subCategory] = path;
    const result = {
      title: "",
      id: 0,
      subCategoryId: 0,
    };
    if (!category) return;
    const foundCategory = categories?.find((c) => {
      const id = category.split(".")[1];
      return c.id === +id;
    });
    result.title += foundCategory ? foundCategory.name : "";
    result.id = foundCategory ? foundCategory.id : 0;
    if (subCategory) {
      const foundSub = foundCategory?.subCategories?.find((sub) => {
        const id = subCategory.split(".")[1];
        return sub.id === +id;
      });
      result.title += foundSub ? ` - ${foundSub.name}` : "";
      result.subCategoryId = foundSub ? foundSub.id : 0;
    }
    localStorage.setItem("categoryTitle", result.title);
    updateTitle(result);
  }, [categories, currentPath, path, updateTitle]);

  return (
    <div className="w-1/4 shrink-0 bg-white border-r p-5 flex flex-col gap-4 sticky top-0 z-50 h-screen rounded-s-lg">
      <p className="font-semibold uppercase">
        <FilterFilled /> Bộ lọc tìm kiếm
      </p>
      <div className="space-y-3 overflow-y-auto">
        {categories?.length ? (
          categories.map((category) => {
            const link = `/danh-muc/${convertToUrl(
              category.name,
              category.id
            )}`;
            return (
              <div key={category.id} className="space-y-2">
                <Link
                  href={link}
                  className={clsx(
                    "text-sm font-semibold uppercase block hover:text-red-600 transition",
                    {
                      "text-red-600": currentPath === link,
                    }
                  )}
                >
                  {category.name}
                </Link>
                <ul className="space-y-1 pl-3 border-l-2 border-gray-200">
                  {category.subCategories?.map((sub) => {
                    const subLink = `/danh-muc/${convertToUrl(
                      category.name,
                      category.id
                    )}/${convertToUrl(sub.name, sub.id)}`;
                    return (
                      <li key={sub.id}>
                        <Link
                          href={subLink}
                          className={clsx(
                            "text-sm block py-1 hover:text-red-600 transition",
                            {
                              "text-red-600 font-bold": currentPath === subLink,
                            }
                          )}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">Không có danh mục</p>
        )}
      </div>
    </div>
  );
}
