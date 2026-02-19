"use client";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

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
          sizes="100vw"
          className="object-cover"
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 animate-gradient" />

        {/* Light beam effect */}
        <motion.div
          className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center pt-20">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Tagline */}
          {slogan ? (
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {slogan}
            </motion.p>
          ) : (
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-primary font-semibold">Fikir</span> ve{" "}
              <span className="text-primary font-semibold">Etki</span>{" "}
              arasındaki görünmeyen bağı işleyen
              <br className="hidden md:block" />
              <span className="text-white">
                Stratejik Dijital Deneyim Stüdyosu.
              </span>
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              href={ctaLink || "/iletisim"}
              variant="primary"
              icon="arrow"
            >
              {ctaText || "PROJE BAŞLAT"}
            </Button>
          </motion.div>
        </motion.div>
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
