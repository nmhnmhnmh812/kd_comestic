import axios from "axios";

// Using the Vietnam provinces API from provinces.open-api.vn
const addressAxios = axios.create({
  baseURL: "https://provinces.open-api.vn/api",
  timeout: 10000,
});

export interface Province {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  phone_code: number;
}

export interface District {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  province_code: number;
}

export interface Ward {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  district_code: number;
}

export interface ProvinceWithDistricts extends Province {
  districts: District[];
}

export interface DistrictWithWards extends District {
  wards: Ward[];
}

// Get all provinces
export async function getProvinces(): Promise<Province[]> {
  const response = await addressAxios.get<Province[]>("/");
  return response.data;
}

// Get districts of a province
export async function getDistricts(provinceCode: number): Promise<District[]> {
  const response = await addressAxios.get<ProvinceWithDistricts>(`/p/${provinceCode}?depth=2`);
  return response.data.districts || [];
}

// Get wards of a district
export async function getWards(districtCode: number): Promise<Ward[]> {
  const response = await addressAxios.get<DistrictWithWards>(`/d/${districtCode}?depth=2`);
  return response.data.wards || [];
}
