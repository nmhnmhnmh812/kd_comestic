import Banner from "./components/Banner";
import ProductSession from "./components/ProductSession";
import PromoteSession from "./components/PromoteSession";

export default function HomePage() {
  const categories = [36, 37, 38];

  return (
    <div className="flex flex-col gap-5 py-5">
      <Banner />
      {/* <ProductSession title="Flash sale" link="/flash-sale" />
      <ProductSession title="Sản phẩm hot" link="/hot-deals" /> */}
      {categories.map((categoryId, index) => (
        <PromoteSession
          key={categoryId}
          categoryId={categoryId}
          reverse={index % 2 === 1}
        />
      ))}
    </div>
  );
}
