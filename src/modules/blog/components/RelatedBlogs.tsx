"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogs, ENDPOINTS } from "@/api/blog";
import { Blog, ResponseApi } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { convertToUrl } from "@/utils";
import { Button, Divider, Spin } from "antd";

interface RelatedBlogsProps {
    currentBlogId?: number;
}

export default function RelatedBlogs({ currentBlogId }: RelatedBlogsProps) {
    const { data: blogs, isFetching } = useQuery<Blog[] | undefined>({
        queryKey: [ENDPOINTS.BLOGS, "related", currentBlogId],
        queryFn: async () => {
            const { error, data }: ResponseApi = await getBlogs({
                page: 0,
                size: 3,
            });
            if (error) return undefined;
            const allBlogs: Blog[] = data?.result?.content || [];
            // Filter out current blog if on details page
            return currentBlogId
                ? allBlogs.filter((blog) => blog.id !== currentBlogId)
                : allBlogs;
        },
    });

    const renderBlogs = blogs?.length ? (
        blogs.slice(0, 2).map((blog) => {
            const blogUrl = convertToUrl(blog.title, blog.id);
            return (
                <Link
                    key={blog.id}
                    href={`/blog/${blogUrl}`}
                    className="flex gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                            src={blog.thumbnail?.url || "/placeholder.png"}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                            {blog.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                            {new Date(blog.createdDate).toLocaleDateString("vi-VN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </Link>
            );
        })
    ) : (
        <p className="text-center py-10 text-gray-500 text-sm">
            Không có bài viết nào
        </p>
    );

    return (
        <div className="bg-white rounded-lg w-full lg:w-[220px] overflow-hidden shadow-sm">
            <h2 className="font-semibold text-sm md:text-base text-center py-2">
                Bài Viết Khác
            </h2>
            <Divider className="my-0" />
            <div className="flex flex-col gap-2 p-2">
                {!isFetching ? (
                    renderBlogs
                ) : (
                    <div className="flex justify-center py-10">
                        <Spin />
                    </div>
                )}
            </div>
            <Button
                color="default"
                variant="filled"
                className="w-full rounded-none text-xs md:text-sm"
            >
                <Link href="/blog">Xem tất cả</Link>
            </Button>
        </div>
    );
}
