"use client";

import { ENDPOINTS, getBlogs } from "@/api/blog";
import { Blog, BlogPageResponse, ResponseApi } from "@/types";
import { convertToUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function RecentBlogs() {
  const { data, isLoading } = useQuery<Blog[]>({
    queryKey: [ENDPOINTS.BLOGS, "recent", 3],
    queryFn: async () => {
      const { data }: ResponseApi = await getBlogs({
        page: 0,
        size: 3,
      });
      return (data?.result as BlogPageResponse)?.content || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const blogs = data || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-4">
        <div className="flex justify-center items-center h-40">
          <Spin />
        </div>
      </div>
    );
  }

  if (!blogs.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg md:text-xl font-bold uppercase">
          Tin tức mới nhất
        </h2>
        <Link
          href="/blog"
          className="text-red-600 font-semibold text-sm uppercase hover:underline"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {blogs.map((blog) => {
          const blogUrl = convertToUrl(blog.title, blog.id);
          return (
            <Link
              key={blog.id}
              href={`/blog/${blogUrl}`}
              className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 flex flex-col gap-2">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded w-fit">
                  {blog.categoryName}
                </span>
                <h3 className="font-bold text-sm md:text-base line-clamp-2 group-hover:text-red-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
                  {blog.shortDescription}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(blog.createdDate).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
