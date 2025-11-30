import type { Metadata } from "next";
import { getProductById } from "@/api/product";
import ProductScreen from "@/modules/product";
import { notFound } from "next/navigation";

// Helper to extract ID from slug (e.g., "product-name.123" -> "123")
const extractIdFromSlug = (slug: string): string | undefined => {
  const parts = slug.split(".");
  return parts.length > 1 ? parts[parts.length - 1] : undefined;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const productId = extractIdFromSlug(resolvedParams.slug[0]);

  if (!productId) {
    return {
      title: "Sản phẩm không tìm thấy",
    };
  }

  try {
    const response = await getProductById(productId);
    const product = response?.data?.data?.result ?? response?.data?.data;

    return {
      title: product?.name || "Sản phẩm",
      description: product?.description?.substring(0, 160) || "",
    };
  } catch {
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
  const productId = extractIdFromSlug(resolvedParams.slug[0]);

  // Return 404 if no product ID is found in the URL
  if (!productId) {
    notFound();
  }

  // Extract variant ID from second slug segment if present (e.g., "variant-name.456")
  const variantId = resolvedParams.slug[1]
    ? extractIdFromSlug(resolvedParams.slug[1])
    : undefined;

  const { data } = await getProductById(productId);
  const { product, variants } = data?.result;
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <ProductScreen
      product={product}
      variants={variants?.length ? variants : [{ ...product, id: undefined }]}
      initialVariantId={variantId ? parseInt(variantId, 10) : undefined}
    />
  );
}
