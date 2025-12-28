"use client";

import React from "react";
import {
  PhoneFilled,
  MailFilled,
  EnvironmentFilled,
  UserOutlined,
} from "@ant-design/icons";
import { useStoreLocations } from "@/hooks/useStoreLocations";

export default function ContactScreen() {
  const { data: storesData, isLoading } = useStoreLocations();
  const stores = storesData?.filter((s) => s.active) || [];

  return (
    <article className="py-6 md:py-8">
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-10 max-w-4xl mx-auto">
        <header className="mb-10 text-center border-b border-gray-100 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Thông Tin Liên Hệ
          </h1>
          <p className="text-xl font-semibold text-red-700">
            Mỹ Phẩm Khánh Diễm
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-10">
          {/* General Information */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-red-500 pl-3 mb-4">
              Thông tin chung
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600 flex-shrink-0">
                  <UserOutlined className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Người đại diện</p>
                  <p className="text-lg font-medium text-gray-900">
                    Phạm Duy Khánh
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600 flex-shrink-0">
                  <PhoneFilled className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <div className="flex flex-col">
                    <a
                      href="tel:0984657786"
                      className="text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                    >
                      0984 657 786
                    </a>
                    <a
                      href="tel:0981828526"
                      className="text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                    >
                      0981 828 526
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-600 flex-shrink-0">
                  <MailFilled className="text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href="mailto:Myphamkhanhdiem@gmail.com"
                    className="text-lg font-medium text-gray-900 hover:text-red-600 transition-colors break-all"
                  >
                    Myphamkhanhdiem@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Store Locations */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-red-500 pl-3 mb-4">
              Hệ thống cửa hàng
            </h2>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-gray-100 rounded-lg"></div>
                <div className="h-20 bg-gray-100 rounded-lg"></div>
              </div>
            ) : stores.length > 0 ? (
              <div className="space-y-4">
                {stores.map((store, index) => (
                  <div
                    key={store.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-red-200 transition-colors"
                  >
                    <p className="font-bold text-red-800 mb-1">
                      Cơ sở {index + 1}: {store.name}
                    </p>
                    <div className="flex items-start gap-2">
                      <EnvironmentFilled className="text-red-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 leading-snug">
                        {store.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Đang cập nhật địa chỉ...</p>
            )}
          </section>
        </div>

        {/* Optional: Simple Message */}
        <footer className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ quý khách. Hãy liên hệ
            với chúng tôi qua bất kỳ kênh thông tin nào ở trên.
          </p>
        </footer>
      </div>
    </article>
  );
}
