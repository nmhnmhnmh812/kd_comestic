"use client";

import { PhoneFilled, ArrowUpOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// Facebook Messenger Icon Component
const MessengerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="28"
    height="28"
    fill="currentColor"
  >
    <path d="M24,4C13.5,4,5,12.1,5,22c0,5.2,2.3,9.8,6,13.1V44l7.8-4.7c1.6,0.4,3.4,0.7,5.2,0.7c10.5,0,19-8.1,19-18 C43,12.1,34.5,4,24,4z M25.8,28.2l-4.8-5.2l-9.4,5.2l10.3-11l4.9,5.2l9.3-5.2L25.8,28.2z" />
  </svg>
);

export default function FloatingButtons() {
  const zaloLink = "https://zalo.me/84984657786";
  const messengerLink = "https://m.me/myphamkhanh";
  const phoneNumber = "tel:0984657786";

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* Scroll To Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 md:w-14 md:h-14 bg-gray-500 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-600 transition-all duration-300 hover:scale-110"
          aria-label="Lên đầu trang"
        >
          <ArrowUpOutlined className="text-white text-xl md:text-2xl" />
        </button>
      )}

      {/* Phone Button */}
      <Link
        href={phoneNumber}
        className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110"
        aria-label="Gọi điện"
      >
        <PhoneFilled className="text-white text-xl md:text-2xl" />
      </Link>

      {/* Zalo Button */}
      <Link
        href={zaloLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 md:w-14 md:h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110"
        aria-label="Chat Zalo"
      >
        <Image src="/zalo.svg" alt="Zalo" width={32} height={32} />
      </Link>

      {/* Messenger Button */}
      <Link
        href={messengerLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-110"
        aria-label="Chat Messenger"
      >
        <span className="text-white">
          <MessengerIcon />
        </span>
      </Link>
    </div>
  );
}
