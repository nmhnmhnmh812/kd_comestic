import { convertToUrl, convertToVnd } from "@/utils";
import Image from "next/image";
import Link from "next/link";

type ProductProps = {
  imageUrl: string;
  id?: number;
  name: string;
  brandName: string;
  price: number;
  discountPercent?: number;
};

export default function Product({
  imageUrl,
  id,
  name,
  brandName,
  price,
  discountPercent,
}: ProductProps) {
  const url = convertToUrl(name, id);
  return (
    <Link
      href={`/${url}`}
      className="w-full h-fit my-1 p-2 relative flex flex-col gap-2 cursor-pointer hover:shadow-md rounded-lg"
    >
      <div className="flex flex-col gap-2 text-black">
        <div className="relative w-full aspect-square">
          <Image alt="" src={imageUrl} fill />
        </div>
        <div className="font-semibold text-sm flex gap-2">
          <span className="text-red-400">{convertToVnd(price)}</span>
          {discountPercent && (
            <span className="line-through text-gray-400">
              {convertToVnd(price + (price * discountPercent) / 100)}
            </span>
          )}
        </div>
        <div className="text-xs">
          <h3 className="font-bold">{brandName}</h3>
          <p className="line-clamp-2">{name}</p>
        </div>
      </div>
    </Link>
  );
}
