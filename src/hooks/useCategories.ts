import { ENDPOINTS, getCategories } from "@/api/category";
import { useQuery } from "@tanstack/react-query";

export default function useCategories() {
  const { data, isFetching, error } = useQuery({
    queryKey: [ENDPOINTS.CATEGORIES],
    queryFn: async () => {
      const response = await getCategories();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  return {
    categories: data?.result || [],
    isFetching,
    error,
  };
}
