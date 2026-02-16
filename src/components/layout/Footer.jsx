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
import logoLight from "../../assets/sedminalogo.png";
import logoDark from "../../assets/brightlogo.png";

const socialIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
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

  return (
    <footer className="border-t border-text-primary/5 bg-surface/30">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src={logoDark}
                alt={companyName}
                width={110}
                height={30}
                className="hidden dark:block"
              />
              <Image
                src={logoLight}
                alt={companyName}
                width={110}
                height={30}
                className="dark:hidden"
              />
            </Link>
            {slogan && (
              <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-xs">
                {slogan}
              </p>
            )}
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map(({ platform, url }) => {
                  const Icon = socialIcons[platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-text-primary/5 border border-text-primary/10 flex items-center justify-center text-text-muted hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all duration-300"
                      aria-label={platform}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation */}
          {navItems.length > 0 && (
            <div>
              <h4 className="text-text-primary font-semibold text-sm mb-5">
                Sayfalar
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
            <h4 className="text-text-primary font-semibold text-sm mb-5">
              İletişim
            </h4>
            <ul className="space-y-3">
              {siteSettings?.email && (
                <li>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="flex items-center gap-2 text-text-muted text-sm hover:text-primary transition-colors duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    {siteSettings.email}
                  </a>
                </li>
              )}
              {siteSettings?.telefon && (
                <li>
                  <a
                    href={`tel:${siteSettings.telefon.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-text-muted text-sm hover:text-primary transition-colors duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    {siteSettings.telefon}
                  </a>
                </li>
              )}
              {siteSettings?.adres && (
                <li className="flex items-center gap-2 text-text-muted text-sm">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {siteSettings.adres}
                </li>
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-5">
              Yasal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/gizlilik-politikasi"
                  className="text-text-muted text-sm hover:text-primary transition-colors duration-300"
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="/kullanim-kosullari"
                  className="text-text-muted text-sm hover:text-primary transition-colors duration-300"
                >
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link
                  href="/kvkk"
                  className="text-text-muted text-sm hover:text-primary transition-colors duration-300"
                >
                  KVKK
                </Link>
              </li>
            </ul>
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
            Türkiye&apos;de ❤️ ile tasarlandı.
          </p>
        </div>
      </div>
    </footer>
  );
}
