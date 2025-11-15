import { Brand } from "@/types";
import { Spin } from "antd";
import BrandCard from "./BrandCard";

type BrandListProps = {
  brands: Brand[];
  groupedBrands: Record<string, Brand[]>;
  sortedLetters: string[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  loaderRef: React.RefObject<HTMLDivElement>;
};

export default function BrandList({
  brands,
  groupedBrands,
  sortedLetters,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  loaderRef,
}: BrandListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Không tìm thấy thương hiệu nào</p>
      </div>
    );
  }

  return (
    <>
      {/* Brands grouped by letter */}
      {sortedLetters.map((letter) => (
        <div key={letter} id={letter} className="mb-10">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 inline-block pb-2 border-b-4 border-red-600">
              {letter}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {groupedBrands[letter].map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      ))}

      {/* Loading more indicator */}
      <div ref={loaderRef} className="flex justify-center py-8">
        {isFetchingNextPage && <Spin />}
      </div>

      {/* End of list */}
      {!hasNextPage && brands.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          Đã hiển thị tất cả thương hiệu
        </div>
      )}
    </>
  );
}
