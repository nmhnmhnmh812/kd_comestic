import { ENDPOINTS, getBrands } from "@/api/brand";
import { ResponseApi } from "@/types";
import BrandContainer from "@/modules/thuong-hieu/BrandContainer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function BrandPage() {
  const queryClient = new QueryClient();

  // Prefetch initial brands data
  await queryClient.prefetchInfiniteQuery({
    queryKey: [ENDPOINTS.BRANDS],
    queryFn: async () => {
      const response: ResponseApi = await getBrands({
        page: 0,
        size: 150,
      });
      return response.data.result;
    },
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BrandContainer />
    </HydrationBoundary>
  );
}
