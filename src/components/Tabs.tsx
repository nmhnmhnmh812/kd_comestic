"use client";

import { Pagination } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

interface TabsProps {
  list: {
    title: string;
    link: string;
  }[];
}

const TABS = [
  {
    title: "hot deals",
    link: "hot-deals",
  },
  {
    title: "flash sale",
    link: "flash-sale",
  },
  {
    title: "đang diễn ra",
    link: "current-deals",
  },
];

export default function Tabs() {
  const currentPath = usePathname();

  return (
    <div className="flex gap-10 uppercase font-bold text-gray-600 p-4 bg-white text-xl rounded-md">
      {TABS.map((item) => (
        <Link
          className={clsx("hover:text-red-600", {
            "text-red-600 border-b-2 border-red-600": currentPath.includes(
              item.link
            ),
          })}
          key={item.link}
          href={item.link}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
