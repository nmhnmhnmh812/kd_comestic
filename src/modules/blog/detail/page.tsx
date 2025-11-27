"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getBlogById } from "@/api/blog";
import { BlogDetail, ResponseApi } from "@/types";
import { message, Spin, Breadcrumb } from "antd";
import Image from "next/image";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";
import HotProducts from "../components/HotProducts";
import RelatedBlogs from "../components/RelatedBlogs";

export default function BlogDetailScreen() {
    const params = useParams();
    const slug = params?.slug as string;

    // Extract ID from slug (format: slug-name.id)
    const id = slug?.split(".").pop();

    const { data: blog, isFetching } = useQuery<BlogDetail | undefined>({
        queryKey: [ENDPOINTS.BLOGS, id],
        queryFn: async () => {
            if (!id) return undefined;
            const { error, data }: ResponseApi = await getBlogById(id);
            if (error) {
                message.error(error || "Đã có lỗi xảy ra");
                return undefined;
            }
            return data?.result;
        },
        enabled: !!id,
    });

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Spin size="large" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-gray-500 text-lg">Không tìm thấy bài viết</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 md:px-8">
            <Breadcrumb
                items={[
                    {
                        title: (
                            <Link href="/" className="text-gray-500 hover:text-blue-600">
                                <HomeOutlined />
                            </Link>
                        ),
                    },
                    {
                        title: (
                            <Link href="/blog" className="text-gray-500 hover:text-blue-600">
                                Blog
                            </Link>
                        ),
                    },
                    {
                        title: (
                            <span className="text-gray-800 font-medium truncate max-w-[200px] md:max-w-md inline-block align-bottom">
                                {blog.title}
                            </span>
                        ),
                    },
                ]}
                className="mb-8 text-sm"
            />

            <div className="flex flex-col lg:flex-row gap-3 md:gap-5">
                {/* Main Content */}
                <article className="flex-1 bg-white rounded-2xl shadow-sm p-6 md:p-10 border border-gray-100">
                    <header className="mb-10 text-center max-w-3xl mx-auto">
                        <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 leading-tight">
                            {blog.title}
                        </h1>

                        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm flex-wrap">
                            <span className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                {new Date(blog.createdDate).toLocaleDateString("vi-VN", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                            {blog.categoryName && (
                                <>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className="text-blue-600 font-medium">{blog.categoryName}</span>
                                </>
                            )}
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>KMP Cosmetics</span>
                        </div>
                    </header>

                    {blog.thumbnail && (
                        <div className="relative w-full aspect-video mb-10 rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src={blog.thumbnail}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-img:rounded-xl prose-img:shadow-md">
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                        <Link
                            href="/blog"
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Quay lại danh sách
                        </Link>
                    </div>
                </article>

                {/* Sidebar */}
                <div className="flex flex-col gap-3 md:gap-5 lg:w-80">
                    <HotProducts />
                    <RelatedBlogs currentBlogId={blog.id} categoryId={blog.category?.id} />
                </div>
            </div>
        </div>
    );
}
