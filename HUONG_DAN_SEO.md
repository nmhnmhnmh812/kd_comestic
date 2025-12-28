# Hướng dẫn sử dụng SEO Components

## 1. Sử dụng ProductSchema cho trang sản phẩm

Mở file trang chi tiết sản phẩm của bạn và thêm:

```tsx
import { ProductSchema } from "@/components/StructuredData";

export default function ProductDetailPage({ product }) {
  return (
    <>
      {/* Thêm ProductSchema vào đầu trang */}
      <ProductSchema
        name={product.name}
        description={product.description}
        image={product.imageUrl}
        price={product.price}
        currency="VND"
        availability="https://schema.org/InStock" // hoặc "https://schema.org/OutOfStock"
        brand="Mỹ phẩm Khánh Diễm"
        sku={product.sku} // optional
      />

      {/* Nội dung trang của bạn */}
      <div>
        <h1>{product.name}</h1>
        {/* ... */}
      </div>
    </>
  );
}
```

## 2. Sử dụng BreadcrumbSchema

Thêm breadcrumb schema cho navigation:

```tsx
import { BreadcrumbSchema } from "@/components/StructuredData";

export default function CategoryPage() {
  const breadcrumbItems = [
    { name: "Trang chủ", item: "https://myphamkhanhdiem.vn" },
    { name: "Danh mục", item: "https://myphamkhanhdiem.vn/danh-muc" },
    { name: "Dưỡng da", item: "https://myphamkhanhdiem.vn/danh-muc/duong-da" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      {/* Nội dung trang */}
    </>
  );
}
```

## 3. Thêm Metadata cho từng trang

### Trang sản phẩm

```tsx
// app/products/[slug]/page.tsx
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.slug);

  return {
    title: `${product.name} - Mỹ phẩm Khánh Diễm`,
    description: product.description,
    keywords: [product.category, product.brand, "mỹ phẩm chính hãng"],
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: "product",
    },
  };
}
```

### Trang danh mục

```tsx
// app/danh-muc/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const category = await getCategory(params.slug);

  return {
    title: `${category.name} - Mỹ phẩm Khánh Diễm`,
    description: `Khám phá ${category.name} chính hãng tại Mỹ phẩm Khánh Diễm. ${category.description}`,
    keywords: [category.name, "mỹ phẩm chính hãng", category.keywords],
  };
}
```

### Trang blog

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  return {
    title: `${post.title} - Blog Mỹ phẩm Khánh Diễm`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}
```

## 4. Cập nhật Dynamic Sitemap

Mở file `src/app/sitemap.ts` và thêm:

```tsx
import type { MetadataRoute } from "next";

export default async function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://myphamkhanhdiem.vn";

  // Fetch products
  const products = await fetch(`${process.env.API_URL}/products`).then((r) =>
    r.json()
  );
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Fetch blog posts
  const posts = await fetch(`${process.env.API_URL}/blog/posts`).then((r) =>
    r.json()
  );
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Fetch categories
  const categories = await fetch(`${process.env.API_URL}/categories`).then(
    (r) => r.json()
  );
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/danh-muc/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Static pages
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    // ... other static pages
  ];

  return [...staticUrls, ...categoryUrls, ...productUrls, ...postUrls];
}
```

## 5. Tối ưu hình ảnh

Luôn sử dụng `next/image` thay vì `<img>`:

```tsx
import Image from 'next/image';

// ❌ Không tốt
<img src="/product.jpg" alt="Product" />

// ✅ Tốt
<Image
  src="/product.jpg"
  alt="Mô tả chi tiết sản phẩm"
  width={800}
  height={600}
  priority={false} // true cho hình ảnh above the fold
  loading="lazy"
  quality={85}
/>
```

## 6. Thêm Alt Text cho tất cả hình ảnh

```tsx
// ❌ Không tốt
<Image src="/lipstick.jpg" alt="" />

// ✅ Tốt
<Image
  src="/lipstick.jpg"
  alt="Son môi Dior Rouge màu đỏ cam vintage chính hãng"
  width={400}
  height={400}
/>
```

## 7. Cấu trúc Heading đúng

```tsx
// ❌ Không tốt - Nhiều H1
<h1>Trang chủ</h1>
<h1>Sản phẩm nổi bật</h1>

// ✅ Tốt - Chỉ 1 H1, H2, H3 có thứ tự
<h1>Mỹ phẩm Khánh Diễm - Mỹ phẩm chính hãng</h1>
<h2>Sản phẩm nổi bật</h2>
<h3>Son môi</h3>
<h3>Kem dưỡng da</h3>
<h2>Về chúng tôi</h2>
```

## 8. Internal Linking

Liên kết nội bộ giữa các trang:

```tsx
import Link from 'next/link';

<Link href="/danh-muc/duong-da">
  Xem thêm sản phẩm dưỡng da
</Link>

// Trong nội dung blog
<p>
  Để chọn được <Link href="/blog/cach-chon-kem-duong-da">kem dưỡng da phù hợp</Link>,
  bạn cần xác định loại da của mình...
</p>
```

## 9. Cập nhật LocalBusinessSchema với thông tin đầy đủ

Mở `src/app/layout.tsx`:

```tsx
<LocalBusinessSchema
  name="Mỹ phẩm Khánh Diễm"
  description="Mỹ phẩm chính hãng – Khánh Diễm"
  url="https://myphamkhanhdiem.vn"
  telephone="+84-123-456-789" // Cập nhật số điện thoại thực
  email="contact@myphamkhanhdiem.vn" // Cập nhật email thực
  address={{
    streetAddress: "123 Đường ABC", // Cập nhật địa chỉ thực
    addressLocality: "Quận 1",
    addressRegion: "TP. Hồ Chí Minh",
    postalCode: "700000",
    addressCountry: "VN",
  }}
  priceRange="$$"
  image="https://myphamkhanhdiem.vn/og-image.jpg"
/>
```

## 10. Kiểm tra SEO

### Tools cần dùng:

1. **Rich Results Test**: https://search.google.com/test/rich-results

   - Paste URL của bạn
   - Kiểm tra xem structured data có hợp lệ không

2. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

   - Đảm bảo website responsive

3. **PageSpeed Insights**: https://pagespeed.web.dev/

   - Kiểm tra tốc độ trang
   - Mục tiêu: > 90 điểm

4. **Schema Validator**: https://validator.schema.org/
   - Paste JSON-LD code
   - Verify structured data

## 11. Submit to Google

1. Truy cập [Google Search Console](https://search.google.com/search-console)
2. Thêm property: `myphamkhanhdiem.vn`
3. Verify ownership
4. Submit sitemap: `https://myphamkhanhdiem.vn/sitemap.xml`
5. Request indexing cho các trang quan trọng

---

## ⚠️ Lưu ý quan trọng

- **Unique Content**: Mỗi trang phải có nội dung độc đáo
- **Mobile First**: Tối ưu cho mobile trước
- **Load Speed**: Trang phải load < 3 giây
- **Alt Text**: Tất cả hình ảnh phải có alt text mô tả rõ ràng
- **Internal Links**: Liên kết giữa các trang liên quan
- **Fresh Content**: Cập nhật nội dung thường xuyên
- **No Duplicate**: Tránh nội dung trùng lặp

Chúc bạn thành công! 🚀
