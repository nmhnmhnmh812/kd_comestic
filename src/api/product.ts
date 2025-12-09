import baseAxios from ".";

export const ENDPOINTS = {
  PRODUCT: "/products",
  SEARCH: "/products/search",
};

export async function getProducts(params) {
  return await baseAxios.get(ENDPOINTS.SEARCH, { params });
}

export async function getProductById(id: string) {
  return await baseAxios.get(`${ENDPOINTS.PRODUCT}/${id}`);
}

export async function increaseProductView(id: number) {
  return await baseAxios.put(`${ENDPOINTS.PRODUCT}/${id}/increase-view`);
}
