import Banner from "./components/Banner";
import ProductSession from "./components/ProductSession";
import PromoteSession from "./components/PromoteSession";

const SESSION1 = [
  {
    title: "Trang điểm mặt",
    link: "/categories/trang-diem/trang-diem-mat",
  },
  {
    title: "Trang điểm mắt",
    link: "/categories/trang-diem/trang-diem-mat",
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
    link: "/categories/cham-soc-da/lam-sach",
  },
  {
    title: "Dưỡng da",
    link: "/categories/cham-soc-da/duong-da",
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
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-5 py-5">
      <Banner />
      <ProductSession title="Flash sale" link="/flash-sale" />
      <ProductSession title="Sản phẩm hot" link="/hot-products" />
      <PromoteSession
        title="Trang điểm"
        categories={SESSION1}
        seeAllLink="/categories/trang-diem"
      />
      <PromoteSession
        title="Son môi"
        categories={SESSION2}
        seeAllLink="/categories/son-moi"
        reverse
      />
      <PromoteSession
        title="Chăm sóc da"
        categories={SESSION3}
        seeAllLink="/categories/cham-soc-da"
      />
    </div>
  );
}
