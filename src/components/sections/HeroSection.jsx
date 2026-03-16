"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "../common";
import heroBg from "../../assets/hero.png";
import Image from "next/image";

export default function HeroSection({
  companyName,
  slogan,
  ctaText,
  ctaLink,
  images = [],
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // For slide direction
  const slideImages =
    images?.filter(Boolean).length > 0 ? images.filter(Boolean) : [heroBg];

  // Auto-slide functionality
  useEffect(() => {
    if (slideImages.length <= 1) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 6000); // Slightly longer for readability

    return () => clearInterval(timer);
  }, [currentIndex, slideImages.length]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + newDirection + slideImages.length) % slideImages.length,
    );
  };

  // Variants for slide animation
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        opacity: { duration: 0.5 },
        x: { duration: 0.8, ease: "easeInOut" },
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0 select-none">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.8 },
              scale: { duration: 10, ease: "linear" },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000) {
                paginate(1);
              } else if (swipe > 10000) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={slideImages[currentIndex]}
              alt={`Hero slide ${currentIndex + 1}`}
              fill
              priority
              fetchPriority="high"
              decoding={currentIndex === 0 ? "sync" : "async"}
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1600px, 1920px"
              className="object-cover pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/30 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 z-10 pointer-events-none" />

        {/* Slide Indicators (Vertical on the right) */}
        {slideImages.length > 1 && (
          <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-40">
            {slideImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className="group relative flex items-center justify-center p-2"
                aria-label={`Go to slide ${idx + 1}`}
              >
                {/* Slide Number (Visible on hover) */}
                <span className="absolute right-full mr-4 text-[10px] font-bold text-white/0 group-hover:text-primary transition-all duration-300 whitespace-nowrap tracking-wider hidden md:block">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div
                  className={`w-[2px] rounded-full transition-all duration-500 ease-out ${
                    idx === currentIndex
                      ? "h-12 bg-primary shadow-[0_0_20px_rgba(var(--primary),0.8)]"
                      : "h-4 bg-white/10 group-hover:bg-white/40 group-hover:h-6"
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Light beam effect */}
        <motion.div
          className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ willChange: "opacity, transform" }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-30 text-center pt-20 pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          {/* Tagline */}
          {slogan ? (
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 leading-relaxed drop-shadow-md hero-entrance">
              {slogan}
            </p>
          ) : (
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 leading-relaxed drop-shadow-md hero-entrance">
              <span className="text-primary font-semibold drop-shadow-lg">
                Fikir
              </span>{" "}
              ve{" "}
              <span className="text-primary font-semibold drop-shadow-lg">
                Etki
              </span>{" "}
              arasındaki görünmeyen bağı işleyen
              <br className="hidden md:block" />
              <span className="text-white drop-shadow-lg font-medium">
                Stratejik Dijital Deneyim Stüdyosu.
              </span>
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button
              href={ctaLink || "/iletisim"}
              variant="primary"
              icon="arrow"
            >
              {ctaText || "PROJE BAŞLAT"}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (Kept at bottom-8) */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          animate={{
            borderColor: [
              "rgba(255,255,255,0.2)",
              "rgba(0,212,255,0.4)",
              "rgba(255,255,255,0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
