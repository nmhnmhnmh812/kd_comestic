import { ENDPOINTS, getProducts } from "@/api/product";
import Product from "@/components/Product";
import { type Product as ProductType, ResponseApi } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Button, Divider, message, Spin } from "antd";

export default function SideSession({
  title,
  link,
  brandId,
  categoryId,
  subCategoryId,
}: {
  title: string;
  link: string;
  brandId?: number;
  categoryId?: number;
  subCategoryId?: number;
}) {
  const { data: products, isFetching } = useQuery<ProductType[]>({
    queryKey: [ENDPOINTS.SEARCH, categoryId, subCategoryId, brandId],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getProducts({
        categoryId: categoryId || undefined,
        subCategoryId: subCategoryId || undefined,
        brandId: brandId || undefined,
        page: 0,
        size: 2,
      });
      if (error) {
        message.error(error || "Đã có lỗi xảy ra");
      }
      const products = data?.result?.content || [];
      return products;
    },
    staleTime: 5 * 60 * 1000,
  });

  const renderPropducts = products?.length ? (
    products.map((product) => <Product key={product.id} {...product} />)
  ) : (
    <p className="text-center py-10">Không có sản phẩm nào</p>
  );

  return (
    <div className="bg-white rounded-lg w-[220px] overflow-hidden">
      <h2 className="font-semibold text-sm text-center py-2">{title}</h2>
      <Divider className="my-0" />
      <div className="flex flex-col gap-2 p-2">
        {!isFetching ? renderPropducts : <Spin className="py-10" />}
      </div>
      <Button color="default" variant="filled" className="w-full rounded-none">
        Xem tất cả
      </Button>
    </div>
  );
}
