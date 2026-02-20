"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Copy } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useRouter } from "next/navigation";
import { SectionTitle, AnimatedElement } from "../common";

export default function ServicesSection({ title, subtitle, services }) {
  const [activeService, setActiveService] = useState(0);
  const router = useRouter();

  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon || LucideIcons.Globe;
  };

  const servicesList = services || [];
  if (servicesList.length === 0) return null;

  const currentService = servicesList[activeService];

  const handleServiceClick = (index, serviceSlug) => {
    if (activeService === index) {
      router.push(`/hizmetler/${serviceSlug}`);
    } else {
      setActiveService(index);
    }
  };

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-background overflow-x-clip">
      <div className="container-custom">
        <SectionTitle title={title || "Hizmetlerimiz"} subtitle={subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Services List */}
          <div className="space-y-0">
            {servicesList.map((service, index) => {
              const isActive = activeService === index;
              const Icon = getIcon(service.ikon || service.icon);

              return (
                <motion.div
                  key={service._id || service.id || index}
                  className={`group cursor-pointer border-b border-text-primary/5 transition-all duration-300 ${
                    isActive ? "bg-surface/50" : "hover:bg-surface/30"
                  }`}
                  onMouseEnter={() => setActiveService(index)}
                  onClick={() =>
                    handleServiceClick(index, service.slug || service.id)
                  }
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="py-6 px-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3
                          className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                            isActive
                              ? "text-text-primary"
                              : "text-text-secondary group-hover:text-text-primary"
                          }`}
                        >
                          {service.baslik || service.title}
                        </h3>
                        <p
                          className={`text-xs tracking-[0.15em] uppercase mt-1 transition-colors duration-300 ${
                            isActive ? "text-primary" : "text-text-muted"
                          }`}
                        >
                          {service.altBaslik || service.subtitle}
                        </p>
                      </div>
                      <motion.div
                        className={`transition-all duration-300 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-50"
                        }`}
                        animate={{ x: isActive ? 0 : -10 }}
                      >
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-text-secondary text-sm leading-relaxed mt-4 pr-8">
                            {service.aciklama || service.description}
                          </p>

                          {/* Mobile Image */}
                          <div className="mt-4 rounded-xl overflow-hidden aspect-video w-full lg:hidden">
                            <img
                              src={service.gorselUrl || service.image}
                              alt={service.baslik || service.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Service Preview */}
          <AnimatedElement
            animation="fadeRight"
            className="relative hidden lg:block"
          >
            <div className="sticky top-32">
              <motion.div
                className="relative rounded-2xl overflow-hidden bg-surface aspect-[4/3] cursor-pointer"
                layout
                onClick={() =>
                  router.push(
                    `/hizmetler/${currentService.slug || currentService.id}`,
                  )
                }
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* Device Frame */}
                <div className="absolute top-4 left-4 right-4 flex items-center gap-2 z-10">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  </div>
                </div>

                {/* Preview Image */}
                <AnimatePresence mode="wait" className="">
                  <motion.div
                    key={currentService._id || currentService.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${currentService.gorselUrl || currentService.image}')`,
                        backgroundColor: "#2a2a2a",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Service Counter */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <motion.span
                      key={activeService}
                      className="text-5xl md:text-6xl font-display font-bold text-white/90"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      0{activeService + 1}
                    </motion.span>
                    <motion.p
                      key={currentService._id || currentService.id}
                      className="text-xs tracking-[0.2em] text-primary uppercase mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {currentService.altBaslik || currentService.subtitle}
                    </motion.p>
                  </div>
                  <motion.button
                    className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/hizmetler/${currentService.slug || currentService.id}`,
                      );
                    }}
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </motion.button>
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((activeService + 1) / servicesList.length) * 100}%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {servicesList.map((_, index) => (
                  <button
                    key={index}
                    onMouseEnter={() => setActiveService(index)}
                    onClick={() =>
                      handleServiceClick(
                        index,
                        servicesList[index].slug || servicesList[index].id,
                      )
                    }
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeService === index
                        ? "bg-primary w-6"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
