import type { Metadata } from "next";
import { SLUG_MAP } from "@/constants";
import CategoryScreen from "@/modules/danh-muc";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.slug[0];

  const { slug } = SLUG_MAP[categorySlug] || {
    slug: { title: "Danh mục", id: 0 },
  };

  return {
    title: slug.title || decodeURIComponent(categorySlug),
    description: `Xem sản phẩm trong danh mục ${slug.title}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return <CategoryScreen params={params} />;
}
