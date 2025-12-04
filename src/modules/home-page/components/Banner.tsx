"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getBanners } from "@/api/banner";
import { ResponseApi, Banner as BannerType } from "@/types";
import { Skeleton, Carousel } from "antd";

// Component to render a single banner
const BannerItem = ({ banner }: { banner: BannerType }) => {
  const bannerContent = (
    <div className="relative w-full h-full overflow-hidden md:rounded-lg group">
      <Image
        alt={banner.title || "Banner"}
        src={banner.imageUrl}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        priority
      />
    </div>
  );

  if (banner.link) {
    return (
      <Link href={banner.link} target="_blank" rel="noopener noreferrer">
        {bannerContent}
      </Link>
    );
  }

  return bannerContent;
};

export default function Banner() {
  const { data, isLoading, error } = useQuery({
    queryKey: [ENDPOINTS.BANNERS],
    queryFn: async () => {
      const response: ResponseApi = await getBanners({
        status: true,
        now: new Date().toISOString(),
      });

      // Safe check for response structure
      if (!response?.data?.result) {
        console.error("Invalid banner response:", response);
        return [];
      }

      return response.data.result as BannerType[];
    },
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      // Sort by displayOrder ascending and take only first 4
      const sorted =
        data?.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) ||
        [];
      return sorted;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-[1320px] aspect-[3/1]">
          <Skeleton.Image active className="w-full h-full" />
        </div>
      </div>
    );
  }

  // No banners or error - don't show anything
  if (error || !data || data.length === 0) {
    return null;
  }

  const bannerCount = data.length;

  // Render based on banner count
  const renderDesktopBanners = () => {
    // Case 1: Single banner
    if (bannerCount === 1) {
      return (
        <div className="w-full h-full">
          <BannerItem banner={data[0]} />
        </div>
      );
    }

    // Case 2: Two banners - show 2 in 1 row
    if (bannerCount === 2) {
      return (
        <div className="w-full h-full flex gap-2">
          <div className="flex-1 h-full">
            <BannerItem banner={data[0]} />
          </div>
          <div className="flex-1 h-full">
            <BannerItem banner={data[1]} />
          </div>
        </div>
      );
    }

    // Case 3: Three banners - 1 main + 2 side
    if (bannerCount === 3) {
      return (
        <div className="w-full h-full flex gap-2">
          <div className="flex-[3] h-full">
            <BannerItem banner={data[0]} />
          </div>
          <div className="flex-[2] h-full flex flex-col gap-2">
            <div className="flex-1">
              <BannerItem banner={data[1]} />
            </div>
            <div className="flex-1">
              <BannerItem banner={data[2]} />
            </div>
          </div>
        </div>
      );
    }

    // Case 4: Four banners - current layout (1 left + 1 main + 2 right)
    return (
      <div className="w-full h-full flex gap-2">
        <div className="w-1/5 h-full">
          <BannerItem banner={data[0]} />
        </div>
        <div className="flex-1 h-full relative">
          <Carousel
            autoplay
            autoplaySpeed={3000}
            className="absolute inset-0 banner-carousel"
          >
            {data.slice(3).map((banner, index) => (
              <div key={index} className="relative w-full h-full">
                <BannerItem banner={banner} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-1/5 h-full flex flex-col gap-2">
          <div className="flex-1">
            <BannerItem banner={data[1]} />
          </div>
          <div className="flex-1">
            <BannerItem banner={data[2]} />
          </div>
        </div>
      </div>
    );
  };

  // Mobile carousel
  const renderMobileCarousel = () => {
    return (
      <Carousel autoplay className="w-full">
        {data.map((banner, index) => (
          <div key={index} className="w-full aspect-[16/9]">
            <BannerItem banner={banner} />
          </div>
        ))}
      </Carousel>
    );
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-[1320px]">
        {/* Desktop view */}
        <div className="hidden md:block w-full aspect-[3/1]">
          {renderDesktopBanners()}
        </div>
        {/* Mobile view - carousel */}
        <div className="block md:hidden w-full">{renderMobileCarousel()}</div>
      </div>
    </div>
  );
}
