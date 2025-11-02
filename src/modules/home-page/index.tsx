"use client";

import { SLUG_MAP } from "@/constants";
import Banner from "./components/Banner";
import ProductSession from "./components/ProductSession";
import PromoteSession from "./components/PromoteSession";
import { ICategory, ResponseApi } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS, getProducts } from "@/api/product";
import React from "react";
import { message } from "antd";

export default function HomePage() {
  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
  });
  const categories = Object.values(SLUG_MAP).splice(0, 3);
  const getCategories = (value: ICategory["children"]) => {
    return value
      .map((item) => {
        if (item.id) {
          return {
            title: item.name,
            link: `/danh-muc/${item.link}.${item.id}`,
          };
        }
      })
      .filter(Boolean) as { title: string; link: string }[];
  };

  const getSeeAllLink = (value: ICategory["children"]) => {
    const find = value.find((item) => !item.id);
    return find ? `/danh-muc/${find.link}` : "";
  };

  const { data, refetch, isFetching } = useQuery({
    queryKey: [ENDPOINTS.PRODUCT, filters],
    queryFn: async () => {
      const { error, data }: ResponseApi = await getProducts({
        ...filters,
      });
      if (error) {
        message.error(error || "Đã có lỗi xảy ra");
      }
      return data;
    },
  });

  return (
    <div className="flex flex-col gap-5 py-5">
      <Banner />
      <ProductSession title="Flash sale" link="/flash-sale" />
      <ProductSession title="Sản phẩm hot" link="/hot-deals" />
      {categories.map((category, index) => (
        <PromoteSession
          key={category.slug.id}
          title={category.slug.title}
          categories={getCategories(category.categories.children)}
          seeAllLink={getSeeAllLink(category.categories.children)}
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  );
}
