"use client";

import { Empty, message, Pagination, Spin } from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getBlogs } from "@/api/blog";
import { BlogPageResponse, ResponseApi } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { convertToUrl } from "@/utils";
import HotProducts from "./components/HotProducts";
import RelatedBlogs from "./components/RelatedBlogs";

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
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row overflow-hidden border border-gray-100 group min-h-[280px]"
        >
          <div className="relative w-full md:w-2/5 aspect-video md:aspect-[4/3]">
            <Image
              src={blog.thumbnail.url}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-5 md:p-6 flex flex-col justify-center w-full md:w-3/5">
            <h2 className="text-sm md:text-base font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
              {blog.title}
            </h2>
            <p className="text-gray-600 line-clamp-3 mb-3 text-xs leading-relaxed">
              {blog.shortDescription}
            </p>
            <div className="mt-auto flex items-center text-gray-400 text-xs">
              <span>
                {new Date(blog.createdDate).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </Link>
      );
    })
  ) : (
    <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-500">
      <Empty description="Chưa có bài viết nào" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Tin Tức & Sự Kiện
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Cập nhật những xu hướng làm đẹp mới nhất và các bí quyết chăm sóc da
          từ chuyên gia.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 md:gap-5">
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col gap-6">
            {!isFetching ? (
              <div className="flex flex-col gap-6">{renderBlogs}</div>
            ) : (
              <div className="flex justify-center items-center h-80">
                <Spin size="large" />
              </div>
            )}

            {totalItems > 0 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  current={pagination.page + 1}
                  total={totalItems}
                  pageSize={pagination.size}
                  onChange={(page, pageSize) =>
                    setPagination({ page: page - 1, size: pageSize })
                  }
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-3 md:gap-5 lg:w-80">
          <HotProducts />
          <RelatedBlogs />
        </div>
      </div>
    </div>
  );
}
