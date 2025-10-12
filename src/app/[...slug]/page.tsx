import ProductScreen from "@/modules/product";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  return <ProductScreen slug={resolvedParams.slug} />;
}
