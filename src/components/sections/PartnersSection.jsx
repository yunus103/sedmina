import { motion } from "framer-motion";
import { AnimatedElement } from "../common";
import partnersData from "../../data/partners.json";

export default function PartnersSection() {
  return (
    <section className="py-16 md:py-24 bg-background border-y border-white/5">
      <div className="container-custom">
        {/* Title */}
        <AnimatedElement animation="fadeUp" className="text-center mb-12">
          <p className="text-xs md:text-sm tracking-[0.3em] text-text-muted uppercase">
            {partnersData.sectionTitle}
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
                {[...partnersData.partners, ...partnersData.partners].map(
                  (partner, index) => (
                    <div
                      key={`${partner.id}-${index}`}
                      className="relative group flex-shrink-0"
                    >
                      <div className="relative transition-transform duration-300 hover:scale-105">
                        {/* If logo SVG exists, use it; otherwise show text */}
                        {partner.logo ? (
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="h-10 md:h-12 w-auto opacity-40 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                          />
                        ) : (
                          <span className="text-xl md:text-2xl font-display font-semibold text-text-muted transition-colors duration-300 group-hover:text-white">
                            {partner.name}
                          </span>
                        )}

                        {/* Hover glow effect */}
                        <div
                          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
                            filter: "blur(20px)",
                            transform: "scale(1.5)",
                          }}
                        />
                      </div>
                    </div>
                  ),
                )}
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
