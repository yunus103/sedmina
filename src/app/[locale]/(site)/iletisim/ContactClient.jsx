"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  ArrowRight,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { AnimatedElement, Button } from "../../../../components/common";
import Map from "./Map";
import { useTranslations } from "next-intl";

const serviceOptions = [
  "Web Geliştirme",
  "Mobil Uygulama",
  "Marka Kimliği",
  "Dijital Pazarlama",
  "UX / UI Tasarımı",
  "SEO & Analitik",
  "Diğer",
];

import { sendEmail } from "../../../../lib/actions/sendEmail";
import toast from "react-hot-toast";

export default function ContactClient({ contactData, siteSettings }) {
  const t = useTranslations("ContactForm");
  const tc = useTranslations("Contact");
  const tp = useTranslations("Process");

  const serviceOptions = [
    t("budgetOptions.option1"), // actually these are service options, let's just use keys or just translate here
    "Web Geliştirme",
    "Mobil Uygulama",
    "Marka Kimliği",
    "Dijital Pazarlama",
    "UX / UI Tasarımı",
    "SEO & Analitik",
    "Diğer",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = t("nameReq");
    if (!formData.email.trim()) {
      newErrors.email = t("emailReq");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("emailInv");
    }
    if (!formData.message.trim()) newErrors.message = t("msgReq");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const result = await sendEmail(formData);

      if (result.success) {
        setIsSubmitted(true);
        toast.success(t("successTitle"));
      } else {
        toast.error(result.error || "Error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: tc("email"),
      value: siteSettings?.email || "info@sedmina.com",
      href: `mailto:${siteSettings?.email || "info@sedmina.com"}`,
      description: tc("emailDesc"),
    },
    {
      icon: Phone,
      label: tc("phone"),
      value: siteSettings?.telefon || "",
      href: siteSettings?.telefon
        ? `tel:${siteSettings.telefon.replace(/\s/g, "")}`
        : null,
      description: tc("phoneDesc"),
    },
    {
      icon: MapPin,
      label: tc("address"),
      value: siteSettings?.adres || tc("officeLocation"),
      href: null,
      description: tc("addressDesc"),
    },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: siteSettings?.linkedin },
    { icon: Instagram, label: "Instagram", href: siteSettings?.instagram },
    { icon: Twitter, label: "Twitter", href: siteSettings?.twitter },
    { icon: FaTiktok, label: "TikTok", href: siteSettings?.tiktok },
  ].filter((s) => s.href);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="container-custom">
        {/* Header */}
        <AnimatedElement animation="fadeUp" className="mb-16 md:mb-20">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
            {contactData?.ustBaslik || "İLETİŞİM"}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6 leading-tight">
            {contactData?.baslik || (
              <>
                Projenizi birlikte
                <br />
                <span className="text-gradient">hayata geçirelim.</span>
              </>
            )}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
            {contactData?.aciklama ||
              "Dijital dönüşüm yolculuğunuzda ilk adımı atın. Size en uygun çözümü birlikte belirleyelim."}
          </p>
        </AnimatedElement>

        {/* Form + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatedElement animation="fadeUp">
              <div className="p-6 md:p-10 rounded-2xl bg-surface border border-text-primary/5">
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Send className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                      {t("successTitle")}
                    </h3>
                    <p className="text-text-secondary max-w-md mx-auto mb-6">
                      {t("successDesc")}
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          service: "",
                          budget: "",
                          message: "",
                        });
                      }}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      {t("sendNewMessage")}
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-display font-bold text-text-primary mb-2">
                      {contactData?.formBaslik || "Proje Detayları"}
                    </h2>
                    <p className="text-text-secondary text-sm mb-8">
                      {contactData?.formAciklama ||
                        "Projeniz hakkında bilgi verin, size en uygun çözümü sunalım."}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Row 1 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            className="block text-text-secondary text-sm mb-2"
                            htmlFor="name"
                          >
                            {t("name")}
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.name ? "border-red-500/50" : "border-text-primary/10"} text-text-primary text-sm placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors duration-300`}
                            placeholder={t("namePlaceholder")}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-[10px] mt-1 ml-1">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            className="block text-text-secondary text-sm mb-2"
                            htmlFor="email"
                          >
                            {t("email")}
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.email ? "border-red-500/50" : "border-text-primary/10"} text-text-primary text-sm placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors duration-300`}
                            placeholder={t("emailPlaceholder")}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-[10px] mt-1 ml-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            className="block text-text-secondary text-sm mb-2"
                            htmlFor="company"
                          >
                            {t("company")}
                          </label>
                          <input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-text-primary/10 text-text-primary text-sm placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors duration-300"
                            placeholder={t("companyPlaceholder")}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-text-secondary text-sm mb-2"
                            htmlFor="service"
                          >
                            {t("service")}
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-text-primary/10 text-text-primary text-sm focus:border-primary focus:outline-none transition-colors duration-300 appearance-none"
                          >
                            <option value="" className="bg-background">
                              {t("select")}
                            </option>
                            {serviceOptions.map((s) => (
                              <option
                                key={s}
                                value={s}
                                className="bg-background"
                              >
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <label
                          className="block text-text-secondary text-sm mb-2"
                          htmlFor="budget"
                        >
                          {t("budget")}
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-text-primary/10 text-text-primary text-sm focus:border-primary focus:outline-none transition-colors duration-300 appearance-none"
                        >
                          <option value="" className="bg-background">
                            {t("select")}
                          </option>
                          <option value="10k-25k" className="bg-background">
                            {t("budgetOptions.option1")}
                          </option>
                          <option value="25k-50k" className="bg-background">
                            {t("budgetOptions.option2")}
                          </option>
                          <option value="50k-100k" className="bg-background">
                            {t("budgetOptions.option3")}
                          </option>
                          <option value="100k+" className="bg-background">
                            {t("budgetOptions.option4")}
                          </option>
                          <option value="belirsiz" className="bg-background">
                            {t("budgetOptions.option5")}
                          </option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          className="block text-text-secondary text-sm mb-2"
                          htmlFor="message"
                        >
                          {t("message")}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.message ? "border-red-500/50" : "border-text-primary/10"} text-text-primary text-sm placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors duration-300 resize-none`}
                          placeholder={t("messagePlaceholder")}
                        />
                        {errors.message && (
                          <p className="text-red-500 text-[10px] mt-1 ml-1">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-primary text-black font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                ease: "linear",
                              }}
                            />
                            {t("submitting")}
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            {t("submit")}
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </AnimatedElement>
          </div>

          {/* Sidebar */}
          <div>
            <AnimatedElement animation="fadeUp" delay={0.15}>
              <div className="space-y-8">
                {/* Response Time */}
                <div className="p-6 rounded-2xl bg-surface/50 border border-text-primary/5">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-text-primary">
                      {contactData?.yanitSuresiBaslik || "Yanıt Süresi"}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {contactData?.yanitSuresiAciklama || (
                      <>
                        İş günlerinde genellikle{" "}
                        <strong className="text-text-primary">24 saat</strong>{" "}
                        içinde yanıt veriyoruz. Acil projeler için telefon ile
                        ulaşabilirsiniz.
                      </>
                    )}
                  </p>
                </div>

                {/* Process */}
                <div className="p-6 rounded-2xl bg-surface/50 border border-text-primary/5">
                  <h3 className="text-lg font-bold text-text-primary mb-4">
                    {tp("title")}
                  </h3>
                  <div className="space-y-4">
                    {[
                      { step: "01", label: tp("step1") },
                      {
                        step: "02",
                        label: tp("step2"),
                      },
                      { step: "03", label: tp("step3") },
                      { step: "04", label: tp("step4") },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-primary font-display font-bold text-sm mt-0.5">
                          {item.step}
                        </span>
                        <span className="text-text-secondary text-sm">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social */}
                {socialLinks.length > 0 && (
                  <div className="p-6 rounded-2xl bg-surface/50 border border-text-primary/5">
                    <h3 className="text-lg font-bold text-text-primary mb-4">
                      {tc("followUs")}
                    </h3>
                    <div className="flex gap-3">
                      {socialLinks.map((social, i) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-text-primary/5 border border-text-primary/10 flex items-center justify-center hover:bg-primary/10 hover:border-primary/20 hover:text-primary text-text-muted transition-all duration-300"
                            aria-label={social.label}
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </AnimatedElement>
          </div>
        </div>

        {/* Contact Methods */}
        <AnimatedElement animation="fadeUp" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const Wrapper = method.href ? "a" : "div";
              const wrapperProps = method.href
                ? {
                    href: method.href,
                    target: method.href.startsWith("http")
                      ? "_blank"
                      : undefined,
                  }
                : {};

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Wrapper
                    {...wrapperProps}
                    className="group flex flex-col p-6 md:p-8 rounded-2xl bg-surface/50 border border-text-primary/5 hover:border-primary/20 transition-all duration-300 h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-text-muted text-xs uppercase tracking-wider mb-1">
                      {method.label}
                    </span>
                    <span className="text-text-primary font-semibold text-lg mb-1 group-hover:text-primary transition-colors duration-300">
                      {method.value}
                    </span>
                    <span className="text-text-muted text-sm">
                      {method.description}
                    </span>
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>
        </AnimatedElement>

        {/* Map Section */}
        {siteSettings?.haritaUrl && (
          <div className="mt-16">
            <Map url={siteSettings.haritaUrl} />
          </div>
        )}
      </div>
    </div>
  );
}
