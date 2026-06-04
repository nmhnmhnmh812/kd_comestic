import Banner from "./components/Banner";
import PromoteSession from "./components/PromoteSession";
import SpecialSection from "./components/SpecialSection";
import BrandSection from "./components/BrandSection";
import CustomSection from "./components/CustomSection";
import RecentBlogs from "./components/RecentBlogs";
import { getHomeSections } from "@/api/home";

export default async function HomePage() {
  const sections = await getHomeSections();
  const sorted = sections.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  return (
    <div className="flex flex-col gap-3 md:gap-5 md:py-5">
      <Banner />
      {sorted.map((section, index) => {
        const reverse = index % 2 === 1;

        if (section.type === "CATEGORY" && section.categoryId != null) {
          return (
            <PromoteSession
              key={section.id}
              categoryId={section.categoryId}
              reverse={reverse}
            />
          );
        }

        if (section.type === "SUBCATEGORY" && section.subCategoryId != null) {
          return (
            <PromoteSession
              key={section.id}
              subCategoryId={section.subCategoryId}
              reverse={reverse}
            />
          );
        }

        if (section.type === "TRENDING" || section.type === "SALE") {
          return (
            <SpecialSection
              key={section.id}
              type={section.type}
              reverse={reverse}
            />
          );
        }

        if (section.type === "BRAND") {
          return <BrandSection key={section.id} reverse={reverse} />;
        }

        if (section.type === "CUSTOM" && section.sectionName) {
          return (
            <CustomSection
              key={section.id}
              sectionName={section.sectionName}
              products={section.products ?? []}
              reverse={reverse}
            />
          );
        }

        return null;
      })}
      <RecentBlogs />
    </div>
  );
}
