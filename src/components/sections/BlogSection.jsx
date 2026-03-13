"use client";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Link } from "../../i18n/routing";
import Image from "next/image";
import {
  SectionTitle,
  Button,
  AnimatedElement,
  StaggerContainer,
  StaggerItem,
} from "../common";

export default function BlogSection({ title, subtitle, viewAllText, posts }) {
  const postsList = posts || [];
  const previewPosts = postsList.slice(0, 3);

  if (previewPosts.length === 0) return null;

  return (
    <section className="pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-24 lg:pb-32 bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <SectionTitle
            title={title || "Blog"}
            subtitle={subtitle}
            className="mb-6 md:mb-0"
          />
          <AnimatedElement animation="fadeLeft" className="hidden md:block">
            <Button href="/blog" variant="secondary" icon="arrow">
              {viewAllText || "Tüm Yazıları Gör"}
            </Button>
          </AnimatedElement>
        </div>

        {/* Blog Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {previewPosts.map((post, index) => (
            <StaggerItem key={post._id || post.id || index}>
              <Link href={`/${post.slug || post.id}`}>
                <motion.article
                  className="group relative flex flex-col bg-surface rounded-2xl overflow-hidden border border-text-primary/5 h-full cursor-pointer"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={post.gorselUrl || post.image}
                        alt={post.baslik || post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />

                    {/* Category Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2 pr-4">
                      {(post.kategoriler || []).map((cat, i) => (
                        <span
                          key={i}
                          className="inline-block px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md bg-background/40 text-text-primary border border-text-primary/10"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-text-muted text-xs mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.tarih || post.date}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-text-muted" />
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        {post.tur || post.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {post.baslik || post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {post.ozet || post.excerpt}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-primary text-sm font-medium group/link">
                      <span>Makaleyi Oku</span>
                      <motion.div className="transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom hover accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile View All Button */}
        <AnimatedElement
          animation="fadeUp"
          className="mt-10 md:hidden flex justify-center"
        >
          <Button href="/blog" variant="secondary" icon="arrow">
            {viewAllText || "Tüm Yazıları Gör"}
          </Button>
        </AnimatedElement>
      </div>
    </section>
  );
}
