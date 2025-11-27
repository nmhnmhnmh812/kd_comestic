"use client";

import { Empty, message, Pagination, Spin, Select, Input, DatePicker, Button } from "antd";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getBlogs, getBlogCategories, BlogFilterParams } from "@/api/blog";
import { BlogPageResponse, BlogCategory, ResponseApi } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { convertToUrl } from "@/utils";
import HotProducts from "./components/HotProducts";
import { SearchOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

export default function BlogScreen() {
  const [filters, setFilters] = useState<BlogFilterParams>({
    page: 0,
    size: 10,
  });
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [sortBy, setSortBy] = useState<string | undefined>();

  // Fetch blog categories
  const { data: categoriesData } = useQuery<BlogCategory[] | undefined>({
    queryKey: [ENDPOINTS.BLOG_CATEGORIES],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getBlogCategories();
      if (error) {
        message.error(error || "Không thể tải danh mục");
      }
      return data?.result;
    },
  });

  const categories = categoriesData || [];

  // Fetch blogs
  const { data, isFetching } = useQuery<BlogPageResponse | undefined>({
    queryKey: [ENDPOINTS.BLOGS, filters],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getBlogs(filters);
      if (error) {
        message.error(error || "Đã có lỗi xảy ra");
      }
      return data?.result;
    },
    staleTime: 0,
  });

  const blogs = data?.content || [];
  const totalItems = data?.totalElements || 0;

  // Auto search when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        page: 0,
        keyword: keyword || undefined,
        categoryId: selectedCategory,
        fromDate: dateRange?.[0]?.format("YYYY-MM-DD"),
        toDate: dateRange?.[1]?.format("YYYY-MM-DD"),
        sort: sortBy,
      }));
    }, 500); // Debounce 500ms

    return () => clearTimeout(timer);
  }, [keyword, selectedCategory, dateRange, sortBy]);

  const handleReset = () => {
    setKeyword("");
    setSelectedCategory(undefined);
    setDateRange(null);
    setSortBy(undefined);
  };

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
              src={blog.thumbnail}
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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 order-2 lg:order-1">
          {/* Sort and Result Count Header */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-600">
              {keyword ? (
                <span>
                  Kết quả tìm kiếm cho: <span className="font-bold">"{keyword}"</span>
                </span>
              ) : (
                <span>Hiển thị {blogs.length} bài viết</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm whitespace-nowrap">Sắp xếp:</span>
              <Select
                value={sortBy}
                onChange={setSortBy}
                className="w-48"
                variant="borderless"
                defaultValue="createdDate,desc"
              >
                <Select.Option value="createdDate,desc">Mới nhất</Select.Option>
                <Select.Option value="createdDate,asc">Cũ nhất</Select.Option>
                <Select.Option value="title,asc">Tiêu đề (A-Z)</Select.Option>
                <Select.Option value="title,desc">Tiêu đề (Z-A)</Select.Option>
              </Select>
            </div>
          </div>

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
                  current={filters.page + 1}
                  total={totalItems}
                  pageSize={filters.size}
                  onChange={(page, pageSize) =>
                    setFilters({ ...filters, page: page - 1, size: pageSize })
                  }
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-8 lg:w-80 order-1 lg:order-2">
          {/* Search Widget */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Input
              size="large"
              placeholder="Nhập từ khóa..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              allowClear
              className="rounded-lg"
            />
          </div>

          {/* Categories Widget */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSelectedCategory(undefined)}
                className={`text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === undefined
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                Tất cả
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Date Filter Widget */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <RangePicker
              placeholder={["Từ ngày", "Đến ngày"]}
              value={dateRange}
              onChange={setDateRange}
              format="DD/MM/YYYY"
              className="w-full"
            />
          </div>

          <HotProducts />
        </div>
      </div>
    </div>
  );
}
