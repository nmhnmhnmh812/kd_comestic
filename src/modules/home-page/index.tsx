import { SLUG_MAP } from "@/constants";
import Banner from "./components/Banner";
import ProductSession from "./components/ProductSession";
import PromoteSession from "./components/PromoteSession";
import { ICategory } from "@/types";

const SESSION1 = [
  {
    title: "Trang điểm mặt",
    link: "/danh-muc/trang-diem/trang-diem-mat",
  },
  {
    title: "Trang điểm mắt",
    link: "/danh-muc/trang-diem/trang-diem-mat",
  },
];

const SESSION2 = [
  {
    title: "Son thỏi",
    link: "/products/son-moi/son-thoi",
  },
  {
    title: "Son kem",
    link: "/products/son-moi/son-kem",
  },
  {
    title: "Son dưỡng",
    link: "/products/son-moi/son-duong",
  },
  {
    title: "Son bóng",
    link: "/products/son-moi/son-tint",
  },
];

const SESSION3 = [
  {
    title: "Làm sạch",
    link: "/danh-muc/cham-soc-da/lam-sach",
  },
  {
    title: "Dưỡng da",
    link: "/danh-muc/cham-soc-da/duong-da",
  },
  {
    title: "Mặt nạ",
    link: "/products/cham-soc-da/mat-na",
  },
  {
    title: "Kem chống nắng",
    link: "/products/cham-soc-da/kem-chong-nang",
  },
];

export default function HomePage() {
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
