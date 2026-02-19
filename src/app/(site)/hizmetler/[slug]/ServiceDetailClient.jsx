"use client";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import {
  AnimatedElement,
  StaggerContainer,
  StaggerItem,
  Button,
} from "../../../../components/common";

import { urlFor } from "../../../../sanity/image";

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      const { hizalama, genislik, alt, caption } = value;

      // Default values
      const align = hizalama || "center";
      const width = genislik || "full";

      // Width classes mapping (Desktop only)
      const widthClasses = {
        small: "md:w-1/4", // 25%
        medium: "md:w-1/2", // 50%
        large: "md:w-3/4", // 75%
        full: "w-full", // 100%
      };

      // Alignment & Layout Logic
      let containerClasses = "relative mb-8 rounded-xl overflow-hidden ";

      if (width === "full") {
        containerClasses += "w-full my-8";
      } else {
        containerClasses += "w-full " + widthClasses[width];

        if (align === "left") {
          containerClasses += " md:float-left md:mr-8 md:mb-6";
        } else if (align === "right") {
          containerClasses += " md:float-right md:ml-8 md:mb-6";
        } else {
          containerClasses += " mx-auto md:my-8";
        }
      }

      return (
        <div className={containerClasses}>
          <div className="relative w-full border border-text-primary/5 rounded-xl overflow-hidden bg-surface">
            <img
              src={urlFor(value).url()}
              alt={alt || "Görsel"}
              className="w-full h-auto object-cover"
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
      <p className="text-text-secondary text-lg md:text-xl/relaxed mb-6 last:mb-0 text-justify [text-align-last:center] md:[text-align-last:left]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mt-12 mb-6 text-center">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mt-8 mb-4 text-center">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-text-secondary my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-text-primary font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
  },
};

export default function ServiceDetailClient({
  service,
  allServices,
  parentService,
}) {
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-text-primary mb-4">
            Hizmet Bulunamadı
          </h1>
          <p className="text-text-secondary mb-8">
            Aradığınız hizmet sayfası mevcut değil.
          </p>
          <Button href="/hizmetler" variant="primary" icon="arrow">
            Tüm Hizmetlere Dön
          </Button>
        </div>
      </div>
    );
  }

  const services = allServices || [];
  const currentIndex = services.findIndex(
    (s) => (s.slug || s.id) === (service.slug || service.id),
  );
  const Icon = LucideIcons[service.ikon || service.icon] || LucideIcons.Globe;
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService =
    currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container-custom">
        {/* Breadcrumb */}
        <AnimatedElement animation="fadeUp">
          <div className="flex items-center flex-wrap gap-2 text-text-muted text-sm mb-8">
            <Link
              href="/hizmetler"
              className="hover:text-primary transition-colors duration-300 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Tüm Hizmetler
            </Link>
            {parentService && (
              <>
                <span className="text-text-primary/20">/</span>
                <Link
                  href={`/hizmetler/${parentService.slug}`}
                  className="hover:text-primary transition-colors duration-300"
                >
                  {parentService.baslik}
                </Link>
              </>
            )}
          </div>
        </AnimatedElement>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 md:mb-28">
          {/* Left — Text */}
          <AnimatedElement animation="fadeUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-primary text-xs tracking-[0.2em] uppercase font-medium">
                {service.altBaslik || service.subtitle}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6 leading-tight">
              {service.baslik || service.title}
            </h1>

            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              {service.aciklama || service.shortDescription}
            </p>

            <Button href="/iletisim" variant="primary" icon="arrow">
              Proje Başlat
            </Button>
          </AnimatedElement>

          {/* Right — Image */}
          <AnimatedElement animation="fadeLeft">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${service.gorselUrl || service.image}')`,
                  backgroundColor: "#2a2a2a",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {/* Counter Overlay */}
              <div className="absolute bottom-6 left-6">
                <span className="text-6xl font-display font-bold text-text-primary/20">
                  0{currentIndex >= 0 ? currentIndex + 1 : 1}
                </span>
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* Sub Services (Neler Sunuyoruz - Links) */}
        {service.altHizmetler && service.altHizmetler.length > 0 && (
          <div className="mb-16">
            <AnimatedElement animation="fadeUp">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-8 text-center md:text-left">
                Neler Sunuyoruz
              </h2>
            </AnimatedElement>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.altHizmetler.map((subService) => (
                <StaggerItem key={subService._id}>
                  <Link
                    href={`/hizmetler/${service.slug}/${subService.slug}`}
                    className="group"
                  >
                    <motion.div
                      className="flex items-center gap-3 p-4 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 hover:bg-surface/80 transition-all duration-300"
                      whileHover={{ x: 4 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <span className="text-text-primary text-lg font-medium group-hover:text-primary transition-colors">
                          {subService.baslik}
                        </span>
                        {subService.altBaslik && (
                          <p className="text-text-secondary text-xs mt-0.5 group-hover:text-text-primary/80 transition-colors">
                            {subService.altBaslik}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-muted ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </motion.div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {/* Detailed Content */}
        <AnimatedElement animation="fadeUp" delay={0.2} className="mb-20">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {Array.isArray(service.detayliAciklama) ? (
              <PortableText
                value={service.detayliAciklama}
                components={portableTextComponents}
              />
            ) : typeof service.detayliAciklama === "string" ? (
              <p className="text-text-secondary text-lg leading-relaxed text-justify [text-align-last:center] md:[text-align-last:left]">
                {service.detayliAciklama}
              </p>
            ) : null}
          </div>
        </AnimatedElement>

        {/* CTA Banner */}
        <AnimatedElement animation="fadeUp">
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 bg-surface border border-text-primary/5 mb-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-4">
                Bu hizmete ihtiyacınız mı var?
              </h3>
              <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                Projenizi birlikte değerlendirelim ve size en uygun çözümü
                bulalım.
              </p>
              <Button href="/iletisim" variant="primary" icon="arrow">
                İletişime Geçin
              </Button>
            </div>
          </div>
        </AnimatedElement>

        {/* Prev/Next Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevService ? (
            <Link
              href={`/hizmetler/${prevService.slug || prevService.id}`}
              className="group flex items-center gap-4 p-6 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors group-hover:-translate-x-1 duration-300" />
              <div>
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  Önceki
                </span>
                <p className="text-text-primary font-medium group-hover:text-primary transition-colors duration-300">
                  {prevService.baslik || prevService.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextService && (
            <Link
              href={`/hizmetler/${nextService.slug || nextService.id}`}
              className="group flex items-center justify-end gap-4 p-6 rounded-xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300 text-right"
            >
              <div>
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  Sonraki
                </span>
                <p className="text-text-primary font-medium group-hover:text-primary transition-colors duration-300">
                  {nextService.baslik || nextService.title}
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
