"use client";
import { motion } from "framer-motion";
import { AnimatedElement } from "../common";

export default function PartnersSection({ title, references }) {
  const partners = references || [];
  if (partners.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-background border-y border-text-primary/5">
      <div className="container-custom">
        {/* Title */}
        <AnimatedElement animation="fadeUp" className="text-center mb-12">
          <p className="text-xs md:text-sm tracking-[0.3em] text-text-muted uppercase">
            {title || "Güvenilir İş Ortaklarımız"}
          </p>
        </AnimatedElement>

        {/* Partners Slider */}
        <AnimatedElement animation="fadeIn" delay={0.2}>
          <div
            className="relative w-full overflow-hidden mask-linear-fade"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="flex w-fit">
              <motion.div
                className="flex gap-16 md:gap-24 items-center pr-16 md:pr-24"
                animate={{ x: "-50%" }}
                transition={{
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity,
                }}
                style={{ willChange: "transform" }}
              >
                {[...partners, ...partners].map((partner, index) => (
                  <div
                    key={`${partner._id || partner.id}-${index}`}
                    className="relative group flex-shrink-0"
                  >
                    <div className="relative group transition-transform duration-500">
                      {partner.logoUrl || partner.logo ? (
                        <img
                          src={partner.logoUrl || partner.logo}
                          alt={partner.isim || partner.name}
                          className="h-10 md:h-12 w-auto object-contain transition-all duration-500 dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.6)]"
                        />
                      ) : (
                        <span className="text-xl md:text-2xl font-display font-semibold text-text-muted transition-colors duration-500 group-hover:text-primary">
                          {partner.isim || partner.name}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedElement>
        {/* Animated line decoration */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 md:w-24 h-px bg-gradient-to-r from-transparent to-primary/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            <div className="w-2 h-2 rounded-full bg-primary/50" />
            <motion.div
              className="w-12 md:w-24 h-px bg-gradient-to-l from-transparent to-primary/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
