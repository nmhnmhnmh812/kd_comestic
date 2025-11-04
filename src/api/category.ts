import baseAxios from ".";

export const ENDPOINTS = {
  CATEGORIES: "/categories",
  SUB_CATEGORIES: "/subcategories",
};

export async function getCategories() {
  return await baseAxios.get(ENDPOINTS.CATEGORIES);
}

export async function addCategory(data: { name: string }) {
  return await baseAxios.post(ENDPOINTS.CATEGORIES, data);
}

export async function updateCategory(data: {
  name: string;
  categoryId: number;
}) {
  return await baseAxios.put(
    `${ENDPOINTS.CATEGORIES}/${data.categoryId}`,
    data
  );
}

export async function addSubCategory(params: {
  name: string;
  categoryId: number;
}) {
  return await baseAxios.post(ENDPOINTS.SUB_CATEGORIES, params);
}

export async function updateSubCategory(params: {
  name: string;
  categoryId: number;
  subCategoryId: number;
}) {
  return await baseAxios.put(
    `${ENDPOINTS.SUB_CATEGORIES}/${params.subCategoryId}`,
    params
  );
}

export async function getSubCategories(params: { categoryId: number }) {
  return await baseAxios.get(ENDPOINTS.SUB_CATEGORIES, { params });
}
