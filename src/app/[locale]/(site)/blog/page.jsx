import BlogClient from "./BlogClient";
import { sanityFetch } from "../../../../sanity/lib/fetch";
import {
  allBlogPostsQuery,
  allBlogCategoriesQuery,
  blogSayfasiQuery,
} from "../../../../sanity/lib/queries";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { data: pageData } = await sanityFetch(blogSayfasiQuery, { locale });
  const seo = pageData?.seo || {};

  return {
    title: seo.baslik || pageData?.baslik || "Blog",
    description:
      seo.aciklama ||
      pageData?.aciklama ||
      "Web tasarım, dijital pazarlama, SEO ve teknoloji dünyasından güncel yazılar ve rehberler.",
  };
}

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const [{ data: posts }, { data: categories }, { data: pageData }] = await Promise.all([
    sanityFetch(allBlogPostsQuery, { locale }),
    sanityFetch(allBlogCategoriesQuery),
    sanityFetch(blogSayfasiQuery, { locale }),
  ]);

  return <BlogClient posts={posts} categories={categories} pageData={pageData} />;
}
