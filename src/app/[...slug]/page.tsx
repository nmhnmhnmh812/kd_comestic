import { getProductById } from "@/api/product";
import ProductScreen from "@/modules/product";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const [url, id] = resolvedParams.slug[0].split(".");
  const { data } = await getProductById(id);
  const { product, variants } = data?.result;
  if (!product) {
    return <div>Product not found</div>;
  }
  return <ProductScreen product={product} variants={variants} />;
}
