import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AnimatedElement,
  StaggerContainer,
  StaggerItem,
} from "../components/common";
import projectsData from "../data/projects.json";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("Tümü");

  // Extract unique categories
  const allCategories = useMemo(() => {
    const cats = new Set();
    projectsData.projects.forEach((p) =>
      p.categories.forEach((c) => cats.add(c)),
    );
    return ["Tümü", ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Tümü") return projectsData.projects;
    return projectsData.projects.filter((p) =>
      p.categories.includes(activeFilter),
    );
  }, [activeFilter]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container-custom">
        {/* Page Header */}
        <AnimatedElement animation="fadeUp" className="mb-12 md:mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
            {projectsData.sectionSubtitle}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6 leading-tight">
            Fikirden etkiye,
            <br />
            <span className="text-gradient">imzamız her yerde.</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
            Stratejiden tasarıma, geliştirmeden pazarlamaya — her projemizde
            markaları öne çıkarıyoruz.
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

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link to={`/calismalar/${project.id}`}>
                    <motion.article
                      className="group relative rounded-2xl overflow-hidden bg-surface border border-text-primary/5 cursor-pointer h-full"
                      whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url('${project.image}')`,
                            backgroundColor: "#2a2a2a",
                          }}
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-70" />

                        {/* Year Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="text-xs px-3 py-1 rounded-full bg-surface/10 backdrop-blur-sm text-text-primary/80 border border-text-primary/10">
                            {project.year}
                          </span>
                        </div>

                        {/* Hover Arrow */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-background" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                          {project.categories.map((cat, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-3 py-1 rounded-full bg-text-primary/5 text-text-muted border border-text-primary/5"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </motion.article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-secondary">
              Bu kategoride henüz proje bulunmuyor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
