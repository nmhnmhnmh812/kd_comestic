"use client";

import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";

export default function CategoryBtn() {
  const categories = [
    {
      id: "cham-soc-toc",
      title: "Chăm Sóc Tóc",
      link: "/categories/cham-soc-toc",
      subcategories: [
        {
          title: "Chăm Sóc Tóc",
          link: "/categories/cham-soc-toc",
          items: [
            { name: "Dầu Gội - Xả", link: "/products/cham-soc-toc/dau-goi-xa" },
            { name: "Hấp/Ủ Tóc", link: "/products/cham-soc-toc/hap-u-toc" },
            {
              name: "Dầu Gội Thường Liên Doanh",
              link: "/products/cham-soc-toc/dau-goi-lien-doanh",
            },
            {
              name: "Tinh Dầu Dưỡng Tóc",
              link: "/products/cham-soc-toc/tinh-dau-duong-toc",
            },
            {
              name: "Xả Khô Dưỡng Tóc",
              link: "/products/cham-soc-toc/xa-kho-duong-toc",
            },
            {
              name: "Xịt Dưỡng Tóc",
              link: "/products/cham-soc-toc/xit-duong-toc",
            },
          ],
        },
      ],
    },
    {
      id: "hoa-chat-toc",
      title: "Hoá Chất Tóc",
      link: "/categories/hoa-chat-toc",
      subcategories: [
        {
          title: "Hoá Chất Tóc",
          link: "/categories/hoa-chat-toc",
          items: [
            { name: "Uốn/Duỗi/Ép", link: "/products/hoa-chat-toc/uon-duoi-ep" },
            {
              name: "Màu Nhuộm Salon",
              link: "/products/hoa-chat-toc/mau-nhuom-salon",
            },
            {
              name: "Màu Nhuộm Phủ Bạc Tại Nhà",
              link: "/products/hoa-chat-toc/mau-nhuom-phu-bac",
            },
            {
              name: "Oxi Trợ Nhuộm",
              link: "/products/hoa-chat-toc/oxi-tro-nhuom",
            },
            { name: "Tẩy", link: "/products/hoa-chat-toc/tay" },
            { name: "Keratin", link: "/products/hoa-chat-toc/keratin" },
            {
              name: "Sản Phẩm Phục Hồi Chuyên Sâu",
              link: "/products/hoa-chat-toc/phuc-hoi",
            },
            { name: "Bóc Màu", link: "/products/hoa-chat-toc/boc-mau" },
          ],
        },
      ],
    },
    {
      id: "cham-soc-da",
      title: "Chăm Sóc Da",
      link: "/categories/cham-soc-da",
      subcategories: [
        {
          title: "Làm Sạch",
          link: "/categories/cham-soc-da/lam-sach",
          items: [
            { name: "Sữa Rửa Mặt", link: "/products/cham-soc-da/sua-rua-mat" },
            { name: "Tẩy Trang", link: "/products/cham-soc-da/tay-trang" },
            { name: "Toner", link: "/products/cham-soc-da/toner" },
            {
              name: "Tẩy Tế Bào Chết",
              link: "/products/cham-soc-da/tay-te-bao-chet",
            },
          ],
        },
        {
          title: "Dưỡng Da",
          link: "/categories/cham-soc-da/duong-da",
          items: [
            { name: "Serum", link: "/products/cham-soc-da/serum" },
            { name: "Kem Dưỡng", link: "/products/cham-soc-da/kem-duong" },
            { name: "Mặt Nạ", link: "/products/cham-soc-da/mat-na" },
            { name: "Kem Mắt", link: "/products/cham-soc-da/kem-mat" },
          ],
        },
      ],
    },
    {
      id: "tao-kieu-toc",
      title: "Tạo Kiểu Tóc Nam/Nữ",
      link: "/categories/tao-kieu-toc",
      subcategories: [
        {
          title: "Tạo Kiểu Tóc",
          link: "/categories/tao-kieu-toc",
          items: [
            { name: "Gôm Xịt Tóc", link: "/products/tao-kieu-toc/gom-xit-toc" },
            {
              name: "Sáp Vuốt Tóc",
              link: "/products/tao-kieu-toc/sap-vuot-toc",
            },
            {
              name: "Gel Dưỡng Tóc Xoăn",
              link: "/products/tao-kieu-toc/gel-duong-toc-xoan",
            },
            {
              name: "Bọt Mềm Dưỡng Tóc Xoăn",
              link: "/products/tao-kieu-toc/bot-mem-duong-toc",
            },
          ],
        },
      ],
    },
    {
      id: "thiet-bi-salon-toc",
      title: "Thiết Bị Salon Tóc",
      link: "/categories/thiet-bi-salon-toc",
      subcategories: [
        {
          title: "Thiết Bị Salon Tóc",
          link: "/categories/thiet-bi-salon-toc",
          items: [
            { name: "Máy Sấy", link: "/products/thiet-bi-salon-toc/may-say" },
            { name: "Máy Uốn", link: "/products/thiet-bi-salon-toc/may-uon" },
            { name: "Máy Hấp", link: "/products/thiet-bi-salon-toc/may-hap" },
            {
              name: "Máy Kích Nhiệt",
              link: "/products/thiet-bi-salon-toc/may-kich-nhiet",
            },
            {
              name: "Máy Là Tóc",
              link: "/products/thiet-bi-salon-toc/may-la-toc",
            },
            {
              name: "Máy Xoăn Giả/Dập Phồng Xù",
              link: "/products/thiet-bi-salon-toc/may-xoan-gia",
            },
            {
              name: "Tông Đơ/Tông Viền",
              link: "/products/thiet-bi-salon-toc/tong-do",
            },
            {
              name: "Các Thiết Bị Khác",
              link: "/products/thiet-bi-salon-toc/thiet-bi-khac",
            },
          ],
        },
      ],
    },
    {
      id: "thiet-bi-spa",
      title: "Thiết Bị Spa",
      link: "/categories/thiet-bi-spa",
      subcategories: [
        {
          title: "Thiết Bị Spa",
          link: "/categories/thiet-bi-spa",
          items: [
            {
              name: "Máy Triệt Lông",
              link: "/products/thiet-bi-spa/may-triet-long",
            },
            { name: "Máy Trị Nám", link: "/products/thiet-bi-spa/may-tri-nam" },
            {
              name: "Máy Chăm Sóc Da Cơ Bản",
              link: "/products/thiet-bi-spa/may-cham-soc-da",
            },
            { name: "Đèn Spa", link: "/products/thiet-bi-spa/den-spa" },
            {
              name: "Các Thiết Bị Khác",
              link: "/products/thiet-bi-spa/thiet-bi-khac",
            },
          ],
        },
      ],
    },
    {
      id: "phu-kien-toc-salon",
      title: "Phụ Kiện Tóc Salon",
      link: "/categories/phu-kien-toc-salon",
      subcategories: [
        {
          title: "Phụ Kiện Tóc Salon",
          link: "/categories/phu-kien-toc-salon",
          items: [
            { name: "Lược", link: "/products/phu-kien-toc-salon/luoc" },
            { name: "Kéo", link: "/products/phu-kien-toc-salon/keo" },
            { name: "Chổi", link: "/products/phu-kien-toc-salon/choi" },
            {
              name: "Áo Choàng Cắt/Hoá Chất",
              link: "/products/phu-kien-toc-salon/ao-choang",
            },
            {
              name: "Trục Uốn Máy/Uốn Lạnh",
              link: "/products/phu-kien-toc-salon/truc-uon",
            },
            {
              name: "Bình Xịt Tóc",
              link: "/products/phu-kien-toc-salon/binh-xit-toc",
            },
            {
              name: "Các Phụ Kiện Khác",
              link: "/products/phu-kien-toc-salon/phu-kien-khac",
            },
          ],
        },
      ],
    },
    {
      id: "phu-kien-spa",
      title: "Phụ Kiện Spa",
      link: "/categories/phu-kien-spa",
      subcategories: [
        {
          title: "Phụ Kiện Spa",
          link: "/categories/phu-kien-spa",
          items: [
            { name: "Đồ Tiêu Hao", link: "/products/phu-kien-spa/do-tieu-hao" },
            {
              name: "Đồ Chăm Sóc Cơ Bản",
              link: "/products/phu-kien-spa/do-cham-soc",
            },
          ],
        },
      ],
    },
    {
      id: "noi-that-salon-spa",
      title: "Nội Thất Salon/Spa",
      link: "/categories/noi-that-salon-spa",
      subcategories: [
        {
          title: "Nội Thất Salon/Spa",
          link: "/categories/noi-that-salon-spa",
          items: [
            { name: "Gương", link: "/products/noi-that-salon-spa/guong" },
            {
              name: "Giường Gội",
              link: "/products/noi-that-salon-spa/giuong-goi",
            },
            {
              name: "Ghế Cắt Nam",
              link: "/products/noi-that-salon-spa/ghe-cat-nam",
            },
            {
              name: "Ghế Cắt Nữ",
              link: "/products/noi-that-salon-spa/ghe-cat-nu",
            },
            {
              name: "Giường Spa",
              link: "/products/noi-that-salon-spa/giuong-spa",
            },
            {
              name: "Tủ Sản Phẩm",
              link: "/products/noi-that-salon-spa/tu-san-pham",
            },
            {
              name: "Tủ Cạnh Gương",
              link: "/products/noi-that-salon-spa/tu-canh-guong",
            },
            {
              name: "Quầy Thanh Toán",
              link: "/products/noi-that-salon-spa/quay-thanh-toan",
            },
            {
              name: "Đèn Trang Trí Barber/Salon",
              link: "/products/noi-that-salon-spa/den-trang-tri",
            },
            {
              name: "Xe Đẩy Tóc/Spa",
              link: "/products/noi-that-salon-spa/xe-day",
            },
            {
              name: "Các Sản Phẩm Khác",
              link: "/products/noi-that-salon-spa/san-pham-khac",
            },
          ],
        },
      ],
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div
      className="relative py-2"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => {
        setIsMenuOpen(false);
      }}
    >
      <span>DANH MỤC SẢN PHẨM</span>{" "}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-64 bg-white shadow-2xl overflow-visible z-50 animate-fadeIn">
          {categories.map((category) => (
            <div
              key={category.id}
              onMouseEnter={() => {
                setActiveMenu(category.id);
              }}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link href={category.link}>
                <div className="px-6 py-3 flex items-center justify-between border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group">
                  <span className="text-gray-800 font-medium">
                    {category.title}
                  </span>
                  {category.subcategories && (
                    <RightOutlined
                      style={{ color: "black" }}
                      twoToneColor="#eb2f96"
                      className="w-4 h-4 text-black group-hover:text-red-600 transition-colors"
                    />
                  )}
                </div>
              </Link>

              {activeMenu === category.id && category.subcategories && (
                <div
                  className="absolute left-full top-0 w-[600px] h-full bg-white border border-gray-200 shadow-2xl z-[100] animate-slideIn"
                  onMouseEnter={() => setActiveMenu(category.id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-8">
                      {category.subcategories.map((subcategory, idx) => (
                        <div key={idx}>
                          <Link href={subcategory.link}>
                            <h3 className="font-bold text-gray-900 mb-3 pb-2 border-b-2 border-red-600 hover:text-red-600 cursor-pointer transition-colors">
                              {subcategory.title}
                            </h3>
                          </Link>
                          {subcategory.items && (
                            <ul className="space-y-2">
                              {subcategory.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link
                                    href={item.link}
                                    className="text-gray-600 hover:text-red-600 transition-colors inline-block text-sm"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
