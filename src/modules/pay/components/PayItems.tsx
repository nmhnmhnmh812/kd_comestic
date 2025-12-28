import { CartItem } from "@/types";
import { convertToVnd } from "@/utils";
import {
  getDisplayImage,
  getDisplayName,
  getDisplayPrice,
  getOriginalPrice,
} from "@/utils/cartUtils";
import { Spin } from "antd";
import Image from "next/image";

export default function PayItems({
  cartItems,
  loading,
}: {
  cartItems: CartItem[];
  loading: boolean;
}) {
  const originalPrice = (item: CartItem) => {
    const oldPrice = getOriginalPrice(item);
    return convertToVnd(oldPrice * (item?.quantity || 0));
  };
  return (
    <div className="px-4 py-3 flex flex-col gap-4">
      {!loading ? (
        cartItems?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4"
          >
            <Image
              src={getDisplayImage(item)}
              alt={getDisplayName(item)}
              width={80}
              height={80}
            />
            <div className="flex flex-col gap-2 flex-1">
              <span
                className="font-medium line-clamp-2"
                title={getDisplayName(item)}
              >
                {getDisplayName(item)}
              </span>
              <span>SL: {item.quantity}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-red-600">
                {convertToVnd(getDisplayPrice(item) * (item?.quantity || 0))}
              </span>
            </div>
          </div>
        ))
      ) : (
        <Spin />
      )}
    </div>
  );
}
