import baseAxios from ".";

export const ENDPOINTS = {
  BANNERS: "/banners",
};

export async function getBanners(params: { status?: boolean; now?: string }) {
  return await baseAxios.get(ENDPOINTS.BANNERS, { params });
}
