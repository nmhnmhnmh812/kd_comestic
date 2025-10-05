import Image from "next/image";
import banner1 from "@/assets/images/banner1.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import banner3 from "@/assets/images/banner3.png";

export default function Banner() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-7xl aspect-[2.4/1] flex gap-2">
        <div className="h-full w-1/5 relative">
          <Image alt="" src={banner1} fill className="object-cover" />
        </div>
        <div className="flex-1 h-full relative">
          <Image alt="" src={banner2} fill className="object-cover" />
        </div>
        <div className="h-full w-1/5 relative flex flex-col gap-2">
          <div className="flex-1 relative">
            <Image alt="" src={banner2} fill className="object-cover" />
          </div>
          <div className="flex-1 relative">
            <Image alt="" src={banner3} fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
