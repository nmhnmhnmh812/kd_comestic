import { ENDPOINTS, getBrands } from "@/api/brand";
import { Brand, ResponseApi } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useMemo } from "react";

export default function useBrands(keyword: string) {
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [ENDPOINTS.BRANDS, keyword],
      queryFn: async ({ pageParam = 0 }) => {
        const response: ResponseApi = await getBrands({
          page: pageParam,
          size: 150,
          keyword: keyword,
        });
        return response.data.result;
      },
      getNextPageParam: (lastPage, allPages) => {
        const totalPages = lastPage.totalPages;
        const nextPage = allPages.length;
        return nextPage < totalPages ? nextPage : undefined;
      },
      initialPageParam: 0,
      select: (data) => ({
        pages: data.pages.flatMap((page) =>
          page.content.filter((brand: Brand) => !brand?.isDeleted)
        ),
        pageParams: data.pageParams,
      }),
    });

  const brands = useMemo(() => (data?.pages || []) as Brand[], [data?.pages]);

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Smooth scroll to section
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    // Listen to hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Handle initial hash
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [brands]);

  // Group brands by first letter
  const groupedBrands = useMemo(() => {
    return brands.reduce((acc, brand) => {
      const firstLetter = brand.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(brand);
      return acc;
    }, {} as Record<string, Brand[]>);
  }, [brands]);

  const sortedLetters = useMemo(() => {
    return Object.keys(groupedBrands).sort();
  }, [groupedBrands]);

  return {
    brands,
    groupedBrands,
    sortedLetters,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    loaderRef,
  };
}
