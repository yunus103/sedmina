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
import { AnimatedElement, Button } from "../../../components/common";
import Map from "./Map";

const serviceOptions = [
  "Web Geliştirme",
  "Mobil Uygulama",
  "Marka Kimliği",
  "Dijital Pazarlama",
  "UX / UI Tasarımı",
  "SEO & Analitik",
  "Diğer",
];

export default function ContactClient({ contactData, siteSettings }) {
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
    if (!formData.name.trim()) newErrors.name = "İsim Soyisim zorunludur.";
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
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "E-posta",
      value: siteSettings?.email || "info@sedmina.com",
      href: `mailto:${siteSettings?.email || "info@sedmina.com"}`,
      description: "İş birliği için bize yazın",
    },
    {
      icon: Phone,
      label: "Telefon",
      value: siteSettings?.telefon || "",
      href: siteSettings?.telefon
        ? `tel:${siteSettings.telefon.replace(/\s/g, "")}`
        : null,
      description: "Hafta içi 09:00 – 18:00",
    },
    {
      icon: MapPin,
      label: "Adres",
      value: siteSettings?.adres || "İstanbul, Türkiye",
      href: null,
      description: "Ofisimize gelin",
    },
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: siteSettings?.linkedin },
    { icon: Instagram, label: "Instagram", href: siteSettings?.instagram },
    { icon: Twitter, label: "Twitter", href: siteSettings?.twitter },
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

        {/* Contact Methods */}
        <AnimatedElement
          animation="fadeUp"
          delay={0.1}
          className="mb-16 md:mb-20"
        >
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

        {/* Form + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
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
                      Mesajınız Gönderildi!
                    </h3>
                    <p className="text-text-secondary max-w-md mx-auto mb-6">
                      En kısa sürede size dönüş yapacağız. Genellikle 24 saat
                      içinde yanıt veriyoruz.
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
                      Yeni mesaj gönder
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
                            İsim Soyisim *
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.name ? "border-red-500/50" : "border-text-primary/10"} text-text-primary text-sm placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors duration-300`}
                            placeholder="Adınız"
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
                            E-posta *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.email ? "border-red-500/50" : "border-text-primary/10"} text-text-primary text-sm placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors duration-300`}
                            placeholder="mail@ornek.com"
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
                            Şirket
                          </label>
                          <input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-text-primary/10 text-text-primary text-sm placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors duration-300"
                            placeholder="Şirket adınız"
                          />
                        </div>
                        <div>
                          <label
                            className="block text-text-secondary text-sm mb-2"
                            htmlFor="service"
                          >
                            İlgilendiğiniz Hizmet
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-text-primary/10 text-text-primary text-sm focus:border-primary focus:outline-none transition-colors duration-300 appearance-none"
                          >
                            <option value="" className="bg-background">
                              Seçiniz
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
                          Tahmini Bütçe
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-text-primary/10 text-text-primary text-sm focus:border-primary focus:outline-none transition-colors duration-300 appearance-none"
                        >
                          <option value="" className="bg-background">
                            Seçiniz
                          </option>
                          <option value="10k-25k" className="bg-background">
                            ₺10.000 – ₺25.000
                          </option>
                          <option value="25k-50k" className="bg-background">
                            ₺25.000 – ₺50.000
                          </option>
                          <option value="50k-100k" className="bg-background">
                            ₺50.000 – ₺100.000
                          </option>
                          <option value="100k+" className="bg-background">
                            ₺100.000+
                          </option>
                          <option value="belirsiz" className="bg-background">
                            Henüz belirlemedim
                          </option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          className="block text-text-secondary text-sm mb-2"
                          htmlFor="message"
                        >
                          Mesajınız *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.message ? "border-red-500/50" : "border-text-primary/10"} text-text-primary text-sm placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors duration-300 resize-none`}
                          placeholder="Projeniz hakkında kısaca bilgi verin..."
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
                            Gönderiliyor...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Mesajı Gönder
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
                    Süreç Nasıl İşler?
                  </h3>
                  <div className="space-y-4">
                    {[
                      { step: "01", label: "Formu doldurun veya bizi arayın" },
                      {
                        step: "02",
                        label: "Ücretsiz keşif toplantısı yapalım",
                      },
                      { step: "03", label: "Özel teklif ve zaman planı alın" },
                      { step: "04", label: "Projeye başlayalım!" },
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
                      Bizi Takip Edin
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
