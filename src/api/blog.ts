import baseAxios from ".";

export const ENDPOINTS = {
  BLOGS: "/blogs",
};

export async function getBlogs(params: { page: number; size: number }) {
  return await baseAxios.get(ENDPOINTS.BLOGS, { params });
}

export async function getBlogById(id: number | string) {
  return await baseAxios.get(`${ENDPOINTS.BLOGS}/${id}`);
}
