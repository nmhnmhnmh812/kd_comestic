"use client";

import { convertToUrl } from "@/utils";
import { Breadcrumb } from "antd";
import Link from "next/link";
import ProductDetail from "./components/ProductDetail";
import ProductDescription from "./components/ProductDescription";
import SideSession from "./components/SideSession";
import { Product, Variant } from "@/types";
import { createCart } from "@/api/cart";
import { useEffect } from "react";

export default function ProductScreen({
  product,
  variants,
}: {
  product: Product;
  variants: Variant[];
}) {
  useEffect(() => {
    const cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      createCart().then(({ data }) => {
        localStorage.setItem("cart_id", data.result.id);
      });
    }
  }, []);

  const categoryUrl = convertToUrl(product.category.name);
  const subCategoryUrl = convertToUrl(
    product.subCategory.name,
    product.subCategory.id
  );

  const breadcrumbItems = [
    {
      title: <Link href="/">Trang chủ</Link>,
    },
    {
      title: product.category ? (
        <Link href={`/danh-muc/${categoryUrl}`}>{product.category.name}</Link>
      ) : null,
    },
    {
      title: product.subCategory ? (
        <Link href={`/danh-muc/${categoryUrl}/${subCategoryUrl}`}>
          {product.subCategory.name}
        </Link>
      ) : null,
    },
    {
      title: product.name,
    },
  ];

  const brand = product.brand;
  const category = product.category;
  const subCategory = product.subCategory;

  return (
    <div className="flex flex-col gap-3 md:gap-5 py-3 md:py-5">
      <Breadcrumb
        items={breadcrumbItems}
        separator=">"
        className="text-xs md:text-sm"
      />
      <div className="flex flex-col lg:flex-row gap-3 md:gap-5">
        <div className="flex flex-col gap-3 md:gap-5 flex-1">
          <ProductDetail product={product} variants={variants} />
          <ProductDescription product={product} />
        </div>
        <div className="flex flex-col gap-3 md:gap-5">
          <SideSession title="Sản phẩm cùng thương hiệu" brand={brand} />
          <SideSession
            title="Sản phẩm liên quan"
            category={category}
            subCategory={subCategory}
          />
        </div>
      </div>
    </div>
  );
}
