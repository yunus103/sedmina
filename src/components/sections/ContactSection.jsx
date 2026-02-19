"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Building2, Send } from "lucide-react";
import { AnimatedElement } from "../common";

export default function ContactSection({ title, subtitle, siteSettings }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ad Soyad zorunludur.";
    if (!formData.email.trim()) {
      newErrors.email = "E-posta adresi zorunludur.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz.";
    }
    if (!formData.message.trim()) newErrors.message = "Mesaj alanı zorunludur.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Backend connection will go here
      console.log("Form data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "E-POSTA",
      value: siteSettings?.email || "info@sedmina.com",
      href: `mailto:${siteSettings?.email || "info@sedmina.com"}`,
    },
    {
      icon: Phone,
      label: "TELEFON",
      value: siteSettings?.telefon || "",
      href: siteSettings?.telefon
        ? `tel:${siteSettings.telefon.replace(/\s/g, "")}`
        : null,
    },
    {
      icon: MapPin,
      label: "ZİYARET EDİN",
      value: siteSettings?.adres || "İstanbul, Türkiye",
      href: null,
    },
    {
      icon: Building2,
      label: "RESMİ ADRES",
      value: siteSettings?.adres || "İstanbul, Türkiye",
      href: null,
    },
  ];

  return (
    <section className="section-padding bg-background" id="contact">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column — Info */}
          <AnimatedElement animation="fadeUp">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-4 leading-tight">
              {title || (
                <>
                  Haydi birlikte{" "}
                  <span className="text-gradient">hayal edilemezi</span> inşa
                  edelim.
                </>
              )}
            </h2>
            <p className="text-text-secondary mb-10 max-w-md leading-relaxed">
              {subtitle ||
                "Çığır açan bir fikriniz olsun ya da dijital varlığınızı modernize etmeniz gereksin, sınırların ötesine geçmenize yardımcı olmak için buradayız."}
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
            {isSubmitted ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center p-8 md:p-12 rounded-2xl bg-surface border border-primary/20 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Send className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                  Mesajınız Alındı!
                </h3>
                <p className="text-text-secondary mb-8 leading-relaxed">
                  Bizimle iletişime geçtiğiniz için teşekkürler. En kısa sürede
                  size dönüş yapacağız.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary font-medium hover:underline text-sm"
                >
                  Yeni bir mesaj gönder
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] text-text-muted uppercase mb-2">
                      AD SOYAD *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Adınız Soyadınız"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-surface border ${errors.name ? "border-red-500/50" : "border-text-primary/10"} rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-[10px] mt-1 ml-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] text-text-muted uppercase mb-2">
                      E-POSTA *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="ornek@sirket.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-surface border ${errors.email ? "border-red-500/50" : "border-text-primary/10"} rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[10px] mt-1 ml-1">
                        {errors.email}
                      </p>
                    )}
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
                    PROJE DETAYLARI *
                  </label>
                  <textarea
                    name="message"
                    placeholder="Projeniz hakkında bilgi verin..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full bg-surface border ${errors.message ? "border-red-500/50" : "border-text-primary/10"} rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-[10px] mt-1 ml-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-text-primary text-background font-semibold py-4 rounded-xl text-sm tracking-wide hover:bg-primary hover:text-background transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-background/20 border-t-background rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "linear",
                        }}
                      />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Konuşmaya Başla
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
