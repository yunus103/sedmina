"use client";
import { useState, useEffect } from "react";

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
import { FaTiktok, FaYoutube } from "react-icons/fa";
import logoLight from "../../assets/sedminalogo.png";
import logoDark from "../../assets/brightlogo.png";
import { useTranslations } from "next-intl";

const socialIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

export default function Footer({ siteSettings }) {
  const t = useTranslations("Footer");
  const companyName = siteSettings?.sirketAdi || "SedMina";
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  const slogan = siteSettings?.slogan || "";
  const navItems = siteSettings?.navigasyon || [];

  // Build social links from siteSettings (Prefer the new sorted list)
  let socialLinks = siteSettings?.sosyalMedyaLinkleri || [];

  // Fallback to legacy fields if the new list is empty
  if (socialLinks.length === 0) {
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
  }

  return (
    <footer className="relative border-t border-text-primary/5 bg-background overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 pointer-events-none" />

      <div className="container-custom relative z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-8 transition-transform hover:scale-105 duration-300">
              <Image
                src={logoDark}
                alt={companyName}
                width={160}
                height={48}
                className="hidden dark:block h-auto w-auto"
                style={{ width: "auto", height: "auto" }}
              />
              <Image
                src={logoLight}
                alt={companyName}
                width={160}
                height={48}
                className="dark:hidden h-auto w-auto"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            {slogan && (
              <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                {slogan}
              </p>
            )}
          </div>

          {/* Navigation */}
          {navItems.length > 0 && (
            <div>
              <h4 className="text-text-primary font-bold text-xs mb-8 uppercase tracking-[0.2em] relative inline-block">
                {t("quickAccess")}
                <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-primary rounded-full" />
              </h4>
              <ul className="space-y-4">
                {navItems.map((item, index) => (
                  <li key={item._key || index}>
                    <Link
                      href={item.href}
                      className="text-text-secondary text-sm hover:text-primary transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 h-[1px] bg-primary mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
                      {item.etiket}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-bold text-xs mb-8 uppercase tracking-[0.2em] relative inline-block">
              {t("contact")}
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-primary rounded-full" />
            </h4>
            <ul className="space-y-5">
              {siteSettings?.email && (
                <li>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="flex items-center gap-4 text-text-secondary text-sm hover:text-primary transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-surface border border-text-primary/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 group-hover:scale-110 shadow-sm">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <span>{siteSettings.email}</span>
                  </a>
                </li>
              )}
              {siteSettings?.telefon && (
                <li>
                  <a
                    href={`tel:${siteSettings.telefon.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 text-text-secondary text-sm hover:text-primary transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-surface border border-text-primary/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300 group-hover:scale-110 shadow-sm">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <span>{siteSettings.telefon}</span>
                  </a>
                </li>
              )}
              {siteSettings?.adres && (
                <li className="flex items-start gap-4 text-text-secondary text-sm group">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-text-primary/5 flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="leading-relaxed pt-2">
                    {siteSettings.adres}
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-text-primary font-bold text-xs mb-8 uppercase tracking-[0.2em] relative inline-block">
              {t("followUs")}
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-primary rounded-full" />
            </h4>
            <p className="text-text-secondary text-sm mb-8 leading-relaxed">
              {t("followUsDesc")}
            </p>
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {socialLinks.map(({ platform, url }) => {
                  const Icon = socialIcons[platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-surface border border-text-primary/5 flex items-center justify-center text-text-secondary hover:bg-primary hover:border-primary hover:text-background transition-all duration-300 hover:-translate-y-2 shadow-sm group"
                      aria-label={platform}
                    >
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-text-primary/5 bg-black/20 relative z-10">
        <div className="container-custom py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-text-muted text-[13px] font-medium">
            © {currentYear || "2024"} <span className="text-text-primary">{companyName}</span>. {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-6">
             <p className="text-text-muted text-[13px] font-medium">
              {t("designedBy")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
