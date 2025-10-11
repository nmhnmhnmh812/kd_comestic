import CategoryScreen from "@/modules/danh-muc";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return <CategoryScreen params={params} />;
}
