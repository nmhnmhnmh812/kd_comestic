import { PRODUCT_DEMO } from "@/constants";
import { convertToUrl, convertToVnd } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function Product() {
  const url = convertToUrl(PRODUCT_DEMO.name, +PRODUCT_DEMO.id);
  return (
    <Link
      href={`/${url}`}
      className="w-full my-1 p-2 relative flex flex-col gap-2 cursor-pointer hover:shadow-md rounded-lg"
    >
      <div className="flex flex-col gap-2 text-black">
        <div className="relative w-full aspect-square">
          <Image alt="" src={PRODUCT_DEMO.image} fill />
        </div>
        <div className="font-semibold text-sm flex gap-2">
          <span className="text-red-400">
            {convertToVnd(PRODUCT_DEMO.price)}
          </span>
          <span className="line-through text-gray-400">
            {convertToVnd(PRODUCT_DEMO.oldPrice)}
          </span>
        </div>
        <div className="text-xs">
          <h3 className="font-bold">{PRODUCT_DEMO.brand}</h3>
          <p className="line-clamp-2">{PRODUCT_DEMO.name}</p>
        </div>
      </div>
    </Link>
  );
}
