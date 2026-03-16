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
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050d18 0%, #071828 40%, #060f1a 70%, #050d18 100%)",
      }}
    >
      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #00D4FF44 30%, #00D4FF88 50%, #00D4FF44 70%, transparent 100%)",
        }}
      />

      {/* Background Decorative Glows */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full -translate-y-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00D4FF12 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full translate-y-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FFD70010 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #00D4FF06 0%, transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#00D4FF 1px, transparent 1px), linear-gradient(90deg, #00D4FF 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block mb-8 transition-transform hover:scale-105 duration-300"
            >
              <Image
                src={siteSettings?.logoKoyuUrl || logoLight}
                alt={companyName}
                width={160}
                height={48}
                className="h-auto w-auto"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
            {slogan && (
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: "#94a3b8" }}
              >
                {slogan}
              </p>
            )}
          </div>

          {/* Navigation */}
          {navItems.length > 0 && (
            <div>
              <h4
                className="font-bold text-xs mb-8 uppercase tracking-[0.2em] relative inline-block"
                style={{ color: "#e2e8f0" }}
              >
                {t("quickAccess")}
                <span
                  className="absolute -bottom-2 left-0 w-8 h-[2px] rounded-full"
                  style={{ background: "#00D4FF" }}
                />
              </h4>
              <ul className="space-y-4">
                {navItems.map((item, index) => (
                  <li key={item._key || index}>
                    <Link
                      href={item.href}
                      className="text-sm transition-all duration-300 flex items-center group"
                      style={{ color: "#94a3b8" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#00D4FF")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#94a3b8")
                      }
                    >
                      <span
                        className="w-0 h-[1px] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"
                        style={{ background: "#00D4FF" }}
                      />
                      {item.etiket}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div>
            <h4
              className="font-bold text-xs mb-8 uppercase tracking-[0.2em] relative inline-block"
              style={{ color: "#e2e8f0" }}
            >
              {t("contact")}
              <span
                className="absolute -bottom-2 left-0 w-8 h-[2px] rounded-full"
                style={{ background: "#00D4FF" }}
              />
            </h4>
            <ul className="space-y-5">
              {siteSettings?.email && (
                <li>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="flex items-center gap-4 text-sm transition-all duration-300 group"
                    style={{ color: "#94a3b8" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#00D4FF")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#94a3b8")
                    }
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0"
                      style={{
                        background: "rgba(0,212,255,0.08)",
                        border: "1px solid rgba(0,212,255,0.2)",
                      }}
                    >
                      <Mail className="w-4 h-4" style={{ color: "#00D4FF" }} />
                    </div>
                    <span>{siteSettings.email}</span>
                  </a>
                </li>
              )}
              {siteSettings?.telefon && (
                <li>
                  <a
                    href={`tel:${siteSettings.telefon.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 text-sm transition-all duration-300 group"
                    style={{ color: "#94a3b8" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#00D4FF")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#94a3b8")
                    }
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0"
                      style={{
                        background: "rgba(0,212,255,0.08)",
                        border: "1px solid rgba(0,212,255,0.2)",
                      }}
                    >
                      <Phone
                        className="w-4 h-4"
                        style={{ color: "#00D4FF" }}
                      />
                    </div>
                    <span>{siteSettings.telefon}</span>
                  </a>
                </li>
              )}
              {siteSettings?.adres && (
                <li
                  className="flex items-start gap-4 text-sm"
                  style={{ color: "#94a3b8" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(0,212,255,0.08)",
                      border: "1px solid rgba(0,212,255,0.2)",
                    }}
                  >
                    <MapPin
                      className="w-4 h-4"
                      style={{ color: "#00D4FF" }}
                    />
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
            <h4
              className="font-bold text-xs mb-8 uppercase tracking-[0.2em] relative inline-block"
              style={{ color: "#e2e8f0" }}
            >
              {t("followUs")}
              <span
                className="absolute -bottom-2 left-0 w-8 h-[2px] rounded-full"
                style={{ background: "#00D4FF" }}
              />
            </h4>
            <p
              className="text-sm mb-8 leading-relaxed"
              style={{ color: "#94a3b8" }}
            >
              {t("followUsDesc")}
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
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-2 group"
                      style={{
                        background: "rgba(0,212,255,0.08)",
                        border: "1px solid rgba(0,212,255,0.15)",
                        color: "#94a3b8",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#00D4FF";
                        e.currentTarget.style.border = "1px solid #00D4FF";
                        e.currentTarget.style.color = "#050d18";
                        e.currentTarget.style.boxShadow =
                          "0 0 20px rgba(0,212,255,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(0,212,255,0.08)";
                        e.currentTarget.style.border =
                          "1px solid rgba(0,212,255,0.15)";
                        e.currentTarget.style.color = "#94a3b8";
                        e.currentTarget.style.boxShadow = "none";
                      }}
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
      <div
        className="relative z-10"
        style={{
          borderTop: "1px solid rgba(0,212,255,0.12)",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] font-medium" style={{ color: "#64748b" }}>
            © {currentYear || "2024"}{" "}
            <span style={{ color: "#00D4FF" }}>{companyName}</span>.{" "}
            {t("allRightsReserved")}
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[13px] font-medium" style={{ color: "#64748b" }}>
              {t("designedBy")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
