import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SectionTitle,
  Button,
  AnimatedElement,
  StaggerContainer,
  StaggerItem,
} from "../common";
import projectsData from "../../data/projects.json";

export default function ProjectsSection() {
  const featuredProjects = projectsData.projects
    .filter((p) => p.featured)
    .slice(0, 4);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <SectionTitle
            title={projectsData.sectionTitle}
            subtitle={projectsData.sectionSubtitle}
            className="mb-6 md:mb-0"
          />
          <AnimatedElement animation="fadeLeft">
            <Button
              href={projectsData.viewAllLink.href}
              variant="secondary"
              icon="arrow"
            >
              {projectsData.viewAllLink.label}
            </Button>
          </AnimatedElement>
        </div>

        {/* Projects Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featuredProjects.map((project, index) => (
            <StaggerItem key={project.id}>
              <Link to={`/calismalar/${project.id}`}>
                <motion.article
                  className="group relative rounded-2xl overflow-hidden bg-surface cursor-pointer"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Project Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${project.image}')`,
                        backgroundColor: "#2a2a2a",
                      }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Hover overlay */}
                    <motion.div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.categories.map((category, catIndex) => (
                            <span
                              key={catIndex}
                              className="text-xs text-text-muted"
                            >
                              {category}
                              {catIndex < project.categories.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-text-muted font-medium">
                        {project.year}
                      </span>
                    </div>

                    {/* Arrow indicator */}
                    <motion.div
                      className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-text-primary/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(0, 212, 255, 0.2)",
                      }}
                    >
                      <ArrowRight className="w-4 h-4 text-text-primary group-hover:text-primary" />
                    </motion.div>
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
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
