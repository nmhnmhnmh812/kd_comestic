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
        "bg-white flex rounded-md overflow-hidden",
        reverse && "flex-row-reverse"
      )}
    >
      <div className="flex flex-col w-1/4">
        <div className="h-12 uppercase bg-black text-white font-bold flex justify-center items-center">
          <span>{title}</span>
        </div>
        <div className="flex-1 relative">
          <Image alt="" src={banner3} fill />
        </div>
      </div>
      <div>
        <div
          className={clsx(
            "flex justify-between items-center h-12 px-4 bg-gray-200",
            reverse && "flex-row-reverse"
          )}
        >
          <div className="flex gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.link + index}
                href={category.link}
                className="uppercase text-gray-600 hover:text-black hover:font-bold transition-all text-sm"
              >
                {category.title}
              </Link>
            ))}
          </div>
          <Link
            href={seeAllLink}
            className="text-red-600 font-bold text-sm uppercase"
          >
            Xem thêm
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-2 p-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Product key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
