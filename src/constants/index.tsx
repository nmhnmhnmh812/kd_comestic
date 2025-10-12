import { ISLUGMAP } from "@/types";
import demoProduct from "@/assets/images/demo_product.png";

export const SLUG_MAP: ISLUGMAP = {
  "trang-diem": {
    slug: { title: "Trang điểm", id: 1 },
    categories: {
      title: "Danh mục trang điểm",
      children: [
        { name: "Trang điểm", link: "trang-diem" },
        { name: "Trang điểm mặt", link: "trang-diem/trang-diem-mat", id: 11 },
        { name: "Trang điểm mắt", link: "trang-diem/trang-diem-mat", id: 12 },
      ],
    },
  },
  "son-moi": {
    slug: { title: "Son môi", id: 2 },
    categories: {
      title: "Danh mục son môi",
      children: [
        { name: "Son môi", link: "son-moi" },
        { name: "Son môi lì", link: "son-moi/son-moi-li", id: 20 },
        {
          name: "Son môi bóng",
          link: "son-moi/son-moi-bong",
          id: 21,
        },
      ],
    },
  },
  "cham-soc-da": {
    slug: { title: "Chăm sóc da", id: 3 },
    categories: {
      title: "Danh mục chăm sóc da",
      children: [
        { name: "Chăm sóc da", link: "cham-soc-da" },
        {
          name: "Sữa rửa mặt",
          link: "cham-soc-da/sua-rua-mat",
          id: 30,
        },
        { name: "Toner", link: "cham-soc-da/toner", id: 31 },
      ],
    },
  },
};

export const PRODUCT_DEMO = {
  name: "Son kem Peripera Over Blur Tint - 05 Vintage Acorn",
  price: 250000,
  oldPrice: 279000,
  image: demoProduct,
  id: "1",
  brand: "Peripera",
  category: { name: "Son môi", link: "son-moi", id: 2 },
  subCategory: { name: "Son môi lì", link: "son-moi/son-moi-li", id: 20 },
};

export const PRODUCT_DEMO_LIST = Array(10).fill(PRODUCT_DEMO);
