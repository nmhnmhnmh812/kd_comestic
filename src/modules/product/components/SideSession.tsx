import Product from "@/components/Product";
import { Button, Divider } from "antd";

export default function SideSession({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <div className="bg-white rounded-lg w-full lg:w-[220px] overflow-hidden">
      <h2 className="font-semibold text-sm text-center py-2">{title}</h2>
      <Divider className="my-0" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 px-2">
        {Array(2)
          .fill(0)
          .map((_, index) => (
            <Product key={index} />
          ))}
      </div>
      <Button color="default" variant="filled" className="w-full rounded-none">
        Xem tất cả
      </Button>
    </div>
  );
}
