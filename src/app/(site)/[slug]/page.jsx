import { notFound } from "next/navigation";
import { sanityFetch } from "../../../sanity/lib/fetch";
import {
  blogPostBySlugQuery,
  allBlogPostsQuery,
} from "../../../sanity/lib/queries";
import BlogDetailClient from "./BlogDetailClient";
import JsonLd from "../../../components/seo/JsonLd";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: post } = await sanityFetch(blogPostBySlugQuery, { slug });

  if (!post) return;

  return {
    title: post.seo?.baslik || `${post.baslik} | SedMina`,
    description: post.seo?.aciklama || post.ozet,
    keywords: post.seo?.anahtarKelimeler || [],
    openGraph: {
      title: post.seo?.baslik || `${post.baslik} | SedMina`,
      description: post.seo?.aciklama || post.ozet,
      images: [
        {
          url: post.seo?.ogGorselUrl || post.gorselUrl,
          width: 1200,
          height: 630,
          alt: post.seo?.baslik || post.baslik,
        },
      ],
      type: "article",
      publishedTime: post.tarih,
      authors: [post.yazar],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.baslik || `${post.baslik} | SedMina`,
      description: post.seo?.aciklama || post.ozet,
      images: [post.seo?.ogGorselUrl || post.gorselUrl],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const [postRes, allPostsRes] = await Promise.all([
    sanityFetch(blogPostBySlugQuery, { slug }),
    sanityFetch(allBlogPostsQuery),
  ]);

  const post = postRes.data;
  const allPosts = allPostsRes.data;

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.baslik,
    description: post.ozet,
    image: post.gorselUrl,
    author: {
      "@type": "Person",
      name: post.yazar,
    },
    datePublished: post.tarih,
    publisher: {
      "@type": "Organization",
      name: "SedMina",
      logo: {
        "@type": "ImageObject",
        url: "https://sedminadijital.com/logo.png",
      },
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogDetailClient post={post} allPosts={allPosts} />
    </>
  );
}
