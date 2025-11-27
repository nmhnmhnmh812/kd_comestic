"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogs, ENDPOINTS } from "@/api/blog";
import { Blog, ResponseApi } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { convertToUrl } from "@/utils";
import { Spin } from "antd";

interface RelatedBlogsProps {
    currentBlogId?: number;
    categoryId?: number;
}

export default function RelatedBlogs({ currentBlogId, categoryId }: RelatedBlogsProps) {
    const { data: blogs, isFetching } = useQuery<Blog[] | undefined>({
        queryKey: [ENDPOINTS.BLOGS, "related", currentBlogId, categoryId],
        queryFn: async () => {
            const { error, data }: ResponseApi = await getBlogs({
                page: 0,
                size: 6,
                categoryId: categoryId,
            });
            if (error) return undefined;
            const allBlogs: Blog[] = data?.result?.content || [];
            // Filter out current blog if on details page
            return currentBlogId
                ? allBlogs.filter((blog) => blog.id !== currentBlogId).slice(0, 5)
                : allBlogs.slice(0, 5);
        },
    });

    if (!blogs?.length && !isFetching) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-6 text-gray-800">Bài viết cùng danh mục</h3>
            <div className="flex flex-col gap-6">
                {!isFetching ? (
                    blogs?.map((blog) => {
                        const blogUrl = convertToUrl(blog.title, blog.id);

                        return (
                            <Link
                                key={blog.id}
                                href={`/blog/${blogUrl}`}
                                className="group"
                            >
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 border border-gray-100">
                                    <Image
                                        src={blog.thumbnail}
                                        alt={blog.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <h4 className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                                    {blog.title}
                                </h4>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                    {blog.shortDescription}
                                </p>
                                <span className="text-xs text-gray-400">
                                    {new Date(blog.createdDate).toLocaleDateString("vi-VN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </Link>
                        );
                    })
                ) : (
                    <div className="flex justify-center py-4">
                        <Spin />
                    </div>
                )}
            </div>
        </div>
    );
}
