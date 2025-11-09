import banner3 from "@/assets/images/banner3.png";
import Image from "next/image";
import Link from "next/link";
import Product from "../../../components/Product";
import clsx from "clsx";

interface PromoteSessionProps {
  title: string;
  categories: {
    title: string;
    link: string;
  }[];
  seeAllLink: string;
  reverse?: boolean;
}

export default function PromoteSession({
  title,
  categories,
  seeAllLink,
  reverse = false,
}: PromoteSessionProps) {
  return (
    <div
      className={clsx(
        "bg-white flex flex-col lg:flex-row rounded-lg overflow-hidden",
        reverse && "lg:flex-row-reverse"
      )}
    >
      {/* Banner section - full width on mobile, side column on desktop */}
      <div className="flex flex-col w-full lg:w-1/4">
        <div className="h-12 uppercase bg-black text-white font-bold flex justify-center items-center">
          <span className="text-sm sm:text-base">{title}</span>
        </div>
        <div className="flex-1 relative aspect-[16/9] lg:aspect-auto">
          <Image alt={title} src={banner3} fill className="object-cover" />
        </div>
      </div>
      
      {/* Products section */}
      <div className="flex-1">
        <div
          className={clsx(
            "flex flex-wrap sm:flex-nowrap justify-between items-center h-auto sm:h-12 px-4 py-2 sm:py-0 bg-gray-200 gap-2",
            reverse && "lg:flex-row-reverse"
          )}
        >
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
            {categories.map((category, index) => (
              <Link
                key={category.link + index}
                href={category.link}
                className="uppercase text-gray-600 hover:text-black hover:font-bold transition-all whitespace-nowrap"
              >
                {category.title}
              </Link>
            ))}
          </div>
          <Link
            href={seeAllLink}
            className="text-red-600 font-bold text-xs sm:text-sm uppercase whitespace-nowrap"
          >
            Xem thêm
          </Link>
        </div>

        {/* Product grid - responsive columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Product key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
