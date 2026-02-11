"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button, AnimatedElement } from "../common";

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/cta-bg.jpg')`,
              backgroundColor: "#111",
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-3xl border border-white/10" />

          {/* Content */}
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 lg:py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            {/* Text */}
            <div className="max-w-lg">
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Başlamaya <span className="text-gradient">hazır mısınız?</span>
              </motion.h2>

              <motion.p
                className="text-gray-300 text-base md:text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                Dijital olasılıkların sınırında bir yolculuğa bizimle çıkın.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Button href="/iletisim" variant="primary" icon="arrow">
                  Hadi Başlayalım
                </Button>
              </motion.div>
            </div>

            {/* Floating astronaut illustration */}
            <motion.div
              className="hidden lg:block"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/images/astronaut.png"
                alt="Astronaut"
                className="w-48 h-auto drop-shadow-[0_0_30px_rgba(0,212,255,0.3)]"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
