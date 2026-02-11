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
import { AnimatedElement, Button } from "../../../components/common";
import blogData from "../../../data/blog.json";

export default function BlogDetailClient({ slug }) {
  const posts = blogData.posts;
  const currentIndex = posts.findIndex((p) => p.id === slug);
  const post = posts[currentIndex];

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

  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // Related posts (same category, excluding current)
  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

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
          {/* Category */}
          <div className="mb-4">
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
              style={{
                backgroundColor: `${post.categoryColor}20`,
                color: post.categoryColor,
                border: `1px solid ${post.categoryColor}40`,
              }}
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-4 text-text-muted text-sm">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary" />
              {post.author}
            </span>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              {post.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              {post.readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span className="flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-primary" />
              {post.type}
            </span>
          </div>
        </AnimatedElement>

        {/* Hero Image */}
        <AnimatedElement animation="fadeUp" delay={0.1} className="mb-12">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-surface max-w-4xl mx-auto">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${post.image}')`,
                backgroundColor: "#2a2a2a",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
          </div>
        </AnimatedElement>

        {/* Article Content */}
        <AnimatedElement animation="fadeUp" delay={0.2}>
          <article className="max-w-3xl mx-auto mb-16">
            {post.content && post.content.length > 0 ? (
              post.content.map((block, index) => {
                if (block.type === "heading") {
                  return (
                    <motion.h2
                      key={index}
                      className="text-xl md:text-2xl font-display font-bold text-text-primary mt-10 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 }}
                    >
                      {block.text}
                    </motion.h2>
                  );
                }
                return (
                  <motion.p
                    key={index}
                    className="text-text-secondary text-base md:text-lg leading-relaxed mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                  >
                    {block.text}
                  </motion.p>
                );
              })
            ) : (
              <p className="text-text-secondary text-lg leading-relaxed">
                {post.excerpt}
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
                  backgroundColor: `${post.categoryColor}20`,
                  color: post.categoryColor,
                  border: `1px solid ${post.categoryColor}40`,
                }}
              >
                {post.category}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-text-muted text-sm">Tür:</span>
              <span className="text-text-primary text-sm font-medium">
                {post.type}
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
                <Link href={`/blog/${related.id}`} key={related.id}>
                  <motion.div
                    className="group flex gap-4 p-4 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{
                        backgroundImage: `url('${related.image}')`,
                        backgroundColor: "#2a2a2a",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-text-muted">
                        {related.date}
                      </span>
                      <h4 className="text-text-primary font-medium text-sm mt-1 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {related.title}
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
              href={`/blog/${prevPost.id}`}
              className="group flex items-center gap-4 p-6 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors group-hover:-translate-x-1 duration-300" />
              <div className="min-w-0">
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  Önceki Yazı
                </span>
                <p className="text-text-primary font-medium group-hover:text-primary transition-colors duration-300">
                  {prevPost.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextPost && (
            <Link
              href={`/blog/${nextPost.id}`}
              className="group flex items-center justify-end gap-4 p-6 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300 text-right"
            >
              <div className="min-w-0">
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  Sonraki Yazı
                </span>
                <p className="text-text-primary font-medium group-hover:text-primary transition-colors duration-300">
                  {nextPost.title}
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
