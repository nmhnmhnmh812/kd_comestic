"use client";

import {
  Empty,
  message,
  Pagination,
  Spin,
  Input,
  Select,
  DatePicker,
  Button,
  Tooltip,
} from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getBlogs, getBlogCategories } from "@/api/blog";
import { BlogPageResponse, ResponseApi } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { convertToUrl, sanitizedDescription } from "@/utils";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface BlogFilters {
  keyword?: string;
  categoryId?: number;
  fromDate?: string;
  toDate?: string;
}

export default function BlogScreen() {
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const [filters, setFilters] = useState<BlogFilters>({});
  const [tempFilters, setTempFilters] = useState<{
    keyword?: string;
    categoryId?: number;
    dateRange?: [Dayjs, Dayjs] | null;
  }>({});

  const { data: categoriesData } = useQuery({
    queryKey: [ENDPOINTS.BLOG_CATEGORIES],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getBlogCategories();
      if (error) {
        message.error(error || "Đã có lỗi xảy ra khi tải danh mục");
      }
      return data?.result || [];
    },
  });

  const { data, isFetching } = useQuery<BlogPageResponse | undefined>({
    queryKey: [ENDPOINTS.BLOGS, pagination, filters],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getBlogs({
        page: pagination.page,
        size: pagination.size,
        ...filters,
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

  const handleApplyFilters = () => {
    const newFilters: BlogFilters = {
      keyword: tempFilters.keyword,
      categoryId: tempFilters.categoryId,
    };

    if (tempFilters.dateRange) {
      newFilters.fromDate = tempFilters.dateRange[0].format("YYYY-MM-DD");
      newFilters.toDate = tempFilters.dateRange[1].format("YYYY-MM-DD");
    }

    setFilters(newFilters);
    setPagination({ ...pagination, page: 0 });
  };

  const handleResetFilters = () => {
    setTempFilters({});
    setFilters({});
    setPagination({ ...pagination, page: 0 });
  };

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
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {blog.categoryName}
              </span>
              <p className="text-sm text-gray-400">
                {new Date(blog.createdDate).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Tooltip title={blog.title}>
              <h2 className="text-lg font-bold mb-2 line-clamp-1 w-fit">
                {blog.title}
              </h2>
            </Tooltip>

            <p
              className="ql-editor text-gray-600 h-20 line-clamp-3 p-0"
              dangerouslySetInnerHTML={{
                __html: sanitizedDescription(blog.shortDescription),
              }}
            />
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
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Input
                placeholder="Nhập từ khóa..."
                value={tempFilters.keyword}
                onChange={(e) =>
                  setTempFilters({
                    ...tempFilters,
                    keyword: e.target.value,
                  })
                }
                allowClear
              />

              <Select
                placeholder="Chọn danh mục..."
                value={tempFilters.categoryId}
                onChange={(value) =>
                  setTempFilters({ ...tempFilters, categoryId: value })
                }
                allowClear
                className="w-full"
                options={categoriesData?.map((cat: any) => ({
                  label: cat.name,
                  value: cat.id,
                }))}
              />

              <RangePicker
                placeholder={["Từ ngày", "Đến ngày"]}
                value={tempFilters.dateRange}
                onChange={(dates) =>
                  setTempFilters({
                    ...tempFilters,
                    dateRange: dates as [Dayjs, Dayjs] | null,
                  })
                }
                format="DD/MM/YYYY"
                className="w-full"
              />

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  type="primary"
                  onClick={handleApplyFilters}
                >
                  Lọc
                </Button>
                <Button className="flex-1" onClick={handleResetFilters}>
                  Đặt lại
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderBlogs}
            </div>
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
