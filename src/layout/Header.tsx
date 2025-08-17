import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import CategoryBtn from "./CategoryBtn";

export default function Header() {
  return (
    <div className="bg-white shadow-md p-4">
      <div className="max-w-2/3 mx-auto flex items-center justify-between gap-4">
        <h1>KD</h1>
        <CategoryBtn />
        <Input
          placeholder="Tìm sản phẩm mong muốn"
          prefix={<SearchOutlined />}
        />
      </div>
    </div>
  );
}
