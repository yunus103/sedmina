import { sanityFetch } from "../../../../sanity/lib/fetch";
import {
  blogPostBySlugQuery,
  allBlogPostsQuery,
} from "../../../../sanity/lib/queries";
import BlogDetailClient from "./BlogDetailClient";
import JsonLd from "../../../../components/seo/JsonLd";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: post } = await sanityFetch(blogPostBySlugQuery, { slug });

  if (!post) {
    return {
      title: "Yazı Bulunamadı",
      description: "Aradığınız blog yazısı bulunamadı.",
    };
  }

  return {
    title: post.seo?.baslik || `${post.baslik} | SedMina`,
    description: post.seo?.aciklama || post.ozet,
    keywords: post.seo?.anahtarKelimeler || [],
    openGraph: {
      title: post.seo?.baslik || `${post.baslik} | SedMina`,
      description: post.seo?.aciklama || post.ozet,
      ...(post.gorselUrl && { images: [post.gorselUrl] }),
      type: "article",
      publishedTime: post.tarih,
      authors: [post.yazar],
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

  if (!post) return null;

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
        url: "https://sedmina.com/logo.png",
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
