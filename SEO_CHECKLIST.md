# ✅ SEO Implementation Checklist

## Đã hoàn thành ✓

- [x] Cập nhật metadata trong `layout.tsx`

  - [x] Title tag
  - [x] Meta description
  - [x] Keywords
  - [x] Open Graph tags
  - [x] Twitter Card tags
  - [x] Canonical URL
  - [x] Robots directives
  - [x] Viewport settings

- [x] Tạo file SEO cơ bản

  - [x] robots.txt
  - [x] sitemap.ts
  - [x] manifest.ts

- [x] Tạo Structured Data Components

  - [x] LocalBusinessSchema
  - [x] ProductSchema
  - [x] BreadcrumbSchema
  - [x] WebsiteSchema

- [x] Thêm Structured Data vào layout

  - [x] LocalBusinessSchema
  - [x] WebsiteSchema

- [x] Tạo Open Graph Image

  - [x] og-image.jpg (1200x630)

- [x] Tạo tài liệu hướng dẫn
  - [x] SEO_GUIDE.md (English roadmap)
  - [x] HUONG_DAN_SEO.md (Vietnamese usage guide)
  - [x] README_SEO.md (Summary)

---

## Cần làm ngay ⚡

### 1. Google Search Console (Ưu tiên cao)

- [ ] Đăng ký tài khoản tại https://search.google.com/search-console
- [ ] Thêm property: `myphamkhanhdiem.vn`
- [ ] Verify ownership (dùng HTML tag method)
- [ ] Copy verification code
- [ ] Update trong `layout.tsx` (line 68):
  ```tsx
  verification: {
    google: "paste-your-verification-code-here",
  }
  ```
- [ ] Submit sitemap: `https://myphamkhanhdiem.vn/sitemap.xml`

### 2. Google Analytics (Ưu tiên cao)

- [ ] Tạo GA4 property tại https://analytics.google.com
- [ ] Copy Measurement ID (G-XXXXXXXXXX)
- [ ] Tạo file `src/app/GoogleAnalytics.tsx`:

  ```tsx
  import Script from "next/script";

  export default function GoogleAnalytics({
    GA_MEASUREMENT_ID,
  }: {
    GA_MEASUREMENT_ID: string;
  }) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </>
    );
  }
  ```

- [ ] Import vào `layout.tsx`

### 3. Cập nhật LocalBusinessSchema (Ưu tiên cao)

- [ ] Mở `src/app/layout.tsx` (line 84)
- [ ] Thêm thông tin thực:
  ```tsx
  <LocalBusinessSchema
    telephone="+84-XXX-XXX-XXX" // Số điện thoại thật
    email="contact@myphamkhanhdiem.vn" // Email thật
    address={{
      streetAddress: "Số nhà, tên đường",
      addressLocality: "Quận/Huyện",
      addressRegion: "TP. HCM / Hà Nội",
      postalCode: "700000",
      addressCountry: "VN",
    }}
  />
  ```

---

## Cần làm trong 1-2 tuần 📅

### 4. Dynamic Sitemap

- [ ] Mở `src/app/sitemap.ts`
- [ ] Thêm code fetch products:
  ```tsx
  const products = await fetch(`${process.env.API_URL}/products`).then((r) =>
    r.json()
  );
  ```
- [ ] Thêm code fetch blog posts
- [ ] Thêm code fetch categories
- [ ] Test sitemap: `http://localhost:3000/sitemap.xml`

### 5. Page-specific Metadata

- [ ] Trang sản phẩm: tạo `generateMetadata()`
- [ ] Trang danh mục: tạo `generateMetadata()`
- [ ] Trang blog: tạo `generateMetadata()`
- [ ] Trang thương hiệu: tạo `generateMetadata()`

### 6. Sử dụng ProductSchema

- [ ] Mở file trang chi tiết sản phẩm
- [ ] Import ProductSchema
- [ ] Thêm vào component với data thật

### 7. Sử dụng BreadcrumbSchema

- [ ] Thêm vào trang danh mục
- [ ] Thêm vào trang sản phẩm
- [ ] Thêm vào trang blog detail

### 8. PWA Icons

- [ ] Thiết kế icon 192x192
- [ ] Thiết kế icon 512x512
- [ ] Thiết kế apple-touch-icon 180x180
- [ ] Thêm vào `/public`
- [ ] Cập nhật `manifest.ts`

---

## Ongoing Tasks (Liên tục) ♾️

### 9. Content SEO

- [ ] Viết ít nhất 2 blog posts/tháng
- [ ] Thêm alt text cho TẤT CẢ hình ảnh
- [ ] Tối ưu product descriptions (unique, >150 words)
- [ ] Internal linking giữa các sản phẩm liên quan
- [ ] Cập nhật nội dung cũ

### 10. Image Optimization

- [ ] Chuyển tất cả `<img>` sang `<Image>` từ next/image
- [ ] Thêm alt text có ý nghĩa
- [ ] Compress images (< 200KB)
- [ ] Use WebP format
- [ ] Lazy loading cho images below fold

### 11. Performance

- [ ] Enable Next.js Image Optimization
- [ ] Enable compression (gzip/brotli)
- [ ] Code splitting
- [ ] Lazy load components
- [ ] Remove unused CSS
- [ ] Mục tiêu: PageSpeed > 90

### 12. Monitoring

- [ ] Kiểm tra Google Search Console weekly
- [ ] Review Google Analytics monthly
- [ ] Monitor Core Web Vitals
- [ ] Track keyword rankings
- [ ] Check for crawl errors

---

## Testing Checklist 🧪

Sau khi deploy production:

### Structured Data

- [ ] Test với https://search.google.com/test/rich-results
- [ ] Validate với https://validator.schema.org/
- [ ] Check LocalBusinessSchema
- [ ] Check WebsiteSchema
- [ ] Check ProductSchema (trên trang sản phẩm)

### Mobile & Performance

- [ ] Mobile-friendly test: https://search.google.com/test/mobile-friendly
- [ ] PageSpeed Insights: https://pagespeed.web.dev/
  - [ ] Desktop score > 90
  - [ ] Mobile score > 80
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1

### Social Preview

- [ ] Facebook: https://developers.facebook.com/tools/debug/
- [ ] Twitter: https://cards-dev.twitter.com/validator
- [ ] LinkedIn: https://www.linkedin.com/post-inspector/

### Technical SEO

- [ ] robots.txt accessible: `https://myphamkhanhdiem.vn/robots.txt`
- [ ] sitemap.xml accessible: `https://myphamkhanhdiem.vn/sitemap.xml`
- [ ] manifest.json accessible: `https://myphamkhanhdiem.vn/manifest.json`
- [ ] All pages have unique titles
- [ ] All pages have unique descriptions
- [ ] All pages have H1 tag
- [ ] No broken links
- [ ] HTTPS enabled
- [ ] Canonical URLs set correctly

---

## Monthly Review 📊

- [ ] Traffic trends (Google Analytics)
- [ ] Keyword rankings
- [ ] CTR improvements
- [ ] Page load time
- [ ] Bounce rate
- [ ] Top landing pages
- [ ] Search queries (GSC)
- [ ] Crawl errors (GSC)
- [ ] Index coverage (GSC)
- [ ] Mobile usability issues

---

## Notes 📝

**Thời gian thấy kết quả SEO:** 3-6 tháng

**Factors quan trọng nhất:**

1. Content quality (40%)
2. Technical SEO (30%)
3. Backlinks (20%)
4. User experience (10%)

**Quick Wins:**

- Submit sitemap ngay
- Fix alt text
- Improve page speed
- Internal linking

**Long-term:**

- Build backlinks
- Create quality content
- Improve user experience
- Monitor and adjust

---

Chúc bạn thành công với SEO! 🚀

Last updated: 2025-12-20
