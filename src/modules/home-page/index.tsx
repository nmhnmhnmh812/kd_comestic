import Banner from "./components/Banner";
import PromoteSession from "./components/PromoteSession";
import RecentBlogs from "./components/RecentBlogs";
import { getHomeSections } from "@/api/home";

export default async function HomePage() {
  const sections = await getHomeSections();
  const categoryIds = sections
    .filter((s) => s.type === "CATEGORY" && s.categoryId != null)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((s) => s.categoryId as number);

  return (
    <div className="flex flex-col gap-3 md:gap-5 md:py-5">
      <Banner />
      {categoryIds.map((categoryId, index) => (
        <PromoteSession
          key={categoryId}
          categoryId={categoryId}
          reverse={index % 2 === 1}
        />
      ))}
      <RecentBlogs />
    </div>
  );
}
