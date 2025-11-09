import baseAxios from ".";

export const ENDPOINTS = {
  BANNERS: "/banners",
};

type addBrandParams = {
  id?: number;
  title: string;
  imageUrl: string;
  link: string;
  description: string;
  status: boolean;
  startDate: string;
  endDate: string;
  displayOrder: number;
};
type updateBannerParams = { title: string; bannerId: number };

export async function getBanners(params: { status?: boolean; now?: string }) {
  return await baseAxios.get(ENDPOINTS.BANNERS, { params });
}

export async function addBanner(data: addBrandParams) {
  return await baseAxios.post(ENDPOINTS.BANNERS, data);
}

export async function updateBanner(data: addBrandParams) {
  return await baseAxios.put(`${ENDPOINTS.BANNERS}/${data.id}`, data);
}
