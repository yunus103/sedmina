import BlogClient from "./BlogClient";
import { sanityFetch } from "../../../sanity/lib/fetch";
import { allBlogPostsQuery } from "../../../sanity/lib/queries";

export const metadata = {
  title: "Blog | Dijital Dünyadan Yazılar",
  description:
    "Web tasarım, dijital pazarlama, SEO ve teknoloji dünyasından güncel yazılar ve rehberler.",
};

export default async function BlogPage() {
  const { data: posts } = await sanityFetch(allBlogPostsQuery);
  return <BlogClient posts={posts} />;
}
