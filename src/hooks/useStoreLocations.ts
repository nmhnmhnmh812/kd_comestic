import { useQuery } from "@tanstack/react-query";
import { getStoreLocations } from "@/api/storeLocation";

export const useStoreLocations = () => {
  return useQuery({
    queryKey: ["store-locations"],
    queryFn: getStoreLocations,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
