import { Collapse, Empty } from "antd";
import { Order } from "@/types";
import { convertToVnd } from "@/utils";
import Image from "next/image";

interface OrderItemsProps {
  order: Order;
}

export default function OrderItems({ order }: OrderItemsProps) {
  return (
    <div className="mb-6">
      {order.orderItems && order.orderItems.length > 0 ? (
        <Collapse
          ghost
          items={[
            {
              key: "1",
              label: (
                <span className="font-semibold text-gray-700">
                  Sản phẩm ({order.orderItems.length})
                </span>
              ),
              children: (
                <div className="space-y-3">
                  {order.orderItems.map((item: any, index: number) => {
                    const imageUrl =
                      item.variant?.blobs?.[0]?.url ||
                      item.product?.blobs?.[0]?.url ||
                      "/placeholder.jpg";
                    const productName = item.variant?.name
                      ? `${item.product?.name || item.productName} - ${item.variant.name}`
                      : item.product?.name || item.productName;

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                      >
                        <div className="relative w-[60px] h-[60px] flex-shrink-0">
                          <Image
                            src={imageUrl}
                            alt={productName}
                            fill
                            className="rounded object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/placeholder.jpg";
                            }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2">
                            {productName}
                          </p>
                          <p className="text-sm text-gray-500">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-600">
                            {convertToVnd(
                              (item.finalPrice || item.price) * item.quantity,
                            )}
                          </p>
                          {item.finalPrice && item.price > item.finalPrice && (
                            <p className="text-xs text-gray-400 line-through">
                              {convertToVnd(item.price * item.quantity)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ),
            },
          ]}
        />
      ) : (
        <Empty description="Không có sản phẩm" />
      )}
    </div>
  );
}
