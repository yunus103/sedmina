"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { PortableText } from "@portabletext/react";
import {
  AnimatedElement,
  StaggerContainer,
  StaggerItem,
  Button,
} from "../../../components/common";

import { urlFor } from "../../../sanity/image";

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const { hizalama, genislik, alt, caption } = value;

      const alignClasses = {
        left: "mr-auto md:ml-0 md:mr-8 mb-8",
        center: "mx-auto mb-8",
        right: "ml-auto md:mr-0 md:ml-8 mb-8",
      };

      const widthClasses = {
        small: "max-w-[250px]",
        medium: "max-w-md",
        large: "max-w-2xl",
        full: "w-full",
      };

      const containerClasses = `
        ${alignClasses[hizalama] || alignClasses.center}
        ${widthClasses[genislik] || widthClasses.full}
        ${hizalama === "left" || hizalama === "right" ? "md:float-" + hizalama + " w-full md:w-auto" : "flex flex-col items-center"}
        relative group clear-none
      `;

      return (
        <div className={containerClasses}>
          <div className="relative rounded-xl overflow-hidden bg-surface border border-text-primary/5">
            <img
              src={urlFor(value).url()}
              alt={alt || "Görsel"}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
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
      <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mt-12 mb-6 text-center clear-both">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mt-8 mb-4 text-center clear-both">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-text-secondary my-4 clear-both">
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

export default function AboutClient({ aboutData }) {
  if (!aboutData) return null;

  const stats = aboutData.istatistikler || [];
  const values = aboutData.degerler || [];
  const timeline = aboutData.zamanCizelgesi || [];

  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon || LucideIcons.Star;
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      {/* Hero */}
      <section className="container-custom mb-20 md:mb-28">
        {/* Centered H1 Title */}
        <AnimatedElement
          animation="fadeDown"
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary leading-tight max-w-5xl mx-auto">
            {aboutData.baslik || (
              <>
                Doğru Çözümler Her Zaman{" "}
                <span className="text-gradient">Doğru Araçlarla</span> Ulaşılır.
              </>
            )}
          </h1>
        </AnimatedElement>

        {/* Wrapped Content Section */}
        <div className="max-w-5xl mx-auto">
          {/* Image - Floated right on desktop, top on mobile */}
          <AnimatedElement
            animation="fadeLeft"
            className="w-full md:w-[45%] md:float-right md:ml-12 mb-10 md:mb-8"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-surface shadow-2xl border border-text-primary/5 group">
              {aboutData.gorselUrl ? (
                <Image
                  src={aboutData.gorselUrl}
                  alt="Hakkımızda"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-surface" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          </AnimatedElement>

          {/* Text Content */}
          <AnimatedElement
            animation="fadeUp"
            delay={0.2}
            className="relative z-10"
          >
            <div className="prose-custom">
              {Array.isArray(aboutData.icerik) ? (
                <PortableText
                  value={aboutData.icerik}
                  components={portableTextComponents}
                />
              ) : typeof aboutData.icerik === "string" ? (
                <p className="text-text-secondary text-lg md:text-xl/relaxed leading-relaxed text-justify [text-align-last:center] md:[text-align-last:left]">
                  {aboutData.icerik}
                </p>
              ) : (
                <p className="text-text-secondary text-lg md:text-xl/relaxed leading-relaxed text-justify [text-align-last:center] md:[text-align-last:left]">
                  SedMina, dijital dünyada markaları öne çıkaran stratejik bir
                  deneyim stüdyosudur. Yaratıcılığı teknolojiyle, stratejiyi
                  tasarımla harmanlayarak unutulmaz dijital deneyimler
                  yaratıyoruz. Yaklaşımımız, her projenin kendine özgü
                  hikayesini ve hedeflerini derinlemesine anlamaya dayanır.
                </p>
              )}
            </div>
          </AnimatedElement>

          {/* Centered CTA Button below the wrapped content */}
          <AnimatedElement
            animation="fadeUp"
            delay={0.3}
            className="flex justify-center mt-16 clear-both"
          >
            <Button
              href={aboutData.ctaLink || "/iletisim"}
              variant="primary"
              size="lg"
              icon="arrow"
            >
              {aboutData.ctaYazi || "Birlikte Çalışalım"}
            </Button>
          </AnimatedElement>
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="container-custom mb-20 md:mb-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat._key || index}
                className="text-center p-6 md:p-8 rounded-2xl bg-surface/50 border border-text-primary/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, borderColor: "rgba(0,212,255,0.2)" }}
              >
                <span className="text-4xl md:text-5xl font-display font-bold text-primary">
                  {stat.deger || stat.value}
                </span>
                <p className="text-text-secondary text-sm mt-2">
                  {stat.etiket || stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Values */}
      {values.length > 0 && (
        <section className="container-custom mb-20 md:mb-28">
          <AnimatedElement animation="fadeUp" className="mb-12">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
              {aboutData.degerlerAltBaslik || "DEĞERLERİMİZ"}
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
              {aboutData.degerlerBaslik || "Bizi biz yapan ilkeler."}
            </h2>
          </AnimatedElement>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = getIcon(value.ikon || value.icon);
              return (
                <StaggerItem key={value._key || index}>
                  <motion.div
                    className="p-6 md:p-8 rounded-2xl bg-surface/50 border border-text-primary/5 h-full hover:border-primary/20 transition-all duration-300"
                    whileHover={{ y: -6 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-3">
                      {value.baslik || value.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {value.aciklama || value.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>
      )}

      {/* Timeline */}
      {timeline.length > 0 && (
        <section className="container-custom mb-20 md:mb-28">
          <AnimatedElement animation="fadeUp" className="mb-12">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
              {aboutData.zamanCizelgesiAltBaslik || "YOLCULUĞUMUZ"}
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
              {aboutData.zamanCizelgesiBaslik || "Nasıl buraya geldik."}
            </h2>
          </AnimatedElement>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-text-primary/10 md:-translate-x-px" />

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={item._key || index}
                    className={`relative flex items-start gap-8 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-10" />

                    {/* Content */}
                    <div
                      className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16"}`}
                    >
                      <span className="text-primary text-sm font-bold">
                        {item.yil || item.year}
                      </span>
                      <h3 className="text-xl font-bold text-text-primary mt-1 mb-2">
                        {item.baslik || item.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {item.aciklama || item.description}
                      </p>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block md:w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-custom">
        <AnimatedElement animation="fadeUp">
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-16 bg-surface border border-text-primary/5 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                {aboutData.ctaBolumBaslik ||
                  "Projenizi birlikte hayata geçirelim."}
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                {aboutData.ctaBolumAciklama ||
                  "Dijital dönüşüm yolculuğunuzda size rehberlik edelim. İlk adımı birlikte atalım."}
              </p>
              <Button href="/iletisim" variant="primary" icon="arrow">
                İletişime Geçin
              </Button>
            </div>
          </div>
        </AnimatedElement>
      </section>
    </div>
  );
}
