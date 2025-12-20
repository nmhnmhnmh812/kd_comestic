import React from "react";

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  priceRange?: string;
  image?: string;
}

export default function LocalBusinessSchema({
  name = "Mỹ phẩm Khánh Diễm",
  description = "Mỹ phẩm Khánh Diễm chuyên cung cấp mỹ phẩm chính hãng, an toàn, giá tốt.",
  url = "https://myphamkhanhdiem.vn",
  telephone = "",
  email = "",
  address,
  priceRange = "$$",
  image = "https://myphamkhanhdiem.vn/og-image.jpg",
}: LocalBusinessSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": url,
    name: name,
    description: description,
    url: url,
    image: image,
    priceRange: priceRange,
    ...(telephone && { telephone: telephone }),
    ...(email && { email: email }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        ...address,
      },
    }),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: string;
  brand?: string;
  sku?: string;
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  currency = "VND",
  availability = "https://schema.org/InStock",
  brand = "Mỹ phẩm Khánh Diễm",
  sku,
}: ProductSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    image: image,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    ...(sku && { sku: sku }),
    offers: {
      "@type": "Offer",
      url: typeof window !== "undefined" ? window.location.href : "",
      priceCurrency: currency,
      price: price,
      availability: availability,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  item: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mỹ phẩm Khánh Diễm",
    url: "https://myphamkhanhdiem.vn",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://myphamkhanhdiem.vn/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
