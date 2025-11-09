import {
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import CategoryBtn from "./CategoryBtn";
import { Logo } from "@/assets/icons";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 left-0 right-0 z-50 w-full">
      {/* Top bar - hide email on mobile */}
      <div className="bg-black py-2 px-4">
        <div className="flex justify-between max-w-7xl mx-auto text-xs sm:text-sm">
          <div className="flex justify-between items-center text-white gap-2 sm:gap-4">
            <span>
              <PhoneOutlined /> <span className="hidden sm:inline">0988888825</span>
            </span>
            <span className="hidden md:inline">
              <MailOutlined /> myphamkhanh@gmail.com
            </span>
          </div>
          <div className="text-white cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors">
            <UserOutlined /> <span className="hidden sm:inline">Đăng nhập/Đăng kí</span>
          </div>
        </div>
      </div>
      
      {/* Main header - responsive layout */}
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto py-2 sm:py-4 px-4 gap-2 sm:gap-4 lg:gap-10">
        <Link href="/" className="flex-shrink-0">
          <Logo />
        </Link>
        <Input
          className="w-full sm:max-w-[400px] lg:max-w-[600px]"
          placeholder="Tìm sản phẩm..."
          suffix={<SearchOutlined />}
        />
        <div className="hidden lg:flex gap-4 xl:gap-10 flex-shrink-0 text-sm">
          <span className="cursor-pointer hover:opacity-80">
            <ShoppingCartOutlined /> Giỏ hàng
          </span>
          <span className="cursor-pointer hover:opacity-80 whitespace-nowrap">
            <PhoneOutlined /> Hỗ trợ khách hàng
          </span>
        </div>
        {/* Mobile icons */}
        <div className="flex lg:hidden gap-4 text-lg">
          <ShoppingCartOutlined className="cursor-pointer" />
          <PhoneOutlined className="cursor-pointer" />
        </div>
      </div>
      
      {/* Navigation menu - responsive */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 sm:gap-4 lg:gap-10 justify-between text-white font-semibold px-4 py-2">
          <CategoryBtn />
          <p className="uppercase text-xs sm:text-sm py-2 cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors">
            Flash Sale
          </p>
          <p className="uppercase text-xs sm:text-sm py-2 cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors">
            Thương hiệu
          </p>
          <p className="uppercase text-xs sm:text-sm py-2 cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors">
            Sản phẩm hot
          </p>
        </div>
      </div>
    </header>
  );
}
