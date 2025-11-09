import { PRODUCT_DEMO } from "@/constants";
import { convertToUrl, convertToVnd } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function Product() {
  const url = convertToUrl(PRODUCT_DEMO.name, +PRODUCT_DEMO.id);
  return (
    <Link
      href={`/${url}`}
      className="w-full my-1 p-1 sm:p-2 relative flex flex-col gap-1 sm:gap-2 cursor-pointer hover:shadow-md rounded-lg transition-shadow"
    >
      <div className="flex flex-col gap-1 sm:gap-2 text-black">
        <div className="relative w-full aspect-square">
          <Image alt={PRODUCT_DEMO.name} src={PRODUCT_DEMO.image} fill className="object-cover rounded" />
        </div>
        <div className="font-semibold text-xs sm:text-sm flex gap-1 sm:gap-2">
          <span className="text-red-400">
            {convertToVnd(PRODUCT_DEMO.price)}
          </span>
          <span className="line-through text-gray-400 text-xs">
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
