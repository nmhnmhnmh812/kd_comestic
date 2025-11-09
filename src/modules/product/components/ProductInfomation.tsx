import QuantityInput from "@/components/QuantityInput";
import { IProduct } from "@/types";
import { convertToVnd } from "@/utils";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function ProductInformation({ product }: { product: IProduct }) {
  return (
    <div className="flex-1 flex flex-col justify-between gap-2 sm:gap-3">
      <h2 className="text-base sm:text-lg font-semibold text-red-600 uppercase">
        {product.brand}
      </h2>
      <h1 className="text-lg sm:text-xl font-bold text-gray-800">{product.name}</h1>
      <p className="text-xs sm:text-sm">Mã sản phẩm: {product.id}</p>
      <p>
        <span className="text-red-600 font-bold text-base sm:text-lg">
          Giá: {convertToVnd(product.price)}
        </span>{" "}
        <span className="text-xs sm:text-sm">(Đã bao gồm VAT)</span>
      </p>
      <p className="text-xs sm:text-sm">
        Giá gốc: {convertToVnd(product.oldPrice)} - Tiết kiệm:{" "}
        {convertToVnd(product.oldPrice - product.price)}{" "}
        <span className="text-red-600">
          (
          {Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100
          )}
          % )
        </span>
      </p>
      <div className="flex flex-col gap-2 sm:gap-3">
        <p className="text-sm sm:text-base">Phân loại:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Button key={index} className="text-xs sm:text-sm">
                Phân loại {index + 1}
              </Button>
            ))}
        </div>
      </div>
      <div className="flex gap-2 sm:gap-3 items-center text-sm sm:text-base">
        <span>Số lượng: </span>
        <QuantityInput />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button
          color="default"
          size="large"
          variant="solid"
          className="w-full text-xs sm:text-sm"
          icon={<ShoppingCartOutlined />}
        >
          Thêm vào giỏ hàng
        </Button>
        <Button
          color="danger"
          variant="solid"
          size="large"
          className="w-full text-xs sm:text-sm"
          icon={<ShoppingOutlined />}
        >
          Mua ngay
        </Button>
      </div>
    </div>
  );
}
