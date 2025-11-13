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
      className="w-full h-full my-1 p-2 relative flex flex-col gap-1.5 cursor-pointer hover:shadow-md rounded-lg"
    >
      <div className="flex flex-col gap-1.5 text-black h-full">
        <div className="relative w-full aspect-square overflow-hidden rounded-md">
          <Image 
            alt={name} 
            src={imageUrl} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>
        <div className="font-semibold text-xs flex gap-1.5 flex-wrap">
          <span className="text-red-400">{convertToVnd(finalPrice)}</span>
          {price !== finalPrice ? (
            <span className="line-through text-gray-400 text-[11px]">
              {convertToVnd(price)}
            </span>
          ) : null}
        </div>
        <div className="text-[11px] flex-1 flex flex-col">
          <h3 className="font-bold">{brandName}</h3>
          <p className="line-clamp-2">{name}</p>
        </div>
      </div>
    </Link>
  );
}
