import BlogClient from "./BlogClient";
import { sanityFetch } from "../../../sanity/lib/fetch";
import {
  allBlogPostsQuery,
  allBlogCategoriesQuery,
} from "../../../sanity/lib/queries";

export const metadata = {
  title: "Blog | Dijital Dünyadan Yazılar",
  description:
    "Web tasarım, dijital pazarlama, SEO ve teknoloji dünyasından güncel yazılar ve rehberler.",
};

export default async function BlogPage() {
  const [{ data: posts }, { data: categories }] = await Promise.all([
    sanityFetch(allBlogPostsQuery),
    sanityFetch(allBlogCategoriesQuery),
  ]);

  return <BlogClient posts={posts} categories={categories} />;
}
