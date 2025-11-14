import type { Metadata } from "next";
import { getProductById } from "@/api/product";
import ProductScreen from "@/modules/product";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const [url, id] = resolvedParams.slug[0].split(".");

  try {
    const response = await getProductById(id);
    const product = response?.data?.data?.result ?? response?.data?.data;

    return {
      title: product?.name || "Sản phẩm",
      description: product?.description?.substring(0, 160) || "",
    };
  } catch (error) {
    return {
      title: "Sản phẩm",
    };
  }
}

export default async function ProductDetailScreen({
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
  return (
    <ProductScreen
      product={product}
      variants={variants?.length ? variants : [product]}
    />
  );
}
