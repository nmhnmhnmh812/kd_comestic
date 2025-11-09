import { PRODUCT_DEMO_LIST } from "@/constants";
import { convertToUrl } from "@/utils";
import { Breadcrumb } from "antd";
import Link from "next/link";
import ProductDetail from "./components/ProductDetail";
import ProductDescription from "./components/ProductDescription";
import SideSession from "./components/SideSession";

export default function ProductScreen({ slug }: { slug: string[] }) {
  const [url, id] = slug[0].split(".");
  const product = PRODUCT_DEMO_LIST.find((item) => item.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const categoryUrl = convertToUrl(product.category.name);
  const subCategoryUrl = convertToUrl(
    product.subCategory.name,
    product.subCategory.id
  );

  const breadcrumbItems = [
    {
      title: <Link href="/">Trang chủ</Link>,
    },
    {
      title: product.category ? (
        <Link href={`/danh-muc/${categoryUrl}`}>{product.category.name}</Link>
      ) : null,
    },
    {
      title: product.subCategory ? (
        <Link href={`/danh-muc/${categoryUrl}/${subCategoryUrl}`}>
          {product.subCategory.name}
        </Link>
      ) : null,
    },
    {
      title: product.name,
    },
  ];
  return (
    <div className="flex flex-col gap-3 sm:gap-5 py-3 sm:py-5">
      <Breadcrumb items={breadcrumbItems} separator=">" />
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-5">
        <div className="flex flex-col gap-3 sm:gap-5 flex-1">
          <ProductDetail product={product} />
          <ProductDescription product={product} />
        </div>
        <div className="flex flex-col gap-3 sm:gap-5 lg:w-80">
          <SideSession title="Sản phẩm cùng thương hiệu" link="" />
          <SideSession title="Sản phẩm liên quan" link="" />
        </div>
      </div>
    </div>
  );
}
