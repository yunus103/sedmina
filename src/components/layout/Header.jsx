"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import { Button } from "../common";
import logoLight from "../../assets/sedminalogo.png";
import logoDark from "../../assets/brightlogo.png";

export default function Header({ siteSettings, allServices }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [mobileExpandedService, setMobileExpandedService] = useState(false);

  // Derive navigation from siteSettings or use fallbacks
  const navItems = siteSettings?.navigasyon || [];
  const ctaButton = siteSettings?.ctaButon || null;
  const services = allServices || [];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setHoveredNav(null);
    setMobileExpandedService(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (item) => {
    if (item.href === "/hizmetler") {
      setHoveredNav("hizmetler");
    } else {
      setHoveredNav(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredNav(null);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || hoveredNav
            ? "py-3 bg-background/80 backdrop-blur-xl border-b border-text-primary/5 shadow-sm shadow-black/5"
            : "py-5 bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <Image
              src={logoDark}
              alt={siteSettings?.sirketAdi || "SedMina"}
              width={120}
              height={32}
              className="hidden dark:block"
              priority
            />
            <Image
              src={logoLight}
              alt={siteSettings?.sirketAdi || "SedMina"}
              width={120}
              height={32}
              className="dark:hidden"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <div
                key={item._key || index}
                onMouseEnter={() => handleMouseEnter(item)}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                    pathname === item.href ||
                    (item.href === "/hizmetler" &&
                      pathname.startsWith("/hizmetler"))
                      ? "text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.etiket}
                  {(pathname === item.href ||
                    (item.href === "/hizmetler" &&
                      pathname.startsWith("/hizmetler"))) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            {ctaButton && (
              <Button href={ctaButton.href} variant="primary" icon="arrow">
                {ctaButton.etiket}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 p-2 rounded-xl bg-surface/80 border border-text-primary/10 text-text-primary"
              aria-label="Menü aç/kapat"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {hoveredNav === "hizmetler" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-3xl border-b border-text-primary/5 shadow-xl pt-8 pb-12"
              onMouseEnter={() => setHoveredNav("hizmetler")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="container-custom">
                <div className="grid grid-cols-4 gap-8">
                  {services.map((service) => (
                    <div key={service._id} className="group">
                      <Link
                        href={`/hizmetler/${service.slug}`}
                        className="flex items-center gap-3 mb-4 group-hover:translate-x-1 transition-transform"
                      >
                        {service.gorselUrl && (
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-surface">
                            <Image
                              src={service.gorselUrl}
                              alt={service.baslik}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-display font-bold text-text-primary group-hover:text-primary transition-colors">
                            {service.baslik}
                          </h3>
                          <p className="text-xs text-text-muted line-clamp-1">
                            {service.altBaslik}
                          </p>
                        </div>
                      </Link>
                      {/* Sub Services List */}
                      {service.altHizmetler &&
                        service.altHizmetler.length > 0 && (
                          <ul className="space-y-2 pl-[3.25rem] border-l-2 border-text-primary/5 ml-5">
                            {service.altHizmetler.map((sub) => (
                              <li key={sub._id}>
                                <Link
                                  href={`/hizmetler/${service.slug}/${sub.slug}`}
                                  className="text-sm text-text-secondary hover:text-primary transition-colors block py-1"
                                >
                                  {sub.baslik}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              className="relative flex flex-col items-center justify-center h-full gap-2 px-8 overflow-y-auto py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item._key || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="w-full text-center"
                >
                  {item.href === "/hizmetler" ? (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() =>
                          setMobileExpandedService(!mobileExpandedService)
                        }
                        className={`flex items-center justify-center gap-3 text-2xl font-display font-bold py-3 transition-colors duration-300 ${
                          pathname.startsWith("/hizmetler")
                            ? "text-primary"
                            : "text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        {item.etiket}
                        <ChevronRight
                          className={`w-5 h-5 transition-transform duration-300 ${
                            mobileExpandedService ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileExpandedService && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden w-full max-w-sm mx-auto"
                          >
                            <div className="py-4 space-y-4">
                              <Link
                                href="/hizmetler"
                                className="block text-lg font-medium text-text-secondary hover:text-primary mb-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                Tüm Hizmetler
                              </Link>
                              {services.map((service) => (
                                <div
                                  key={service._id}
                                  className="text-left bg-surface/30 rounded-lg p-4"
                                >
                                  <Link
                                    href={`/hizmetler/${service.slug}`}
                                    className="block font-bold text-text-primary hover:text-primary mb-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {service.baslik}
                                  </Link>
                                  {service.altHizmetler && (
                                    <ul className="pl-4 border-l border-text-primary/10 ml-1 space-y-2 mt-2">
                                      {service.altHizmetler.map((sub) => (
                                        <li key={sub._id}>
                                          <Link
                                            href={`/hizmetler/${service.slug}/${sub.slug}`}
                                            className="text-sm text-text-secondary hover:text-primary block"
                                            onClick={() =>
                                              setIsMobileMenuOpen(false)
                                            }
                                          >
                                            {sub.baslik}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center justify-center gap-3 text-2xl font-display font-bold py-3 transition-colors duration-300 ${
                        pathname === item.href
                          ? "text-primary"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {item.etiket}
                      {pathname === item.href && (
                        <ChevronRight className="w-5 h-5 text-primary" />
                      )}
                    </Link>
                  )}
                </motion.div>
              ))}
              {ctaButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <Button href={ctaButton.href} variant="primary" icon="arrow">
                    {ctaButton.etiket}
                  </Button>
                </motion.div>
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
