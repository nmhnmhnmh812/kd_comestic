import baseAxios from ".";

export const ENDPOINTS = {
  BLOGS: "/blogs",
  BLOG_DETAIL: (blogId: number) => `/blogs/${blogId}`,
};

export async function getBlogs(params: { page: number; size: number }) {
  return await baseAxios.get(ENDPOINTS.BLOGS, { params });
}

export async function getBlogBySlug(blogId: number) {
  return await baseAxios.get(ENDPOINTS.BLOG_DETAIL(blogId));
}
