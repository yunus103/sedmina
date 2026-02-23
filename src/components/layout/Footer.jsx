"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import logoLight from "../../assets/sedminalogo.png";
import logoDark from "../../assets/brightlogo.png";

const socialIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  tiktok: FaTiktok,
};

export default function Footer({ siteSettings }) {
  const companyName = siteSettings?.sirketAdi || "SedMina";
  const slogan = siteSettings?.slogan || "";
  const navItems = siteSettings?.navigasyon || [];

  // Build social links from siteSettings
  const socialLinks = [];
  if (siteSettings?.linkedin)
    socialLinks.push({ platform: "linkedin", url: siteSettings.linkedin });
  if (siteSettings?.instagram)
    socialLinks.push({ platform: "instagram", url: siteSettings.instagram });
  if (siteSettings?.twitter)
    socialLinks.push({ platform: "twitter", url: siteSettings.twitter });
  if (siteSettings?.facebook)
    socialLinks.push({ platform: "facebook", url: siteSettings.facebook });
  if (siteSettings?.tiktok)
    socialLinks.push({ platform: "tiktok", url: siteSettings.tiktok });

  return (
    <footer className="border-t border-text-primary/5 bg-surface/30">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src={logoDark}
                alt={companyName}
                width={140}
                height={40}
                className="hidden dark:block h-auto w-auto"
                style={{ width: "auto", height: "auto" }}
              />
              <Image
                src={logoLight}
                alt={companyName}
                width={140}
                height={40}
                className="dark:hidden h-auto w-auto"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            {slogan && (
              <p className="text-text-muted text-sm leading-relaxed max-w-xs">
                {slogan}
              </p>
            )}
          </div>

          {/* Navigation */}
          {navItems.length > 0 && (
            <div>
              <h4 className="text-text-primary font-semibold text-sm mb-6 uppercase tracking-wider">
                Hızlı Erişim
              </h4>
              <ul className="space-y-3">
                {navItems.map((item, index) => (
                  <li key={item._key || index}>
                    <Link
                      href={item.href}
                      className="text-text-muted text-sm hover:text-primary transition-colors duration-300"
                    >
                      {item.etiket}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-6 uppercase tracking-wider">
              İletişim
            </h4>
            <ul className="space-y-4">
              {siteSettings?.email && (
                <li>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="flex items-center gap-3 text-text-muted text-sm hover:text-primary transition-colors duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-text-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    {siteSettings.email}
                  </a>
                </li>
              )}
              {siteSettings?.telefon && (
                <li>
                  <a
                    href={`tel:${siteSettings.telefon.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-text-muted text-sm hover:text-primary transition-colors duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-text-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    {siteSettings.telefon}
                  </a>
                </li>
              )}
              {siteSettings?.adres && (
                <li className="flex items-start gap-3 text-text-muted text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-text-primary/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed pt-1">
                    {siteSettings.adres}
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-6 uppercase tracking-wider">
              Bizi Takip Edin
            </h4>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              En son güncellemeler ve projelerimizden haberdar olmak için sosyal
              medyada bizi takip edin.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ platform, url }) => {
                  const Icon = socialIcons[platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-text-primary/5 border border-text-primary/10 flex items-center justify-center text-text-muted hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                      aria-label={platform}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-text-primary/5">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} {companyName}. Tüm hakları saklıdır.
          </p>
          <p className="text-text-muted text-xs">
            SedMina Dijital tarafından tasarlandı.
          </p>
        </div>
      </div>
    </footer>
  );
}
