"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "../common";
import heroBg from "../../assets/hero.png";
import Image from "next/image";

export default function HeroSection({
  companyName,
  slogan,
  ctaText,
  ctaLink,
  backgroundImage,
}) {
  const name = companyName || "SedMina";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage || heroBg}
          alt="Hero background"
          fill
          priority
          fetchPriority="high"
          quality={80}
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/40" />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-gradient transform-gpu will-change-transform" />

        {/* Light beam effect */}
        <motion.div
          className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{ willChange: "opacity, transform" }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          {slogan ? (
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 leading-relaxed drop-shadow-md hero-entrance">
              {slogan}
            </p>
          ) : (
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 leading-relaxed drop-shadow-md hero-entrance">
              <span className="text-primary font-semibold drop-shadow-lg">
                Fikir
              </span>{" "}
              ve{" "}
              <span className="text-primary font-semibold drop-shadow-lg">
                Etki
              </span>{" "}
              arasındaki görünmeyen bağı işleyen
              <br className="hidden md:block" />
              <span className="text-white drop-shadow-lg font-medium">
                Stratejik Dijital Deneyim Stüdyosu.
              </span>
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button
              href={ctaLink || "/iletisim"}
              variant="primary"
              icon="arrow"
            >
              {ctaText || "PROJE BAŞLAT"}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          animate={{
            borderColor: [
              "rgba(255,255,255,0.3)",
              "rgba(0,212,255,0.5)",
              "rgba(255,255,255,0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
