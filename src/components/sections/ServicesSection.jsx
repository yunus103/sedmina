import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Copy } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SectionTitle, AnimatedElement } from "../common";
import servicesData from "../../data/services";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const navigate = useNavigate();

  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon || LucideIcons.Globe;
  };

  const currentService = servicesData.services[activeService];

  const handleServiceClick = (serviceId) => {
    navigate(`/hizmetler/${serviceId}`);
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <SectionTitle
          title={servicesData.sectionTitle}
          subtitle={servicesData.sectionSubtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Services List */}
          <div className="space-y-0">
            {servicesData.services.map((service, index) => {
              const isActive = activeService === index;
              const Icon = getIcon(service.icon);

              return (
                <motion.div
                  key={service.id}
                  className={`group cursor-pointer border-b border-white/5 transition-all duration-300 ${
                    isActive ? "bg-surface/50" : "hover:bg-surface/30"
                  }`}
                  onMouseEnter={() => setActiveService(index)}
                  onClick={() => handleServiceClick(service.id)}
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
                              ? "text-white"
                              : "text-text-secondary group-hover:text-white"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p
                          className={`text-xs tracking-[0.15em] uppercase mt-1 transition-colors duration-300 ${
                            isActive ? "text-primary" : "text-text-muted"
                          }`}
                        >
                          {service.subtitle}
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
                        <motion.p
                          className="text-text-secondary text-sm leading-relaxed mt-4 pr-8"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {service.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Service Preview */}
          <AnimatedElement animation="fadeRight" className="relative">
            <div className="sticky top-32">
              <motion.div
                className="relative rounded-2xl overflow-hidden bg-surface aspect-[4/3] cursor-pointer"
                layout
                onClick={() => handleServiceClick(currentService.id)}
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
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentService.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${currentService.image}')`,
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
                      key={currentService.id}
                      className="text-xs tracking-[0.2em] text-primary uppercase mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {currentService.subtitle}
                    </motion.p>
                  </div>
                  <motion.button
                    className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(currentService.id);
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
                      width: `${((activeService + 1) / servicesData.services.length) * 100}%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {servicesData.services.map((_, index) => (
                  <button
                    key={index}
                    onMouseEnter={() => setActiveService(index)}
                    onClick={() =>
                      handleServiceClick(servicesData.services[index].id)
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
