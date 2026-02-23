"use client";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { AnimatedElement, Button } from "../../../components/common";
import Image from "next/image";
import { urlFor } from "../../../sanity/image";

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      const { hizalama, genislik, alt, caption } = value;

      // Default values
      const align = hizalama || "center";
      const width = genislik || "full";

      // Width classes mapping (Desktop only)
      // Mobile is always w-full for better UX
      const widthClasses = {
        small: "md:w-1/4", // 25%
        medium: "md:w-1/2", // 50%
        large: "md:w-3/4", // 75%
        full: "w-full", // 100%
      };

      // Alignment & Layout Logic
      // We use 'float' for wrapping text on desktop
      let containerClasses = "relative mb-8 rounded-xl overflow-hidden ";

      if (width === "full") {
        // Full width images shouldn't float usually, just center
        containerClasses += "w-full my-8";
      } else {
        // Mobile: always absolute full width or comfortably large
        containerClasses += "w-full " + widthClasses[width];

        if (align === "left") {
          containerClasses += " md:float-left md:mr-8 md:mb-6";
        } else if (align === "right") {
          containerClasses += " md:float-right md:ml-8 md:mb-6";
        } else {
          // Center
          containerClasses += " mx-auto md:my-8";
        }
      }

      return (
        <div className={containerClasses}>
          <div className="relative w-full border border-text-primary/5 rounded-xl overflow-hidden bg-surface">
            {/* Using standard img for reliable float behavior in rich text, Next.Image can be tricky with partial widths in rich text flows without strict sizing */}
            <Image
              src={urlFor(value).url()}
              alt={alt || "Blog görseli"}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              loading="lazy"
            />
          </div>
          {caption && (
            <p className="mt-3 text-sm text-text-muted italic text-center w-full">
              {caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6 last:mb-0">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl md:text-2xl font-display font-bold text-text-primary mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg md:text-xl font-display font-bold text-text-primary mt-10 mb-4">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-text-secondary my-8">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 text-text-secondary space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 text-text-secondary space-y-2">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-text-primary font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-primary hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

export default function BlogDetailClient({ post, allPosts }) {
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-text-primary mb-4">
            Yazı Bulunamadı
          </h1>
          <p className="text-text-secondary mb-8">
            Aradığınız blog yazısı mevcut değil.
          </p>
          <Button href="/blog" variant="primary" icon="arrow">
            Tüm Yazılara Dön
          </Button>
        </div>
      </div>
    );
  }

  const posts = allPosts || [];
  const currentIndex = posts.findIndex(
    (p) => (p.slug || p.id) === (post.slug || post.id),
  );
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // Related posts (same category overlap, excluding current)
  const relatedPosts = posts
    .filter((p) => {
      if ((p.slug || p.id) === (post.slug || post.id)) return false;
      const pCats = p.kategoriler || [];
      const currentCats = post.kategoriler || [];
      return pCats.some((cat) => currentCats.includes(cat));
    })
    .slice(0, 2);

  const categoryColor = post.kategoriRenk || post.categoryColor || "#00D4FF";

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container-custom">
        {/* Breadcrumb */}
        <AnimatedElement animation="fadeUp">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-primary transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Tüm Yazılar
          </Link>
        </AnimatedElement>

        {/* Article Header */}
        <AnimatedElement animation="fadeUp" className="max-w-3xl mx-auto mb-10">
          {/* Categories */}
          <div className="mb-4 flex flex-wrap gap-2">
            {(post.kategoriler || []).map((cat, i) => (
              <span
                key={i}
                className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                style={{
                  backgroundColor: `${categoryColor}15`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}30`,
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-6 leading-tight">
            {post.baslik || post.title}
          </h1>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-4 text-text-muted text-sm">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary" />
              {post.yazar || post.author}
            </span>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              {post.tarih || post.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              {post.okumaSuresi || post.readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span className="flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-primary" />
              {post.tur || post.type}
            </span>
          </div>
        </AnimatedElement>

        {/* Hero Image */}
        <AnimatedElement animation="fadeUp" delay={0.1} className="mb-12">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-surface max-w-4xl mx-auto border border-text-primary/5 shadow-2xl">
            <Image
              src={post.gorselUrl || post.image}
              alt={post.gorselAlt || post.baslik || "Blog yazısı görseli"}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
          </div>
        </AnimatedElement>

        {/* Article Content */}
        <AnimatedElement animation="fadeUp" delay={0.2}>
          <article className="max-w-4xl mx-auto mb-16">
            {post.icerik && Array.isArray(post.icerik) ? (
              <PortableText
                value={post.icerik}
                components={portableTextComponents}
              />
            ) : post.content && post.content.length > 0 ? (
              post.content.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <h2
                      key={index}
                      className="text-xl md:text-2xl font-display font-bold text-text-primary mt-10 mb-4"
                    >
                      {block.text}
                    </h2>
                  );
                }
                return (
                  <p
                    key={index}
                    className="text-text-secondary text-base md:text-lg leading-relaxed mb-6"
                  >
                    {block.text}
                  </p>
                );
              })
            ) : (
              <p className="text-text-secondary text-lg leading-relaxed">
                {post.ozet || post.excerpt}
              </p>
            )}
          </article>
        </AnimatedElement>

        {/* Share / Tags Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-between p-6 rounded-2xl bg-surface/50 border border-text-primary/5">
            <div className="flex items-center gap-3">
              <span className="text-text-muted text-sm">Kategori:</span>
              <span
                className="px-3 py-1 text-xs font-semibold rounded-full"
                style={{
                  backgroundColor: `${categoryColor}20`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}40`,
                }}
              >
                {post.kategori || post.category}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-text-muted text-sm">Tür:</span>
              <span className="text-text-primary text-sm font-medium">
                {post.tur || post.type}
              </span>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto mb-16">
            <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-8">
              Benzer Yazılar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  href={`/${related.slug || related.id}`}
                  key={related._id || related.id}
                >
                  <motion.div
                    className="group flex gap-4 p-4 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                      <Image
                        src={related.gorselUrl || related.image}
                        alt={related.baslik || related.title || "İlgili Yazı"}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-text-muted">
                        {related.tarih || related.date}
                      </span>
                      <h4 className="text-text-primary font-medium text-sm mt-1 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {related.baslik || related.title}
                      </h4>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <AnimatedElement animation="fadeUp" className="max-w-4xl mx-auto mb-16">
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 bg-surface border border-text-primary/5 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-4">
                Projenizi birlikte büyütelim.
              </h3>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                Dijital stratejinizi güçlendirmek için uzman ekibimizle
                iletişime geçin.
              </p>
              <Button href="/iletisim" variant="primary" icon="arrow">
                İletişime Geçin
              </Button>
            </div>
          </div>
        </AnimatedElement>

        {/* Prev/Next Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {prevPost ? (
            <Link
              href={`/${prevPost.slug || prevPost.id}`}
              className="group flex items-center gap-4 p-6 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors group-hover:-translate-x-1 duration-300" />
              <div className="min-w-0">
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  Önceki Yazı
                </span>
                <p className="text-text-primary font-medium group-hover:text-primary transition-colors duration-300">
                  {prevPost.baslik || prevPost.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextPost && (
            <Link
              href={`/${nextPost.slug || nextPost.id}`}
              className="group flex items-center justify-end gap-4 p-6 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300 text-right"
            >
              <div className="min-w-0">
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  Sonraki Yazı
                </span>
                <p className="text-text-primary font-medium group-hover:text-primary transition-colors duration-300">
                  {nextPost.baslik || nextPost.title}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
