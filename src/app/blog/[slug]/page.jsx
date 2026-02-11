import blogData from "../../../data/blog.json";
import BlogDetailClient from "./BlogDetailClient";


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogData.posts.find((p) => p.id === slug);

  if (!post) {
    return {
      title: "Yazı Bulunamadı",
      description: "Aradığınız blog yazısı bulunamadı.",
    };
  }

  return {
    title: `${post.title} | SedMina`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | SedMina`,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export async function generateStaticParams() {
  return blogData.posts.map((post) => ({
    slug: post.id,
  }));
}

import JsonLd from "../../../components/seo/JsonLd";

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = blogData.posts.find((p) => p.id === slug);

  if (!post) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.date,
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
      <BlogDetailClient slug={slug} />
    </>
  );
}
