"use client";

import { MessageFilled, PhoneFilled } from "@ant-design/icons";
import Link from "next/link";

// Zalo Icon Component
const ZaloIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="28"
    height="28"
    fill="currentColor"
  >
    <path d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z M30.176,31.855 c-0.451,0.609-1.329,0.735-1.938,0.285c-0.609-0.451-0.735-1.329-0.285-1.938c1.014-1.373,1.014-2.823,1.014-4.201 c0-3.314-2.686-6-6-6s-6,2.686-6,6c0,1.378,0,2.828,1.014,4.201c0.451,0.609,0.324,1.488-0.285,1.938 c-0.609,0.451-1.488,0.324-1.938-0.285c-1.349-1.825-1.791-3.806-1.791-5.854c0-4.418,3.582-8,8-8s8,3.582,8,8 C31.967,28.049,31.525,30.03,30.176,31.855z M36.5,17.5h-10c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5h10 c0.828,0,1.5,0.672,1.5,1.5S37.328,17.5,36.5,17.5z" />
  </svg>
);

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
  const zaloLink = "https://zalo.me/0988888825";
  const messengerLink = "https://m.me/myphamkhanh";
  const phoneNumber = "tel:0988888825";

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
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
        <span className="text-white">
          <ZaloIcon />
        </span>
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
