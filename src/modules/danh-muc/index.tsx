import { Breadcrumb } from "antd";
import Link from "next/link";
import NavFilter from "./components/NavFilter";
import ProductContainer from "./components/ProductContainer";
import { SLUG_MAP } from "@/constants";
import CategorySidebar from "@/components/CategorySidebar";

export default async function CategoryScreen({
  params,
}: {
  params: Promise<{
    slug: string[];
  }>;
}) {
  const resolvedParams = await params;

  const categorySlug = resolvedParams.slug[0];
  const { slug, ...rest } = SLUG_MAP[categorySlug] || {
    slug: { title: "", id: 0 },
    categories: [],
  };
  const breadcrumbItems = [
    {
      title: <Link href="/">Trang chủ</Link>,
    },
    {
      title: <Link href={`/danh-muc/${categorySlug}`}>Danh mục</Link>,
    },
    {
      title: slug.title || categorySlug,
    },
  ];

  return (
    <div className="py-5 flex flex-col gap-5">
      <Breadcrumb items={breadcrumbItems} separator=">" />
      <div className="flex gap-5">
        <CategorySidebar currentCategoryId={slug.id} />
        <div className="flex gap-5 bg-white rounded-lg overflow-hidden flex-1">
          <NavFilter filter={rest} path={resolvedParams.slug} />
          <ProductContainer slug={slug} />
        </div>
      </div>
    </div>
  );
}
