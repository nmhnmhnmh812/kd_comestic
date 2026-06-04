import Banner from "./components/Banner";
import PromoteSession from "./components/PromoteSession";
import SpecialSection from "./components/SpecialSection";
import RecentBlogs from "./components/RecentBlogs";
import { getHomeSections } from "@/api/home";

export default async function HomePage() {
  const sections = await getHomeSections();
  const sorted = sections.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  return (
    <div className="flex flex-col gap-3 md:gap-5 md:py-5">
      <Banner />
      {sorted.map((section, index) => {
        if (section.type === "CATEGORY" && section.categoryId != null) {
          return (
            <PromoteSession
              key={section.id}
              categoryId={section.categoryId}
              reverse={index % 2 === 1}
            />
          );
        }
        if (section.type === "TRENDING" || section.type === "SALE") {
          return (
            <SpecialSection
              key={section.id}
              type={section.type}
              reverse={index % 2 === 1}
            />
          );
        }
        return null;
      })}
      <RecentBlogs />
    </div>
  );
}
