import CategoryScreen from "@/modules/danh-muc";

export default async function CategoryPage({ params }: { params: { slug: any } }) {
  return <CategoryScreen params={Promise.resolve(params)} />;
}
