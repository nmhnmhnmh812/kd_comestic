import Product from "@/components/Product";
import Tabs from "@/components/Tabs";
import { Pagination } from "antd";

export default function FlashSaleScreen() {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-3 md:gap-5 py-3 md:py-5">
      <Tabs />
      <div className="bg-white rounded-md flex flex-col gap-2 p-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"></div>
        <Pagination align="end" size="small" responsive />
      </div>
    </div>
  );
}
