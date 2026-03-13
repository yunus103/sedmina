"use client";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  Clock,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import {
  AnimatedElement,
  StaggerContainer,
  StaggerItem,
  Button,
} from "../../../../../components/common";
import { useTranslations } from "next-intl";

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-4">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mt-6 mb-3">
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-text-primary font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
  },
};

export default function ProjectDetailClient({ project, allProjects }) {
  const t = useTranslations("Projects");
  const tServices = useTranslations("Services");

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-text-primary mb-4">
            {t("postNotFound") || "Proje Bulunamadı"}
          </h1>
          <p className="text-text-secondary mb-8">
            {t("postNotFoundDesc") || "Aradığınız proje sayfası mevcut değil."}
          </p>
          <Button href="/calismalar" variant="primary" icon="arrow">
            {t("all")}
          </Button>
        </div>
      </div>
    );
  }

  const projects = allProjects || [];
  const currentIndex = projects.findIndex(
    (p) => (p.slug || p.id) === (project.slug || project.id),
  );
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container-custom">
        {/* Breadcrumb */}
        <AnimatedElement animation="fadeUp">
          <Link
            href="/calismalar"
            className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-primary transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("all")}
          </Link>
        </AnimatedElement>

        {/* Hero Image */}
        <AnimatedElement animation="fadeUp" className="mb-12">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-surface">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${project.gorselUrl || project.image}')`,
                backgroundColor: "#2a2a2a",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

            {/* Overlay Content */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary">
                {project.baslik || project.title}
              </h1>
            </div>
          </div>
        </AnimatedElement>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatedElement animation="fadeUp">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-6">
                {t("projectAbout")}
              </h2>
              <div className="mb-8">
                {Array.isArray(project.detayliAciklama) ? (
                  <PortableText
                    value={project.detayliAciklama}
                    components={portableTextComponents}
                  />
                ) : typeof project.detayliAciklama === "string" ? (
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                    {project.detayliAciklama}
                  </p>
                ) : (
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                    {project.detailDescription || project.aciklama}
                  </p>
                )}
              </div>

              {/* Services Used */}
              {(project.hizmetler || project.services || []).length > 0 && (
                <>
                  <h3 className="text-lg font-bold text-text-primary mb-4">
                    {t("servicesProvided")}
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {(project.hizmetler || project.services || []).map(
                      (service, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-full bg-surface border border-text-primary/10 text-text-secondary text-sm"
                        >
                          {typeof service === "string"
                            ? service
                            : service?.baslik || service?.title || ""}
                        </span>
                      ),
                    )}
                  </div>
                </>
              )}
            </AnimatedElement>
          </div>

          {/* Sidebar */}
          <div>
            <AnimatedElement animation="fadeUp" delay={0.15}>
              <div className="space-y-6 p-6 rounded-2xl bg-surface/50 border border-text-primary/5">
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-text-muted uppercase block mb-1">
                    {t("client")}
                  </span>
                  <span className="text-text-primary font-medium">
                    {project.musteri || project.client}
                  </span>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>

        {/* Results */}
        {(project.sonuclar || project.results || []).length > 0 && (
          <section className="mb-16 md:mb-20">
            <AnimatedElement animation="fadeUp" className="mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary">
                {t("results")}
              </h2>
            </AnimatedElement>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {(project.sonuclar || project.results || []).map(
                (result, index) => (
                  <StaggerItem key={index}>
                    <motion.div
                      className="p-6 md:p-8 rounded-2xl bg-surface/50 border border-text-primary/5 text-center hover:border-primary/20 transition-colors duration-300"
                      whileHover={{ y: -4 }}
                    >
                      <span className="text-3xl md:text-4xl font-display font-bold text-primary block mb-2">
                        {result.deger || result.value}
                      </span>
                      <span className="text-text-secondary text-sm">
                        {result.metrik || result.metric}
                      </span>
                    </motion.div>
                  </StaggerItem>
                ),
              )}
            </StaggerContainer>
          </section>
        )}

        {/* Gallery */}
        {(project.galeri || project.gallery || []).length > 1 && (
          <section className="mb-16 md:mb-20">
            <AnimatedElement animation="fadeUp" className="mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary">
                {t("gallery")}
              </h2>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(project.galeri || project.gallery || []).map((img, index) => (
                <motion.div
                  key={index}
                  className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-surface"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${typeof img === "string" ? img : img?.url || ""}')`,
                      backgroundColor: "#2a2a2a",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <AnimatedElement animation="fadeUp" className="mb-16">
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 bg-surface border border-text-primary/5 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-4">
                {t("thinkSimilarProject")}
              </h3>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                {t("thinkSimilarProjectDesc")}
              </p>
              <Button href="/iletisim" variant="primary" icon="arrow">
                {tServices("startProject")}
              </Button>
            </div>
          </div>
        </AnimatedElement>

        {/* Prev/Next Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/calismalar/${prevProject.slug || prevProject.id}`}
              className="group flex items-center gap-4 p-6 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors group-hover:-translate-x-1 duration-300" />
              <div>
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  {t("prevProject")}
                </span>
                <p className="text-text-primary font-medium group-hover:text-primary transition-colors duration-300">
                  {prevProject.baslik || prevProject.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              href={`/calismalar/${nextProject.slug || nextProject.id}`}
              className="group flex items-center justify-end gap-4 p-6 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300 text-right"
            >
              <div>
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  {t("nextProject")}
                </span>
                <p className="text-text-primary font-medium group-hover:text-primary transition-colors duration-300">
                  {nextProject.baslik || nextProject.title}
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
