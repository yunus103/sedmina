import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  Clock,
  Layers,
} from "lucide-react";
import {
  AnimatedElement,
  StaggerContainer,
  StaggerItem,
  Button,
} from "../components/common";
import projectsData from "../data/projects.json";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const projects = projectsData.projects;
  const currentIndex = projects.findIndex((p) => p.id === id);
  const project = projects[currentIndex];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-text-primary mb-4">
            Proje Bulunamadı
          </h1>
          <p className="text-text-secondary mb-8">
            Aradığınız proje sayfası mevcut değil.
          </p>
          <Button href="/calismalar" variant="primary" icon="arrow">
            Tüm Projelere Dön
          </Button>
        </div>
      </div>
    );
  }

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container-custom">
        {/* Breadcrumb */}
        <AnimatedElement animation="fadeUp">
          <Link
            to="/calismalar"
            className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-primary transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Tüm Projeler
          </Link>
        </AnimatedElement>

        {/* Hero Image */}
        <AnimatedElement animation="fadeUp" className="mb-12">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-surface">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${project.image}')`,
                backgroundColor: "#2a2a2a",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

            {/* Overlay Content */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.categories.map((cat, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-surface/10 backdrop-blur-sm text-text-primary border border-text-primary/10"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary">
                {project.title}
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
                Proje Hakkında
              </h2>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8">
                {project.detailDescription}
              </p>

              {/* Services Used */}
              <h3 className="text-lg font-bold text-text-primary mb-4">
                Verilen Hizmetler
              </h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {project.services.map((service, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-surface border border-text-primary/10 text-text-secondary text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </AnimatedElement>
          </div>

          {/* Sidebar */}
          <div>
            <AnimatedElement animation="fadeUp" delay={0.15}>
              <div className="space-y-6 p-6 rounded-2xl bg-surface/50 border border-text-primary/5">
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-text-muted uppercase block mb-1">
                    MÜŞTERİ
                  </span>
                  <span className="text-text-primary font-medium">
                    {project.client}
                  </span>
                </div>
                <div className="w-full h-px bg-text-primary/5" />
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-text-muted uppercase block mb-1">
                    YIL
                  </span>
                  <span className="text-text-primary font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {project.year}
                  </span>
                </div>
                <div className="w-full h-px bg-text-primary/5" />
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-text-muted uppercase block mb-1">
                    SÜRE
                  </span>
                  <span className="text-text-primary font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    {project.duration}
                  </span>
                </div>
                <div className="w-full h-px bg-text-primary/5" />
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-text-muted uppercase block mb-1">
                    KATEGORİLER
                  </span>
                  <span className="text-text-primary font-medium flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    {project.categories.join(", ")}
                  </span>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <section className="mb-16 md:mb-20">
            <AnimatedElement animation="fadeUp" className="mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary">
                Sonuçlar
              </h2>
            </AnimatedElement>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.results.map((result, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="p-6 md:p-8 rounded-2xl bg-surface/50 border border-text-primary/5 text-center hover:border-primary/20 transition-colors duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <span className="text-3xl md:text-4xl font-display font-bold text-primary block mb-2">
                      {result.value}
                    </span>
                    <span className="text-text-secondary text-sm">
                      {result.metric}
                    </span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 1 && (
          <section className="mb-16 md:mb-20">
            <AnimatedElement animation="fadeUp" className="mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary">
                Galeri
              </h2>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img, index) => (
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
                      backgroundImage: `url('${img}')`,
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
                Benzer bir proje mi düşünüyorsunuz?
              </h3>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                Markanız için neler yapabileceğimizi birlikte keşfedelim.
              </p>
              <Button href="/iletisim" variant="primary" icon="arrow">
                Proje Başlat
              </Button>
            </div>
          </div>
        </AnimatedElement>

        {/* Prev/Next Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              to={`/calismalar/${prevProject.id}`}
              className="group flex items-center gap-4 p-6 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors group-hover:-translate-x-1 duration-300" />
              <div>
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  Önceki Proje
                </span>
                <p className="text-white font-medium group-hover:text-primary transition-colors duration-300">
                  {prevProject.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              to={`/calismalar/${nextProject.id}`}
              className="group flex items-center justify-end gap-4 p-6 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300 text-right"
            >
              <div>
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  Sonraki Proje
                </span>
                <p className="text-white font-medium group-hover:text-primary transition-colors duration-300">
                  {nextProject.title}
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
