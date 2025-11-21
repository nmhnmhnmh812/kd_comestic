import Image from "next/image";
import banner1 from "@/assets/images/banner1.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import banner3 from "@/assets/images/banner3.png";

export default function Banner() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-7xl aspect-[2/1] md:aspect-[2.4/1] flex flex-col md:flex-row gap-2">
        {/* Left banner - hide on mobile */}
        <div className="hidden md:block h-full w-1/5 relative">
          <Image alt="" src={banner1} fill className="object-cover rounded-lg" />
        </div>
        {/* Main banner */}
        <div className="flex-1 h-full relative">
          <Image alt="" src={banner2} fill className="object-cover rounded-lg" />
        </div>
        {/* Right banners - hide on mobile */}
        <div className="hidden md:flex h-full w-1/5 relative flex-col gap-2">
          <div className="flex-1 relative">
            <Image alt="" src={banner2} fill className="object-cover rounded-lg" />
          </div>
          <div className="flex-1 relative">
            <Image alt="" src={banner3} fill className="object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
