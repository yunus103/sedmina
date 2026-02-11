"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { AnimatedElement } from "../../components/common";
import blogData from "../../data/blog.json";

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("Tümü");

  const allCategories = useMemo(() => {
    const cats = new Set();
    blogData.posts.forEach((p) => cats.add(p.category));
    return ["Tümü", ...Array.from(cats)];
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeFilter === "Tümü") return blogData.posts;
    return blogData.posts.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container-custom">
        {/* Header */}
        <AnimatedElement animation="fadeUp" className="mb-12 md:mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
            {blogData.sectionSubtitle}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6 leading-tight">
            İçgörüler &<br />
            <span className="text-gradient">Perspektifler.</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
            Dijital dünyadan en güncel trendler, stratejiler ve ekibimizin
            uzmanlık alanlarından derinlemesine analizler.
          </p>
        </AnimatedElement>

        {/* Category Filters */}
        <AnimatedElement animation="fadeUp" delay={0.1} className="mb-12">
          <div className="flex flex-wrap gap-3">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeFilter === cat
                    ? "bg-primary text-background border-primary"
                    : "bg-transparent text-text-secondary border-text-primary/10 hover:border-primary/40 hover:text-text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedElement>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/blog/${post.id}`}>
                    <motion.article
                      className="group relative flex flex-col bg-surface rounded-2xl overflow-hidden border border-text-primary/5 h-full cursor-pointer"
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url('${post.image}')`,
                            backgroundColor: "#2a2a2a",
                          }}
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span
                            className="inline-block px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm"
                            style={{
                              backgroundColor: `${post.categoryColor}20`,
                              color: post.categoryColor,
                              border: `1px solid ${post.categoryColor}40`,
                            }}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-6">
                        {/* Meta */}
                        <div className="flex items-center gap-3 text-text-muted text-xs mb-3">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-text-muted" />
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Read More */}
                        <div className="flex items-center gap-2 text-primary text-sm font-medium">
                          <span>Makaleyi Oku</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>

                      {/* Bottom accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </motion.article>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-secondary">
              Bu kategoride henüz yazı bulunmuyor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
