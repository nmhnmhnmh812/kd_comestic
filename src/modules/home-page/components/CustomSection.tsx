import banner3 from "@/assets/images/banner3.png";
import Image from "next/image";
import Product from "../../../components/Product";
import clsx from "clsx";

interface CustomSectionProps {
  sectionName: string;
  products: any[];
  reverse?: boolean;
}

export default function CustomSection({ sectionName, products, reverse = false }: CustomSectionProps) {
  return (
    <div
      className={clsx(
        "bg-white flex flex-col lg:flex-row md:rounded-lg overflow-hidden",
        reverse && "lg:flex-row-reverse"
      )}
    >
      <div className="flex flex-col lg:w-1/4 lg:max-w-[222px] w-full">
        <div className="h-12 uppercase bg-black text-white font-bold flex justify-center items-center">
          <span className="text-sm md:text-base">{sectionName}</span>
        </div>
        <div className="flex-1 relative min-h-[200px] lg:min-h-0 hidden md:block">
          <Image alt="" src={banner3} fill className="object-cover" />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-end items-center h-12 px-4 bg-gray-200">
          <span className="text-red-600 font-bold text-xs md:text-sm uppercase">
            Sản phẩm đặc biệt
          </span>
        </div>
        {products.length > 0 ? (
          <div className="p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {products.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400 text-sm">Chưa có sản phẩm</div>
        )}
      </div>
    </div>
  );
}
