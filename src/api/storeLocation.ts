import baseAxios from "./index";
import { StoreLocation } from "@/types";

interface StoreLocationResponse {
  code: number;
  result: StoreLocation[];
}

export async function getStoreLocations(): Promise<StoreLocation[]> {
  const response = await baseAxios.get<StoreLocationResponse>("/store-locations");
  return response.data.result || [];
}
