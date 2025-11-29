"use client";

import Image from "next/image";
import Link from "next/link";
import banner1 from "@/assets/images/banner1.jpg";
import banner3 from "@/assets/images/banner3.png";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getBanners } from "@/api/banner";
import { ResponseApi, Banner as BannerType } from "@/types";
import { Skeleton } from "antd";

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
      // Sort by displayOrder ascending
      return (
        data?.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) ||
        []
      );
    },
  });

  console.log(data);

  const mainBanner = data?.[0]; // First banner (middle - main)
  const topRightBanner = data?.[1]; // Second banner (top right)
  const bottomRightBanner = data?.[2]; // Third banner (bottom right)

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-7xl aspect-[3/1] flex flex-col md:flex-row gap-2">
        {/* Left Banner - Fixed */}
        {/* Left banner - hide on mobile */}
        <div className="hidden md:block h-full w-1/5 relative overflow-hidden rounded-lg">
          <Image
            alt="Banner Left"
            src={banner1}
            fill
            className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>

        {/* Middle Banner - From API */}
        {/* Main banner */}
        <div className="flex-1 h-full relative overflow-hidden rounded-lg group">
          {isLoading ? (
            <Skeleton.Image active className="w-full h-full" />
          ) : error || !mainBanner?.imageUrl ? (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">No banner available</span>
            </div>
          ) : mainBanner.link ? (
            <Link
              href={mainBanner.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt={mainBanner.title || "Main Banner"}
                src={mainBanner.imageUrl}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
              {mainBanner.description && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-center px-4">
                    {mainBanner.description}
                  </p>
                </div>
              )}
            </Link>
          ) : (
            <Image
              alt={mainBanner.title || "Main Banner"}
              src={mainBanner.imageUrl}
              fill
              className="object-fill rounded-lg group-hover:scale-105 transition-transform duration-300"
              priority
            />
          )}
        </div>

        {/* Right Banners - Fixed */}
        {/* Right banners - hide on mobile */}
        <div className="hidden md:flex h-full w-1/5 relative flex-col gap-2">
          {/* Top Right */}
          <div className="flex-1 relative overflow-hidden rounded-lg">
            <Image
              alt="Banner Top Right"
              src={banner3}
              fill
              className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Bottom Right - From API (fallback to banner3) */}
          <div className="flex-1 relative overflow-hidden rounded-lg group">
            {isLoading ? (
              <Skeleton.Image active className="w-full h-full" />
            ) : error || !bottomRightBanner?.imageUrl ? (
              <Image
                alt="Banner Bottom Right"
                src={banner3}
                fill
                className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            ) : bottomRightBanner.link ? (
              <Link
                href={bottomRightBanner.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt={bottomRightBanner.title || "Bottom Right Banner"}
                  src={bottomRightBanner.imageUrl}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            ) : (
              <Image
                alt={bottomRightBanner.title || "Bottom Right Banner"}
                src={bottomRightBanner.imageUrl}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
