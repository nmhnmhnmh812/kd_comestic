import { Blog } from "@/types";
import { convertToUrl, sanitizedDescription } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function BlogItem({ blog }: { blog: Blog }) {
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
        <h2 className="text-lg font-bold mb-2 line-clamp-2">{blog.title}</h2>

        <p
          className="ql-editor text-gray-600 h-[66px] line-clamp-3 p-0"
          dangerouslySetInnerHTML={{
            __html: sanitizedDescription(blog.shortDescription),
          }}
        />
      </div>
    </Link>
  );
}
