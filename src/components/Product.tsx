import demoProduct from "@/assets/images/demo_product.png";
import Image from "next/image";

export default function Product() {
  return (
    <div className="w-full my-1 p-2 relative flex flex-col gap-2 cursor-pointer hover:shadow-md rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="relative w-full aspect-square">
          <Image alt="" src={demoProduct} fill />
        </div>
        <div className="font-semibold text-sm flex gap-2">
          <span className="text-red-400">250.000đ</span>
          <span className="line-through text-gray-400">279.000đ</span>
        </div>
        <div className="text-xs">
          <h3 className="font-bold">PERIPERA</h3>
          <p className="line-clamp-2">
            Son kem Peripera Over Blur Tint - 05 Vintage Acorn
          </p>
        </div>
      </div>
    </div>
  );
}
