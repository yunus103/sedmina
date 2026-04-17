"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaFacebookF,
  FaGlobe,
  FaLinkedinIn,
} from "react-icons/fa";
import { sanityFetch } from "../../sanity/lib/fetch";
import { siteSettingsQuery } from "../../sanity/lib/queries";

// Platform Ayarları (Yenilenmiş - Her buton kendi renginde)
const PLATFORMS = {
  website: {
    label: "Websitemizi Ziyaret Et",
    icon: FaGlobe,
    bg: "bg-gradient-to-r from-[#00D4FF] to-[#00AACC]",
    shadow: "shadow-[#00D4FF]/20",
    hoverShadow: "hover:shadow-[#00D4FF]/40",
  },
  whatsapp: {
    label: "WhatsApp İletişim Hattı",
    icon: FaWhatsapp,
    bg: "bg-[#25D366]",
    shadow: "shadow-green-500/20",
    hoverShadow: "hover:shadow-green-500/40",
  },
  instagram: {
    label: "Instagram Profilimiz",
    icon: FaInstagram,
    bg: "bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
    shadow: "shadow-orange-500/20",
    hoverShadow: "hover:shadow-orange-500/40",
  },
  tiktok: {
    label: "TikTok Paylaşımlarımız",
    icon: FaTiktok,
    bg: "bg-[#000000] border border-white/10",
    shadow: "shadow-white/5",
    hoverShadow: "hover:shadow-white/20",
  },
  facebook: {
    label: "Facebook Sayfamız",
    icon: FaFacebookF,
    bg: "bg-[#1877F2]",
    shadow: "shadow-blue-500/20",
    hoverShadow: "hover:shadow-blue-500/40",
  },
  linkedin: {
    label: "LinkedIn Hesabımız",
    icon: FaLinkedinIn,
    bg: "bg-[#0077b5]",
    shadow: "shadow-blue-700/20",
    hoverShadow: "hover:shadow-blue-700/40",
  },
};

export default function IletisimKanallariPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await sanityFetch(siteSettingsQuery, { locale: "tr" });
        setData(res.data);
      } catch (error) {
        console.error("Veri çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#00D4FF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Linkleri Hazırla
  const links = [
    { type: "website", url: "/" },
    { type: "instagram", url: data?.instagram },
    { type: "tiktok", url: data?.tiktok },
    { type: "facebook", url: data?.facebook },
    { type: "linkedin", url: data?.linkedin },
    {
      type: "whatsapp",
      url: data?.telefon
        ? `https://wa.me/${data.telefon.replace(/\D/g, "")}`
        : null,
    },
  ].filter((link) => link.url);

  // Sanity'den gelen ek linkleri de listeye dahil et
  if (data?.sosyalMedyaLinkleri) {
    data.sosyalMedyaLinkleri.forEach((item) => {
      const type = item.platform?.toLowerCase();
      if (!links.find((l) => l.type === type)) {
        links.push({ type, url: item.url, customLabel: item.platform });
      }
    });
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] relative overflow-x-hidden flex flex-col items-center py-12 px-6">
      {/* Arkaplan Atmosferi */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00D4FF]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFD700]/5 blur-[120px] rounded-full" />
      </div>

      {/* Profil/Logo Bölümü */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-10 text-center relative z-10"
      >
        <div className="relative w-28 h-28 mb-4">
          <div className="absolute inset-0 bg-white/5 rounded-full backdrop-blur-sm -m-2 border border-white/5" />
          <Image
            src={data?.logoKoyuUrl || "/logo.png"}
            alt="SedMina Logo"
            fill
            className="object-contain p-2"
            priority
          />
        </div>
        <h1 className="text-xl font-display font-bold text-white tracking-wide uppercase">
          SedMina Dijital
        </h1>
        <div className="w-12 h-[2px] bg-[#00D4FF] my-3 rounded-full" />
        <p className="text-gray-400 text-sm font-medium max-w-[260px]">
          {data?.slogan || "Dijital Çözümler, Kusursuz Deneyimler"}
        </p>
      </motion.div>

      {/* Buton Listesi */}
      <div className="w-full max-w-[380px] space-y-4 relative z-10">
        {links.map((link, index) => {
          const config = PLATFORMS[link.type] || PLATFORMS.website;
          const Icon = config.icon;

          return (
            <motion.a
              key={link.type + index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`
                group relative flex items-center gap-5 p-4 w-full
                ${config.bg} rounded-[2rem]
                transition-all duration-300 active:scale-95
                shadow-xl ${config.shadow} ${config.hoverShadow}
              `}
            >
              {/* Beyaz bir iç parlama efekti */}
              <div className="absolute inset-0 rounded-[2rem] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl text-white text-2xl shrink-0 shadow-inner">
                <Icon />
              </div>

              <span className="text-white font-semibold text-[1.05rem] tracking-tight">
                {link.customLabel || config.label}
              </span>

              <div className="ml-auto w-8 h-8 flex items-center justify-center bg-black/10 rounded-full">
                <svg
                  className="w-4 h-4 text-white/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Footer / Copyright */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-auto pt-16 pb-8 text-center"
      >
        <p className="text-gray-500 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} SEDMİNA DİJİTAL
        </p>
      </motion.footer>
    </main>
  );
}
