import { ENDPOINTS, getProducts } from "@/api/product";
import ProductCard from "@/components/Product";
import {
  Brand,
  Category,
  type Product as ProductType,
  ResponseApi,
} from "@/types";
import { convertToUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { Button, Divider, message, Spin } from "antd";
import Link from "next/link";

export default function SideSession({
  title,
  brand,
  category,
  subCategory,
  currentProductId, // ← Thêm prop này
}: {
  title: string;
  brand?: Brand;
  category?: ProductType["category"];
  subCategory?: ProductType["subCategory"];
  currentProductId?: number; // ← Thêm type này
}) {
  const brandId = brand?.id;
  const categoryId = category?.id;
  const subCategoryId = subCategory?.id;

  const generateLink = () => {
    if (brandId) {
      const urlBrand = convertToUrl(brand?.name || "", brandId);
      return `/danh-muc?brand=${urlBrand}`;
    }
    if (subCategoryId) {
      const urlSubCategory = convertToUrl(
        subCategory?.name || "",
        subCategoryId
      );
      const urlCategory = convertToUrl(category?.name || "", categoryId || 0);
      return `/danh-muc/${urlCategory}/${urlSubCategory}`;
    }
    if (categoryId) {
      const urlCategory = convertToUrl(category?.name || "", categoryId);
      return `/danh-muc/${urlCategory}`;
    }
    return "/danh-muc";
  };

  const { data: products, isFetching } = useQuery<ProductType[]>({
    queryKey: [ENDPOINTS.SEARCH, categoryId, subCategoryId, brandId],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getProducts({
        categoryId: categoryId || undefined,
        subCategoryId: subCategoryId || undefined,
        brandId: brandId || undefined,
        page: 0,
        size: 4,
      });
      if (error) {
        message.error(error || "Đã có lỗi xảy ra");
      }
      let productList = data?.result?.content || [];

      // ← Lọc bỏ sản phẩm hiện tại
      if (currentProductId) {
        productList = productList.filter((p) => p.id !== currentProductId);
      }

      return productList;
    },
    staleTime: 5 * 60 * 1000,
  });

  const renderProducts = products?.length ? (
    products.map((product) => <ProductCard key={product.id} {...product} />)
  ) : (
    <p className="text-center py-10 text-gray-500 text-sm">
      Không có sản phẩm nào
    </p>
  );

  return (
    <div className="bg-white rounded-lg w-full lg:w-[220px] overflow-hidden shadow-sm">
      <h2 className="font-semibold text-sm md:text-base text-center py-2">
        {title}
      </h2>
      <Divider className="my-0" />
      <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2 p-2">
        {!isFetching ? (
          renderProducts
        ) : (
          <div className="flex justify-center py-10 col-span-full">
            <Spin />
          </div>
        )}
      </div>
      <Button
        color="default"
        variant="filled"
        className="w-full rounded-none text-xs md:text-sm"
      >
        <Link href={generateLink()}>Xem tất cả</Link>
      </Button>
    </div>
  );
}
