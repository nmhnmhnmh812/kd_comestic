import baseAxios from ".";

export const ENDPOINTS = {
  BLOGS: "/blogs",
  BLOG_DETAIL: (blogId: number) => `/blogs/${blogId}`,
  BLOG_CATEGORIES: "/blog-categories",
};

export async function getBlogs(params: {
  page: number;
  size: number;
  keyword?: string;
  categoryId?: number;
  fromDate?: string;
  toDate?: string;
}) {
  return await baseAxios.get(ENDPOINTS.BLOGS, { params });
}

export async function getBlogCategories() {
  return await baseAxios.get(ENDPOINTS.BLOG_CATEGORIES);
}

export async function getBlogBySlug(blogId: number) {
  return await baseAxios.get(ENDPOINTS.BLOG_DETAIL(blogId));
}
