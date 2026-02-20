"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  SectionTitle,
  Button,
  AnimatedElement,
  StaggerContainer,
  StaggerItem,
} from "../common";

export default function ProjectsSection({
  title,
  subtitle,
  viewAllText,
  projects,
}) {
  const projectsList = projects || [];
  const featuredProjects = projectsList
    .filter((p) => p.oneChikarilsin || p.featured)
    .slice(0, 6);

  // If no featured projects, show first 6
  const displayProjects =
    featuredProjects.length > 0 ? featuredProjects : projectsList.slice(0, 6);

  if (displayProjects.length === 0) return null;

  return (
    <section className="pt-16 md:pt-24 lg:pt-32 pb-8 md:pb-12 lg:pb-16 bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <SectionTitle
            title={title || "Çalışmalarımız"}
            subtitle={subtitle}
            className="mb-6 md:mb-0"
          />
          <AnimatedElement animation="fadeLeft">
            <Button href="/calismalar" variant="secondary" icon="arrow">
              {viewAllText || "Tüm Projeleri Gör"}
            </Button>
          </AnimatedElement>
        </div>

        {/* Projects Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayProjects.map((project, index) => (
            <StaggerItem key={project._id || project.id || index}>
              <motion.article
                className="group relative rounded-2xl overflow-hidden bg-surface cursor-default"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={project.gorselUrl || project.image}
                      alt={project.baslik || project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 transition-opacity duration-300" />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-text-primary transition-colors duration-300 mb-3">
                        {project.baslik || project.title}
                      </h3>
                      {/* Services as subtle badges */}
                      <div className="flex flex-wrap gap-2">
                        {(project.hizmetler || []).map((service, sIndex) => (
                          <span
                            key={sIndex}
                            className="inline-block px-3 py-1 text-[12px] font-bold rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom border accent */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
