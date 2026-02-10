import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Instagram, Twitter, ArrowUpRight } from "lucide-react";
import siteConfig from "../../data/siteConfig.json";
import navigation from "../../data/navigation.json";

const socialIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-white/5">
      <div className="container-custom section-padding lg:py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-background font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-display font-bold text-white">
                {siteConfig.companyName}
              </span>
            </Link>
            <p className="text-text-secondary max-w-md mb-6">
              {siteConfig.tagline}
            </p>
            <div className="flex gap-4">
              {Object.entries(siteConfig.social).map(([platform, url]) => {
                const Icon = socialIcons[platform];
                if (!Icon) return null;
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Sayfalar</h4>
            <ul className="space-y-3">
              {navigation.mainNav.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="text-text-secondary hover:text-primary transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">İletişim</h4>
            <ul className="space-y-3 text-text-secondary">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-primary transition-colors duration-300"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="hover:text-primary transition-colors duration-300"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>{siteConfig.contact.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {currentYear} {siteConfig.companyName}. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6">
            <a
              href="/gizlilik"
              className="text-text-muted text-sm hover:text-primary transition-colors duration-300"
            >
              Gizlilik Politikası
            </a>
            <a
              href="/kullanim-sartlari"
              className="text-text-muted text-sm hover:text-primary transition-colors duration-300"
            >
              Kullanım Şartları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
