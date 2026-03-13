"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Link } from "../../../../i18n/routing";
import {
  SectionTitle,
  AnimatedElement,
  StaggerContainer,
  StaggerItem,
} from "../../../../components/common";
import { useTranslations } from "next-intl";

export default function ServicesClient({ services, pageData }) {
  const servicesList = services || [];
  const pData = pageData || {};
  const tServices = useTranslations("Services");

  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon || LucideIcons.Globe;
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container-custom">
        {/* Page Header */}
        <AnimatedElement animation="fadeUp" className="mb-12 md:mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
            {pData.ustBaslik || "Hizmetlerimiz"}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6 leading-tight whitespace-pre-wrap">
            {pData.baslik || "Markanızı öne çıkaran dijital çözümler."}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl leading-relaxed whitespace-pre-wrap">
            {pData.aciklama || "Stratejiden uygulamaya, tasarımdan geliştirmeye kadar kapsamlı hizmetlerimizle dijital dönüşüm yolculuğunuzda yanınızdayız."}
          </p>
        </AnimatedElement>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {servicesList.map((service, index) => {
            const Icon = getIcon(service.ikon || service.icon);

            return (
              <StaggerItem key={service._id || service.id || index}>
                <Link href={`/hizmetler/${service.slug || service.id}`}>
                  <motion.div
                    className="group relative bg-surface rounded-2xl border border-text-primary/5 overflow-hidden h-full cursor-pointer flex flex-col"
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  >
                    {/* Top Image Banner */}
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${service.gorselUrl || service.image}')`,
                          backgroundColor: "#2a2a2a",
                        }}
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                      {/* Index Number */}
                      <div className="absolute top-5 right-5">
                        <span className="text-text-primary/10 text-6xl font-display font-bold">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="absolute bottom-5 left-6 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center backdrop-blur-sm">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                      <p className="text-primary text-[10px] tracking-[0.2em] uppercase font-medium mb-2">
                        {service.altBaslik || service.subtitle}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300">
                        {service.baslik || service.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-6">
                        {service.aciklama || service.description}
                      </p>

                      {/* Features Preview */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(service.ozellikler || service.features || [])
                          .slice(0, 3)
                          .map((feature, i) => (
                            <span
                              key={i}
                              className="text-[11px] px-3 py-1 rounded-full bg-text-primary/5 text-text-muted border border-text-primary/5"
                            >
                              {feature}
                            </span>
                          ))}
                        {(service.ozellikler || service.features || []).length >
                          3 && (
                          <span className="text-[11px] px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                            +
                            {(service.ozellikler || service.features || [])
                              .length - 3}{" "}
                            daha
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="mt-auto pt-4 flex items-center gap-2 text-primary text-sm font-medium">
                        <span>{tServices("viewDetails")}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Bottom hover accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
