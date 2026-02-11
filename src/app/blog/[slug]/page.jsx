import blogData from "../../../data/blog.json";
import BlogDetailClient from "./BlogDetailClient";

export async function generateStaticParams() {
  return blogData.posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
