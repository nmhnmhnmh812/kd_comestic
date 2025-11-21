"use client";

import { LogoWhite } from "@/assets/icons";
import {
  FacebookFilled,
  InstagramFilled,
  MailFilled,
  YoutubeFilled,
  PhoneFilled,
  EnvironmentFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

const STORES = [
  {
    id: 1,
    name: "KMP COSMETICS - HÀ NỘI",
    address: "Số 123 Đường ABC, Phường XYZ, Quận Hoàn Kiếm, Hà Nội",
    phone: "0988888825",
    hours: "8:00 - 22:00 (Hàng ngày)",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0969032103434!2d105.84388731533427!3d21.028511092313994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a!2zSG9hbiBLaeG6v20sIEhhIE5vaQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s",
  },
  {
    id: 2,
    name: "KMP COSMETICS - HÀ NỘI 2",
    address: "Số 456 Đường XYZ, Phường ABC, Quận Đống Đa, Hà Nội",
    phone: "0988888826",
    hours: "8:30 - 21:30 (Hàng ngày)",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5!2d105.82!3d21.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17b!2zxJDhu5FuZyDEkGEsIEhhIE5vaQ!5e0!3m2!1svi!2s!4v1234567890124!5m2!1svi!2s",
  },
  {
    id: 3,
    name: "KMP COSMETICS - HÀ NỘI 3",
    address: "Số 789 Đường DEF, Phường GHI, Quận Cầu Giấy, Hà Nội",
    phone: "0988888827",
    hours: "9:00 - 22:00 (Hàng ngày)",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8!2d105.78!3d21.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17c!2zQ-G6p3UgR2nhuqV5LCBIYSBOT2k!5e0!3m2!1svi!2s!4v1234567890125!5m2!1svi!2s",
  },
];

export default function Footer() {
  const [selectedStore, setSelectedStore] = useState(STORES[0]);

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <LogoWhite />
            <p className="text-sm text-gray-400 leading-relaxed">
              KMP là thương hiệu phân phối mỹ phẩm chính hãng và dịch vụ chăm
              sóc khách hàng tận tâm
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Dịch vụ KMP bao có thể hoàn toàn yên tâm khi lựa chọn cho mình
              những bộ sản phẩm phù hợp và ứng ý từ các nhãn hàng nổi tiếng trên
              toàn thế giới
            </p>
          </div>

          {/* VỀ KMP */}
          <div>
            <h3 className="text-base font-semibold mb-4">VỀ KMP</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/brand-story"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Câu chuyện thương hiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* CHÍNH SÁCH */}
          <div>
            <h3 className="text-base font-semibold mb-4">CHÍNH SÁCH</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/policy/privacy"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách và bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/personal-data"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách bảo mật thông tin cá nhân
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/terms"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/general"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách và quy định chung
                </Link>
              </li>
              <li>
                <Link
                  href="/loyalty-program"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Khách hàng thân thiết
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/shipping"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Chính sách vận chuyển
                </Link>
              </li>
            </ul>
          </div>

          {/* LIÊN HỆ & KẾT NỐI */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">LIÊN HỆ</h3>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <EnvironmentFilled className="text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">
                    Số 123 Đường ABC, Phường XYZ
                  </p>
                  <p className="text-sm text-gray-400">
                    Quận Hoàn Kiếm, Hà Nội
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <PhoneFilled className="text-lg" />
                <a
                  href="tel:0988888825"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  0988 888 825
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MailFilled className="text-lg" />
                <a
                  href="mailto:myphamkhanh@gmail.com"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  myphamkhanh@gmail.com
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold mb-2">KẾT NỐI</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:text-blue-500 transition-colors"
                >
                  <FacebookFilled className="text-2xl" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-pink-500 transition-colors"
                >
                  <InstagramFilled className="text-2xl" />
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Youtube"
                  className="hover:text-red-500 transition-colors"
                >
                  <YoutubeFilled className="text-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Store Locations */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-base font-semibold mb-6">HỆ THỐNG CỬA HÀNG</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Store List - Scrollable */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {STORES.map((store) => (
                <button
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className={clsx(
                    "w-full text-left bg-gray-900 rounded-lg p-4 transition-all duration-300 hover:bg-gray-800 border-2",
                    {
                      "border-red-500 bg-gray-800":
                        selectedStore.id === store.id,
                      "border-transparent": selectedStore.id !== store.id,
                    }
                  )}
                >
                  <h4 className="text-sm font-semibold text-white mb-2">
                    {store.name}
                  </h4>
                  <div className="flex items-start gap-2 mb-2">
                    <EnvironmentFilled className="text-red-500 text-base mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-400">
                      {store.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <PhoneFilled className="text-red-500 text-sm" />
                    <span className="text-xs text-gray-400">{store.phone}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-5 block">
                    {store.hours}
                  </span>
                </button>
              ))}
            </div>

            {/* Google Map */}
            <div className="lg:col-span-2 w-full h-96 rounded-lg overflow-hidden">
              <iframe
                key={selectedStore.id}
                src={selectedStore.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Vị trí ${selectedStore.name}`}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} KMP Cosmetics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
