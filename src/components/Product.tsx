import { Product as ProductType } from "@/types";
import { convertToUrl, convertToVnd } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function Product({ ...rest }: ProductType) {
  const { name, id, price, finalPrice, brand, blobs } = rest;
  const url = convertToUrl(name, id);
  const imageUrl = blobs?.[0]?.url;
  const brandName = brand?.name;

  return (
    <Link
      href={`/${url}`}
      className="w-full h-fit my-1 relative flex flex-col gap-2 cursor-pointer hover:shadow-md rounded-lg"
    >
      <div className="flex flex-col gap-2 text-black">
        <div className="relative w-full aspect-square">
          <Image alt={name} src={imageUrl} fill />
        </div>
        <div className="flex flex-col gap-1 p-2">
          <div className="font-semibold text-sm flex gap-2">
            <span className="text-red-400">{convertToVnd(finalPrice)}</span>
            {price !== finalPrice ? (
              <span className="line-through text-gray-400">
                {convertToVnd(price)}
              </span>
            ) : null}
          </div>
          <div className="text-xs">
            <h3 className="font-bold line-clamp-1">{brandName}</h3>
            <p className="line-clamp-2 h-8">{name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
