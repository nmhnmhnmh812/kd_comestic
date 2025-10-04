"use client";

import { RightOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function CategoryBtn() {
  const categories = [
    {
      id: "trang-diem",
      title: "Trang Điểm",
      subcategories: [
        {
          title: "Trang Điểm Mặt",
          items: [
            "Kem Lót",
            "Kem Nền - BB Cream",
            "Che Khuyết Điểm",
            "Phấn Phủ",
            "Xịt Khoá Nền",
            "Phấn Má",
            "Phấn Nước - Cushion",
            "Tạo Khối - Highlight",
          ],
        },
        {
          title: "Trang Điểm Mắt",
          items: ["Phấn Mắt/Nhũ Mắt", "Kẻ Mắt", "Kẻ Chân Mày"],
        },
      ],
    },
    {
      id: "mascara",
      title: "Mascara",
      subcategories: [
        {
          title: "Mascara",
          items: [
            "Mascara Làm Dày",
            "Mascara Làm Dài",
            "Mascara Chống Lem",
            "Mascara 2 Đầu",
          ],
        },
      ],
    },
    {
      id: "son-moi",
      title: "Son Môi",
      subcategories: [
        {
          title: "Son Môi",
          items: [
            "Son Thỏi",
            "Son Kem",
            "Son Dưỡng",
            "Son Tint",
            "Kẻ Viền Môi",
          ],
        },
      ],
    },
    {
      id: "cham-soc-da",
      title: "Chăm Sóc Da",
      subcategories: [
        {
          title: "Làm Sạch",
          items: ["Sữa Rửa Mặt", "Tẩy Trang", "Toner", "Tẩy Tế Bào Chết"],
        },
        {
          title: "Dưỡng Da",
          items: ["Serum", "Kem Dưỡng", "Mặt Nạ", "Kem Mắt"],
        },
      ],
    },
    {
      id: "cham-soc-co-the",
      title: "Chăm Sóc Cơ Thể",
      subcategories: [
        {
          title: "Cơ Thể",
          items: ["Sữa Tắm", "Kem Body", "Tẩy Tế Bào Chết Body", "Xịt Body"],
        },
      ],
    },
    {
      id: "nuoc-hoa",
      title: "Nước Hoa",
      subcategories: [
        {
          title: "Nước Hoa",
          items: ["Nước Hoa Nữ", "Nước Hoa Nam", "Nước Hoa Unisex"],
        },
      ],
    },
    {
      id: "dung-cu",
      title: "Dụng Cụ",
      subcategories: [
        {
          title: "Dụng Cụ Trang Điểm",
          items: ["Cọ Trang Điểm", "Bông Phấn", "Kẹp Mi", "Gương"],
        },
      ],
    },
    {
      id: "combo",
      title: "COMBO SIÊU HỜI 🔥",
      subcategories: [
        {
          title: "Combo Tiết Kiệm",
          items: ["Combo Skincare", "Combo Makeup", "Combo Body"],
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
        <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-lg overflow-visible z-50 animate-fadeIn">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => {
                setActiveMenu(category.id);
              }}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="px-6 py-3 flex items-center justify-between border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group">
                <span className="text-gray-800 font-medium">
                  {category.title}
                </span>
                <RightOutlined
                  style={{ color: "black" }}
                  twoToneColor="#eb2f96"
                  className="w-4 h-4 text-black group-hover:text-red-600 transition-colors"
                />
              </div>

              {activeMenu === category.id && category.subcategories && (
                <div
                  className="absolute left-full top-0 w-[600px] bg-white border border-gray-200 shadow-2xl rounded-lg z-[100] animate-slideIn"
                  onMouseEnter={() => setActiveMenu(category.id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-8">
                      {category.subcategories.map((subcategory, idx) => (
                        <div key={idx}>
                          <h3 className="font-bold text-gray-900 mb-3 pb-2 border-b-2 border-red-600">
                            {subcategory.title}
                          </h3>
                          <ul className="space-y-2">
                            {subcategory.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <a
                                  href="#"
                                  className="text-gray-600 hover:text-red-600 transition-colors inline-block text-sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    console.log("Clicked:", item);
                                  }}
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
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
