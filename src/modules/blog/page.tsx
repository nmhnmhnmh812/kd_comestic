"use client";

import { Empty, message, Pagination, Spin } from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getBlogs } from "@/api/blog";
import { BlogPageResponse, ResponseApi } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { convertToUrl } from "@/utils";

export default function BlogScreen() {
  const [pagination, setPagination] = useState({ page: 0, size: 10 });

  const { data, isFetching } = useQuery<BlogPageResponse | undefined>({
    queryKey: [ENDPOINTS.BLOGS, pagination],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getBlogs({
        page: pagination.page,
        size: pagination.size,
      });
      if (error) {
        message.error(error || "Đã có lỗi xảy ra");
      }
      return data?.result;
    },
    staleTime: 0,
  });

  const blogs = data?.content || [];
  const totalItems = data?.totalElements || 0;

  const renderBlogs = blogs?.length ? (
    blogs.map((blog) => {
      const blogUrl = convertToUrl(blog.title, blog.id);
      return (
        <Link
          key={blog.id}
          href={`/blog/${blogUrl}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative w-full aspect-video">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {blog.categoryName}
              </span>
            </div>
            <h2 className="text-xl font-bold mb-2 line-clamp-2">
              {blog.title}
            </h2>
            <p className="text-gray-600 line-clamp-3 mb-2">
              {blog.shortDescription}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(blog.createdDate).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </Link>
      );
    })
  ) : (
    <div className="col-span-full py-10">
      <Empty description="Không có bài viết nào" />
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-5 py-5 px-4">
      <h1 className="text-3xl font-bold uppercase">Tin tức & Blog</h1>
      <div className="bg-white rounded-md flex flex-col gap-4 p-4">
        {!isFetching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderBlogs}
          </div>
        ) : (
          <div className="flex justify-center items-center h-60">
            <Spin />
          </div>
        )}
        <div className="flex justify-end">
          <Pagination
            current={pagination.page + 1}
            total={totalItems}
            pageSize={pagination.size}
            onChange={(page, pageSize) =>
              setPagination({ page: page - 1, size: pageSize })
            }
            showSizeChanger
            showTotal={(total) => `Tổng ${total} bài viết`}
          />
        </div>
      </div>
    </div>
  );
}
