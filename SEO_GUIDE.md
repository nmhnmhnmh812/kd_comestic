# SEO Implementation Guide - Mỹ phẩm Khánh Diễm

## ✅ Đã hoàn thành

### 1. Basic SEO Metadata

- ✅ Cập nhật title, description trong `layout.tsx`
- ✅ Thêm Open Graph tags cho social sharing
- ✅ Thêm Twitter Card tags
- ✅ Thêm viewport và robots directives
- ✅ Thêm canonical URL
- ✅ Thêm keywords

### 2. Technical SEO Files

- ✅ Tạo `robots.txt` trong `/public`
- ✅ Tạo `sitemap.ts` trong `/src/app`
- ✅ Tạo `manifest.ts` cho PWA support

### 3. Structured Data (Schema.org)

- ✅ Tạo components trong `/src/components/StructuredData.tsx`:
  - LocalBusinessSchema
  - ProductSchema
  - BreadcrumbSchema
  - WebsiteSchema
- ✅ Thêm LocalBusinessSchema và WebsiteSchema vào layout

---

## 📋 Cần làm tiếp

### 1. Hình ảnh Open Graph

Tạo file `og-image.jpg` kích thước **1200x630px** và đặt vào `/public`:

```bash
# Tạo hoặc thiết kế ảnh với:
# - Logo Mỹ phẩm Khánh Diễm
# - Slogan: "Mỹ phẩm chính hãng"
# - Màu sắc thương hiệu
```

### 2. Favicon và Icons

Thêm các icon cho PWA:

```
/public/
  - favicon.ico (đã có)
  - icon-192.png (cần tạo)
  - icon-512.png (cần tạo)
  - apple-touch-icon.png (cần tạo)
```

### 3. Google Search Console

1. Truy cập [Google Search Console](https://search.google.com/search-console)
2. Thêm property với domain `myphamkhanhdiem.vn`
3. Verify ownership bằng meta tag
4. Cập nhật verification code vào `layout.tsx`:

```typescript
verification: {
  google: "your-google-verification-code",
}
```

### 4. Google Analytics

Thêm Google Analytics vào website:

```typescript
// src/app/layout.tsx hoặc tạo component riêng
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

### 5. Dynamic Sitemap

Cập nhật `sitemap.ts` để tự động thêm:

- Tất cả sản phẩm từ database
- Tất cả bài viết blog
- Tất cả danh mục
- Tất cả thương hiệu

Ví dụ:

```typescript
// Fetch products from API
const products = await fetch("API_URL/products").then((r) => r.json());
const productUrls = products.map((product) => ({
  url: `${baseUrl}/products/${product.slug}`,
  lastModified: product.updatedAt,
  changeFrequency: "weekly",
  priority: 0.7,
}));

return [...staticUrls, ...productUrls];
```

### 6. Metadata cho từng trang

Thêm metadata riêng cho từng page:

**Trang danh mục:**

```typescript
// src/app/danh-muc/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const category = await getCategory(params.slug);
  return {
    title: `${category.name} - Mỹ phẩm Khánh Diễm`,
    description: category.description,
  };
}
```

**Trang sản phẩm:**

```typescript
// src/app/[...slug]/page.tsx
export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);
  return {
    title: `${product.name} - Mỹ phẩm Khánh Diễm`,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}
```

### 7. Sử dụng ProductSchema

Thêm vào trang chi tiết sản phẩm:

```typescript
import { ProductSchema } from "@/components/StructuredData";

// Trong component
<ProductSchema
  name={product.name}
  description={product.description}
  image={product.imageUrl}
  price={product.price}
  sku={product.sku}
  brand="Mỹ phẩm Khánh Diễm"
/>;
```

### 8. Performance Optimization

- Optimize images với `next/image`
- Enable compression
- Add caching headers
- Lazy load components
- Code splitting

### 9. Content SEO

- Viết nội dung chất lượng cho blog
- Thêm alt text cho tất cả hình ảnh
- Sử dụng heading tags đúng cách (H1, H2, H3)
- Internal linking giữa các trang
- Tạo nội dung unique cho mỗi trang danh mục

### 10. Local SEO (nếu có cửa hàng vật lý)

Cập nhật LocalBusinessSchema với thông tin đầy đủ:

```typescript
<LocalBusinessSchema
  name="Mỹ phẩm Khánh Diễm"
  description="Mỹ phẩm chính hãng"
  url="https://myphamkhanhdiem.vn"
  telephone="+84-xxx-xxx-xxx"
  email="contact@myphamkhanhdiem.vn"
  address={{
    streetAddress: "123 Đường ABC",
    addressLocality: "Quận XYZ",
    addressRegion: "TP. HCM",
    postalCode: "700000",
    addressCountry: "VN",
  }}
/>
```

---

## 🔍 Testing

### 1. Rich Results Test

Test structured data:

```
https://search.google.com/test/rich-results
```

### 2. Mobile-Friendly Test

```
https://search.google.com/test/mobile-friendly
```

### 3. PageSpeed Insights

```
https://pagespeed.web.dev/
```

### 4. Schema Validator

```
https://validator.schema.org/
```

---

## 📊 Monitoring

### Công cụ cần theo dõi:

1. **Google Search Console** - Xem hiệu suất tìm kiếm
2. **Google Analytics** - Traffic và user behavior
3. **Google PageSpeed Insights** - Performance
4. **Bing Webmaster Tools** - Tối ưu cho Bing

### Metrics quan trọng:

- Organic traffic
- Click-through rate (CTR)
- Average position
- Core Web Vitals
- Bounce rate
- Time on page

---

## 🚀 Quick Wins

1. **Submit sitemap** ngay lập tức đến Google Search Console
2. **Tối ưu meta descriptions** - hấp dẫn, 150-160 ký tự
3. **Internal linking** - liên kết các trang liên quan
4. **Image alt text** - mô tả rõ ràng cho tất cả ảnh
5. **Mobile responsive** - đảm bảo hiển thị tốt trên mobile
6. **Page speed** - tối ưu tốc độ tải trang < 3s

---

## 📝 Checklist

- [ ] Thêm og-image.jpg (1200x630)
- [ ] Tạo icons cho PWA
- [ ] Setup Google Search Console
- [ ] Setup Google Analytics
- [ ] Verify website ownership
- [ ] Submit sitemap
- [ ] Thêm metadata cho từng trang
- [ ] Tối ưu hình ảnh với next/image
- [ ] Thêm alt text cho images
- [ ] Test với Rich Results Test
- [ ] Test mobile-friendly
- [ ] Kiểm tra PageSpeed score
- [ ] Thêm thông tin liên hệ vào LocalBusinessSchema
- [ ] Tạo dynamic sitemap với products/blogs
- [ ] Setup 301 redirects nếu cần
- [ ] Add hreflang tags nếu có multi-language

---

**Lưu ý:** SEO là quá trình dài hạn. Kết quả thường thấy sau 3-6 tháng. Hãy kiên nhẫn và liên tục cập nhật nội dung chất lượng!
