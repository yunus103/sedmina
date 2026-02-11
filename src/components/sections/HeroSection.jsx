import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "../common";
import siteConfig from "../../data/siteConfig.json";
import heroBg from "../../assets/hero.png";
export default function HeroSection() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 10, 0.3), rgba(10, 10, 10, 0.8)), url(${heroBg})`,
          }}
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

      {/* Hero Text - Scroll & Scale Effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0"
        style={{ scale, opacity }}
      >
        <motion.h1
          className="text-[15vw] md:text-[20vw] font-display font-black text-white/[0.1] whitespace-nowrap select-none leading-none tracking-tighter"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {siteConfig.companyName.toUpperCase()}
        </motion.h1>
      </motion.div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center pt-20">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Tagline */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-white/80 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-primary font-semibold">Fikir</span> ve{" "}
            <span className="text-primary font-semibold">Etki</span> arasındaki
            görünmeyen bağı işleyen
            <br className="hidden md:block" />
            <span className="text-white">
              Stratejik Dijital Deneyim Stüdyosu.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button href="/iletisim" variant="primary" icon="arrow">
              PROJE BAŞLAT
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
