import Link from "next/link";
import { FilterFilled } from "@ant-design/icons";
import clsx from "clsx";
import { ICategory } from "@/types";

export default function NavFilter({
  filter,
  path,
}: {
  filter: Record<string, ICategory>;
  path: string[];
}) {
  const currentPath = `/danh-muc/${path.join("/")}`;
  console.log("currentPath:", currentPath);

  return (
    <div className="bg-white p-5 flex flex-col gap-4 w-1/4 border-r">
      <p className="text-xl font-semibold uppercase">
        <FilterFilled /> Bộ lọc tìm kiếm
      </p>
      {Object.entries(filter).map(([key, category]) => (
        <div key={key} className="flex flex-col gap-2">
          <p className="font-semibold uppercase">{category.title}</p>
          <ul className="flex flex-col gap-2 pl-3">
            {category.children.map((child) => {
              const link = `/danh-muc/${child.link}${
                child.id ? `.${child.id}` : ""
              }`;
              return (
                <li
                  key={link}
                  className={clsx("hover:text-red-600", {
                    "text-red-600 font-bold": currentPath === link,
                  })}
                >
                  <Link href={link}>{child.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
