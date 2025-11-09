import baseAxios from ".";

export const ENDPOINTS = {
  SEARCH_BRANDS: "/brands/search",
  BRANDS: "/brands",
};

type addBrandParams = {
  name: string;
  imageUrl?: string;
  link?: string;
  description?: string;
};
type updateBrandParams = { name: string; brandId: number };

export async function getBrands(params) {
  return await baseAxios.get(ENDPOINTS.SEARCH_BRANDS, { params });
}

export async function addBrand(data: addBrandParams) {
  return await baseAxios.post(ENDPOINTS.BRANDS, data);
}

export async function updateBrand(data: updateBrandParams) {
  return await baseAxios.put(ENDPOINTS.BRANDS, data);
}
