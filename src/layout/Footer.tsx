"use client";

import LogoWhite from "@/assets/images/logoWhite.png";
import {
  FacebookFilled,
  MailFilled,
  PhoneFilled,
  EnvironmentFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { useStoreLocations } from "@/hooks/useStoreLocations";
import { StoreLocation } from "@/types";
import Image from "next/image";

export default function Footer() {
  const { data: storesData, isLoading } = useStoreLocations();
  const stores = useMemo(
    () => storesData?.filter((store) => store.active) || [],
    [storesData]
  );
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(
    null
  );

  useEffect(() => {
    if (stores.length > 0 && !selectedStore) {
      setSelectedStore(stores[0]);
    }
  }, [stores, selectedStore]);

  const extractMapEmbedUrl = (iframeCode: string): string => {
    if (!iframeCode) return "";
    const srcMatch = iframeCode.match(/src="([^"]+)"/);
    return srcMatch ? srcMatch[1] : "";
  };

  const handleStoreClick = (store: StoreLocation) => {
    setSelectedStore(store);
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1320px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Image
              src={LogoWhite}
              alt="Logo"
              width={100}
              height={100}
              className="h-auto md:w-auto"
            />
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
            <h3 className="text-base font-semibold mb-4">
              VỀ MỸ PHẨM KHÁNH DIỂM
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/ve-chung-toi"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/cau-chuyen-thuong-hieu"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Câu chuyện thương hiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he"
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
                  href="/quy-dinh-chung"
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
              {stores.length > 0 && (
                <div className="flex items-start gap-2">
                  <EnvironmentFilled className="text-lg mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">{stores[0].address}</p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <PhoneFilled className="text-lg" />
                <a
                  href="tel:0984657786"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  0984657786
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MailFilled className="text-lg" />
                <a
                  href="mailto:Myphamkhanhdiem@gmail.com"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Myphamkhanhdiem@gmail.com
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold mb-2">KẾT NỐI</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://www.facebook.com/share/1BF5XoDkJq/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:text-blue-500 transition-colors"
                >
                  <FacebookFilled className="text-2xl" />
                </Link>
                <Link
                  href="https://zalo.me/84984657786"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Zalo"
                  className="flex items-center justify-center bg-blue-600 rounded-full w-6 h-6 hover:bg-blue-700 transition-colors"
                >
                  <span className="font-bold text-xs text-white">Z</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Store Locations */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-base font-semibold mb-6">HỆ THỐNG CỬA HÀNG</h3>

          {isLoading ? (
            <p
              className="text-gray-400 text-sm"
              role="status"
              aria-live="polite"
            >
              Đang tải...
            </p>
          ) : stores.length === 0 ? (
            <p className="text-gray-400 text-sm">Không có cửa hàng nào</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Store List - Scrollable */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {stores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => handleStoreClick(store)}
                    className={clsx(
                      "w-full text-left bg-gray-900 rounded-lg p-4 transition-all duration-300 hover:bg-gray-800 border-2 cursor-pointer",
                      {
                        "border-red-500 bg-gray-800":
                          selectedStore?.id === store.id,
                        "border-transparent": selectedStore?.id !== store.id,
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
                      <span className="text-xs text-gray-400">
                        {store.phone}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 ml-5 block">
                      {store.hours}
                    </span>
                  </button>
                ))}
              </div>

              {/* Google Map */}
              {selectedStore && (
                <div className="lg:col-span-2 w-full h-96 rounded-lg overflow-hidden">
                  <iframe
                    key={selectedStore.id}
                    src={extractMapEmbedUrl(selectedStore.mapUrl)}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Vị trí ${selectedStore.name}`}
                  />
                </div>
              )}
            </div>
          )}
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
