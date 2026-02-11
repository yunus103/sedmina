"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Building2, Send } from "lucide-react";
import { AnimatedElement } from "../common";
import siteConfig from "../../data/siteConfig.json";

const contactInfo = [
  {
    icon: Mail,
    label: "E-POSTA",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Phone,
    label: "TELEFON",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "ZİYARET EDİN",
    value: "İstanbul, Türkiye",
    href: null,
  },
  {
    icon: Building2,
    label: "RESMİ ADRES",
    value: "İstanbul, Türkiye",
    href: null,
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Will be connected to backend later
    console.log("Form submitted:", formData);
  };

  return (
    <section className="section-padding bg-background" id="contact">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column — Info */}
          <AnimatedElement animation="fadeUp">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-4 leading-tight">
              Haydi birlikte{" "}
              <span className="text-gradient">hayal edilemezi</span> inşa
              edelim.
            </h2>
            <p className="text-text-secondary mb-10 max-w-md leading-relaxed">
              Çığır açan bir fikriniz olsun ya da dijital varlığınızı modernize
              etmeniz gereksin, sınırların ötesine geçmenize yardımcı olmak için
              buradayız.
            </p>

            {/* Contact Items */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const Wrapper = item.href ? "a" : "div";
                const wrapperProps = item.href
                  ? {
                      href: item.href,
                      target: item.href.startsWith("mailto")
                        ? undefined
                        : "_blank",
                    }
                  : {};

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Wrapper
                      className="flex items-start gap-4 group"
                      {...wrapperProps}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="block text-[10px] tracking-[0.2em] text-text-muted uppercase mb-1">
                          {item.label}
                        </span>
                        <span className="text-text-primary text-sm font-medium group-hover:text-primary transition-colors duration-300">
                          {item.value}
                        </span>
                      </div>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedElement>

          {/* Right Column — Form */}
          <AnimatedElement animation="fadeUp" delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-text-muted uppercase mb-2">
                    AD SOYAD
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Adınız Soyadınız"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface border border-text-primary/10 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-text-muted uppercase mb-2">
                    E-POSTA
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="ornek@sirket.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface border border-text-primary/10 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-text-muted uppercase mb-2">
                    TELEFON
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="05XX XXX XX XX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-surface border border-text-primary/10 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-text-muted uppercase mb-2">
                    ŞİRKET
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Şirket Adı"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-surface border border-text-primary/10 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] text-text-muted uppercase mb-2">
                  PROJE DETAYLARI
                </label>
                <textarea
                  name="message"
                  placeholder="Projeniz hakkında bilgi verin..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-surface border border-text-primary/10 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-text-primary text-background font-semibold py-4 rounded-xl text-sm tracking-wide hover:bg-primary hover:text-background transition-colors duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-4 h-4" />
                Konuşmaya Başla
              </motion.button>
            </form>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
