import { Brand } from "@/types";
import { convertToUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/danh-muc?brand=${convertToUrl(brand.name, brand.id)}`}
      className="group"
    >
      <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Brand logo */}
        <div className="relative w-full pt-[100%] bg-gray-50">
          {brand.image ? (
            <Image
              src={brand.image.url}
              alt={brand.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-300">
                {brand.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Brand name */}
        <div className="p-3 text-center border-t">
          <h3 className="font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 text-sm">
            {brand.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
