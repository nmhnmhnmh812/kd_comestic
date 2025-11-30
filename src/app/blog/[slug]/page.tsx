import BlogDetailScreen from "@/modules/blog/detail/page";

export default function BlogDetail({ params }: { params: { slug: string } }) {
  return <BlogDetailScreen slug={params.slug} />;
}
