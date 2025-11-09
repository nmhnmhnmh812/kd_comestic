import Product from "@/components/Product";
import Tabs from "@/components/Tabs";
import { Pagination } from "antd";

export default function CurrentDealsScreen() {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-5 py-5">
      <Tabs />
      <div className="bg-white rounded-md flex flex-col gap-2 p-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2"></div>
        <Pagination align="end" />
      </div>
    </div>
  );
}
