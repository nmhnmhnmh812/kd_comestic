import { CartItem } from "@/types";
import { convertToOriginalPrice, convertToVnd } from "@/utils";
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
    const oldPrice = convertToOriginalPrice(
      item?.product?.price || 0,
      item?.product?.discount || 0
    );
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
              src={item?.product?.blobs?.[0]?.url || ""}
              alt={item?.product?.name || ""}
              width={80}
              height={80}
            />
            <div className="flex flex-col gap-2 flex-1">
              <span
                className="font-medium line-clamp-2"
                title={item?.product?.name}
              >
                {item?.product?.name}
              </span>
              <span>SL: {item.quantity}</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-red-600">
                {convertToVnd(
                  (item?.product?.finalPrice || 0) * (item?.quantity || 0)
                )}
              </span>
              <span className="font-bold">{originalPrice(item)}</span>
            </div>
          </div>
        ))
      ) : (
        <Spin />
      )}
    </div>
  );
}
