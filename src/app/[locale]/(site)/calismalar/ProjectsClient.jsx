"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "../../../../i18n/routing";
import {
  AnimatedElement,
  StaggerContainer,
  StaggerItem,
} from "../../../../components/common";
import { useTranslations } from "next-intl";

export default function ProjectsClient({ projects, pageData }) {
  const t = useTranslations("Projects");
  const [activeFilter, setActiveFilter] = useState(t("all"));

  const projectsList = projects || [];
  const pData = pageData || {};

  // Extract unique services for filtering
  const allFilters = useMemo(() => {
    const cats = new Set();
    projectsList.forEach((p) =>
      (p.hizmetler || []).forEach((c) => cats.add(c)),
    );
    const sortedCats = Array.from(cats).sort();
    return [t("all"), ...sortedCats];
  }, [projectsList, t]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === t("all")) return projectsList;
    return projectsList.filter((p) =>
      (p.hizmetler || []).includes(activeFilter),
    );
  }, [activeFilter, projectsList]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container-custom">
        {/* Page Header */}
        <AnimatedElement animation="fadeUp" className="mb-12 md:mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
            {pData.ustBaslik || "Portföyümüz"}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6 leading-tight whitespace-pre-wrap">
            {pData.baslik || "Fikirden etkiye, imzamız her yerde."}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl leading-relaxed whitespace-pre-wrap">
            {pData.aciklama || "Stratejiden tasarıma, geliştirmeden pazarlamaya — her projemizde markaları öne çıkarıyoruz."}
          </p>
        </AnimatedElement>

        {/* Filters */}
        <AnimatedElement animation="fadeUp" delay={0.1} className="mb-12">
          <div className="flex flex-wrap gap-3">
            {allFilters.map((cat) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id || project.id || index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <motion.article
                  className="group relative rounded-2xl overflow-hidden bg-surface border border-text-primary/5 cursor-default h-full"
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${project.gorselUrl || project.image}')`,
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />

                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 transition-colors duration-300">
                      {project.baslik || project.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {project.aciklama || project.description}
                    </p>

                    {/* Services badges */}
                    <div className="flex flex-wrap gap-2">
                      {(project.hizmetler || []).map((service, i) => (
                        <span
                          key={i}
                          className="text-[12px] font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </motion.article>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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
