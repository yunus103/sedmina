"use client";
import { motion } from "framer-motion";
import { AnimatedElement } from "../../../components/common";

export default function Map({ url }) {
  if (!url) return null;

  return (
    <AnimatedElement animation="fadeUp" delay={0.2} className="mt-16 md:mt-24">
      <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-text-primary/5 shadow-2xl group">
        <iframe
          src={url}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Şirket Konumu"
          className="transition-all duration-700"
        ></iframe>

        {/* Decorative Overlay */}
        <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-3xl"></div>

        {/* Address Overlay (Optional/Minimal) */}
        <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xs p-6 bg-background/80 backdrop-blur-md border border-white/10 rounded-2xl hidden md:block">
          <h4 className="text-text-primary font-bold mb-2">Ofisimiz</h4>
          <p className="text-text-secondary text-sm leading-relaxed">
            İstanbul, Türkiye. <br />
            Sizi bir kahve eşliğinde projelerinizi konuşmaya bekliyoruz.
          </p>
        </div>
      </div>
    </AnimatedElement>
  );
}
