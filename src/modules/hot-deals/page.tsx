import Tabs from "@/components/Tabs";
import Image from "next/image";
import banner1 from "@/assets/images/banner1.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import Link from "next/link";

const BANNERS = [
  {
    title: "Banner 1",
    imageUrl: banner1,
    link: "/banner1",
  },
  {
    title: "Banner 2",
    imageUrl: banner2,
    link: "/banner2",
  },
  {
    title: "Banner 3",
    imageUrl: banner2,
    link: "/banner1",
  },
  {
    title: "Banner 4",
    imageUrl: banner1,
    link: "/banner2",
  },
];

export default function HotDealsScreen() {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-5 py-5">
      <Tabs />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-2 gap-y-4">
        {BANNERS.map((banner) => (
          <Link
            key={banner.link}
            href={banner.link}
            className="aspect-[2.5] w-full flex flex-col gap-2"
          >
            <div className="relative h-full w-full shadow-md rounded-md overflow-hidden">
              <Image
                alt={banner.title}
                src={banner.imageUrl}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="font-bold text-xl uppercase">{banner.title}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
