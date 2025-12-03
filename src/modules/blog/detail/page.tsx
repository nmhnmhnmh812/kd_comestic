"use client";

import { message, Spin, Tag } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getBlogBySlug } from "@/api/blog";
import { BlogDetail, ResponseApi } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import DOMPurify from "dompurify";
import { useMemo } from "react";

interface BlogDetailScreenProps {
  slug: string;
}

export default function BlogDetailScreen({ slug }: BlogDetailScreenProps) {
  // Extract ID from slug (format: title.id)
  const blogId = slug.split(".").pop();

  const { data, isFetching, error } = useQuery<BlogDetail | undefined>({
    queryKey: ["blog-detail", blogId],
    queryFn: async () => {
      if (!blogId) {
        message.error("ID bài viết không hợp lệ");
        return undefined;
      }
      const { error, data }: ResponseApi = await getBlogBySlug(Number(blogId));
      if (error) {
        message.error(error || "Không tìm thấy bài viết");
        return undefined;
      }
      return data?.result;
    },
    staleTime: 0,
    enabled: !!blogId,
  });

  // Sanitize HTML content using DOMPurify
  // Must be called before any early returns to comply with React Hooks rules
  const sanitizedContent = useMemo(() => {
    if (!data?.content) return "";
    return DOMPurify.sanitize(data.content, {
      ADD_TAGS: ["iframe"], // Allow iframe if needed for embedded content
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"], // Allow iframe attributes
      ALLOWED_URI_REGEXP:
        /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i, // Allow common protocols
    });
  }, [data?.content]);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-screen-xl mx-auto py-10 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy bài viết
          </h2>
          <p className="text-gray-600 mb-6">
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeftOutlined />
            Quay lại danh sách blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto py-5 px-4">
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <ArrowLeftOutlined />
        Quay lại danh sách blog
      </Link>

      {/* Blog Content */}
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Thumbnail */}
        <div className="relative w-full aspect-[21/9]">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-10">
          {/* Category */}
          <div className="mb-4">
            <Tag icon={<FolderOutlined />} color="blue" className="text-sm">
              {data.categoryName}
            </Tag>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {data.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
            <div className="flex items-center gap-2">
              <CalendarOutlined />
              <span>
                Đăng ngày:{" "}
                {new Date(data.createdDate).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarOutlined />
              <span>
                Cập nhật:{" "}
                {new Date(data.updatedDate).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Short Description */}
          <div className="text-lg text-gray-700 font-medium mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-600">
            {data.shortDescription}
          </div>

          {/* Main Content - Sanitized with DOMPurify */}
          <div
            className="prose prose-lg max-w-none whitespace-pre-wrap
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg prose-img:shadow-md
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      </article>

      {/* Back to List Button */}
      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeftOutlined />
          Xem thêm bài viết khác
        </Link>
      </div>
    </div>
  );
}
