import baseAxios from ".";

export const ENDPOINTS = {
  BLOGS: "/blogs",
  BLOG_CATEGORIES: "/blog-categories",
};

export interface BlogFilterParams {
  page: number;
  size: number;
  keyword?: string;
  categoryId?: number;
  fromDate?: string;
  toDate?: string;
  sort?: string;
}

export async function getBlogs(params: BlogFilterParams) {
  return await baseAxios.get(ENDPOINTS.BLOGS, { params });
}

export async function getBlogById(id: number | string) {
  return await baseAxios.get(`${ENDPOINTS.BLOGS}/${id}`);
}

export async function getBlogCategories() {
  return await baseAxios.get(ENDPOINTS.BLOG_CATEGORIES);
}
