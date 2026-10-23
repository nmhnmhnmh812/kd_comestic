import type { Metadata } from "next";
import { getProductById } from "@/api/product";
import ProductScreen from "@/modules/product";
import { notFound } from "next/navigation";
import { cache } from "react";
import type { Product, Variant } from "@/types";

// Share one API request between the page and its metadata during server rendering.
const getProductDetail = cache(async (id: string) => {
  const { data } = await getProductById(id);
  return data?.result as
    | { product: Product; variants?: Variant[] }
    | undefined;
});

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
    const detail = await getProductDetail(productId);
    const product = detail?.product;
    if (!product) {
      return { title: "Sản phẩm không tìm thấy" };
    }

    const variants = detail.variants ?? [];
    const variantId = resolvedParams.slug[1]
      ? extractIdFromSlug(resolvedParams.slug[1])
      : undefined;
    const selectedVariant = variants.find(
      (variant) => String(variant.id) === variantId
    );
    const image =
      selectedVariant?.blobs?.find((blob) => blob.url)?.url ||
      product.blobs?.find((blob) => blob.url)?.url ||
      variants.flatMap((variant) => variant.blobs ?? []).find((blob) => blob.url)
        ?.url ||
      "/og-image.jpg";
    const title = product.name;
    const description =
      product.description
        ?.replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;|&#160;/gi, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 160) || `${title} tại Mỹ phẩm Khánh Diễm.`;
    const url = `https://myphamkhanhdiem.vn/${resolvedParams.slug
      .map(encodeURIComponent)
      .join("/")}`;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        siteName: "Mỹ phẩm Khánh Diễm",
        locale: "vi_VN",
        type: "website",
        images: [{ url: image, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
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

  const detail = await getProductDetail(productId);
  const product = detail?.product;
  const variants = detail?.variants;
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
