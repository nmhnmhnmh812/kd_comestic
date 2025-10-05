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
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 w-full">
      <div className=" bg-black py-2">
        <div className="flex justify-between max-w-7xl mx-auto">
          <div className="flex justify-between items-center text-white gap-4">
            <span>
              <PhoneOutlined /> 0988888825
            </span>
            <span>
              <MailOutlined /> myphamkhanh@gmail.com
            </span>
          </div>
          <div className="text-white cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors">
            <UserOutlined /> Đăng nhập/Đăng kí
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center max-w-7xl mx-auto py-4 gap-10">
        <Link href="/">
          <Logo />
        </Link>
        <Input
          className="max-w-[600px]"
          placeholder="Tìm sản phẩm bạn mong muốn..."
          suffix={<SearchOutlined />}
        />
        <div className="flex gap-10">
          <span>
            <ShoppingCartOutlined /> Giỏ hàng
          </span>
          <span>
            <PhoneOutlined /> Hỗ trợ khách hàng
          </span>
        </div>
      </div>
      <div className="bg-black">
        <div className="max-w-7xl mx-auto flex gap-10 justify-between text-white font-semibold">
          <CategoryBtn />
          <p className="uppercase py-2 cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors">
            Flash Sale
          </p>
          <p className="uppercase py-2 cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors">
            Thương hiệu
          </p>
          <p className="uppercase py-2 cursor-pointer hover:opacity-80 hover:text-gray-300 transition-colors">
            Sản phẩm hot
          </p>
        </div>
      </div>
    </header>
  );
}
