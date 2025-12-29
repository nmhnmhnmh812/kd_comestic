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
} from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getBlogs, getBlogCategories } from "@/api/blog";
import { BlogPageResponse, ResponseApi } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { convertToUrl, sanitizedDescription } from "@/utils";
import dayjs, { Dayjs } from "dayjs";
import BlogItem from "@/components/BlogItem";

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
      return <BlogItem key={blog.id} blog={blog} />;
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
