import Product from "@/components/Product";
import ProductFilter from "./ProductFilter";
import { Pagination } from "antd";
import { ISlug } from "@/types";

export default function ProductContainer({ slug }: { slug?: ISlug }) {
  const { title, id } = slug || { title: "", id: 0 };

  return (
    <div className="w-full">
      <h1 className="text-lg sm:text-xl font-bold uppercase p-3 sm:p-5">{title}</h1>
      <ProductFilter />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-2">
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <Product key={index} />
          ))}
      </div>
      <div className="p-2">
        <Pagination align="end" />
      </div>
    </div>
  );
}
