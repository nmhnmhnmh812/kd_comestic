import Image from "next/image";
import banner1 from "@/assets/images/banner1.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import banner3 from "@/assets/images/banner3.png";

export default function Banner() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-7xl">
        {/* Mobile: Single banner stacked */}
        <div className="sm:hidden w-full aspect-[16/9] relative">
          <Image alt="Banner" src={banner2} fill className="object-cover rounded-lg" />
        </div>
        
        {/* Tablet: 2 column layout */}
        <div className="hidden sm:flex lg:hidden gap-2 aspect-[2.4/1]">
          <div className="flex-1 h-full relative">
            <Image alt="Main Banner" src={banner2} fill className="object-cover rounded-lg" />
          </div>
          <div className="h-full w-1/3 relative flex flex-col gap-2">
            <div className="flex-1 relative">
              <Image alt="Side Banner 1" src={banner1} fill className="object-cover rounded-lg" />
            </div>
            <div className="flex-1 relative">
              <Image alt="Side Banner 2" src={banner3} fill className="object-cover rounded-lg" />
            </div>
          </div>
        </div>
        
        {/* Desktop: Full 3 column layout */}
        <div className="hidden lg:flex aspect-[2.4/1] gap-2">
          <div className="h-full w-1/5 relative">
            <Image alt="Left Banner" src={banner1} fill className="object-cover rounded-lg" />
          </div>
          <div className="flex-1 h-full relative">
            <Image alt="Main Banner" src={banner2} fill className="object-cover rounded-lg" />
          </div>
          <div className="h-full w-1/5 relative flex flex-col gap-2">
            <div className="flex-1 relative">
              <Image alt="Side Banner 1" src={banner2} fill className="object-cover rounded-lg" />
            </div>
            <div className="flex-1 relative">
              <Image alt="Side Banner 2" src={banner3} fill className="object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
