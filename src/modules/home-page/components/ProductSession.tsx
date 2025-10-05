import { Carousel, Divider } from "antd";
import Product from "../../../components/Product";
import Link from "next/link";

interface ProductSessionProps {
  title: string;
  link: string;
}

export default function ProductSession({
  title,
  link = "",
}: ProductSessionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="text-red-600 uppercase flex justify-between items-center font-bold px-4 py-2">
        <span>{title}</span>
        <Link href={link} className="cursor-pointer text-sm">
          Xem tất cả
        </Link>
      </div>
      <Divider className="mt-0 mb-1" />
      <Carousel
        dots={false}
        slidesToShow={6}
        slidesToScroll={2}
        infinite
        arrows
        adaptiveHeight
        className="px-1"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Product key={index} />
        ))}
      </Carousel>
    </div>
  );
}
