"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "../../i18n/routing";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import { Button } from "../common";
import logoLight from "../../assets/sedminalogo.png";

export default function Header({ siteSettings, allServices }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Common");
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [mobileExpandedService, setMobileExpandedService] = useState(false);
  const [activeMobileServiceId, setActiveMobileServiceId] = useState(null);

  // Derive navigation from siteSettings or use fallbacks
  const navItems = siteSettings?.navigasyon || [];
  const ctaButton = siteSettings?.ctaButon || null;
  const services = allServices || [];

  const isHomePage = pathname === "/";
  const isTransparent = !isScrolled && !hoveredNav && isHomePage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setHoveredNav(null);
    setMobileExpandedService(false);
    setActiveMobileServiceId(null);
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

  const toggleLanguage = () => {
    const nextLocale = locale === 'tr' ? 'en' : 'tr';
    const pathSegments = pathname.split('/').filter(Boolean);
    // For deep paths (sub-service /hizmetler/slug, blog /blog/slug)
    // redirect to the parent route instead to avoid 404s
    if (pathSegments.length >= 2) {
      router.replace(`/${pathSegments[0]}`, { locale: nextLocale });
    } else {
      router.replace(pathname, { locale: nextLocale });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || hoveredNav
            ? "py-3 bg-background/80 backdrop-blur-xl border-b border-text-primary/5 shadow-sm shadow-black/5"
            : "py-5 bg-transparent"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <Image
              src={siteSettings?.logoKoyuUrl || logoLight}
              alt={siteSettings?.sirketAdi || "SedMina"}
              width={160}
              height={40}
              style={{
                width: "auto",
                height: "36px",
                filter: isTransparent
                  ? "brightness(0) invert(1)"
                  : "none",
                transition: "filter 0.4s ease",
              }}
              priority
              fetchPriority="high"
              quality={75}
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
                      : !isTransparent
                        ? "text-text-secondary hover:text-text-primary"
                        : "text-white/80 hover:text-white"
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
            <button
              onClick={toggleLanguage}
              className={`font-display font-bold text-sm transition-colors duration-300 ${
                !isTransparent ? "text-text-primary hover:text-primary" : "text-white hover:text-white/80"
              }`}
            >
              {locale === "tr" ? "EN" : "TR"}
            </button>
            <ThemeToggle />
            {ctaButton && (
              <Button href={ctaButton.href} variant="primary" icon="arrow">
                {ctaButton.etiket}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className={`font-display font-bold text-sm transition-colors duration-300 ${
                !isTransparent ? "text-text-primary" : "text-white"
              }`}
            >
              {locale === "tr" ? "EN" : "TR"}
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative z-50 p-2 rounded-xl border transition-all duration-300 ${
                !isTransparent
                  ? "bg-surface/80 border-text-primary/10 text-text-primary"
                  : "bg-white/10 border-white/20 text-white"
              }`}
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
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 10, x: "-50%" }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-7xl bg-background border border-text-primary/10 shadow-2xl py-12 px-10 rounded-2xl"
              onMouseEnter={() => setHoveredNav("hizmetler")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12">
                  {services.map((service, index) => (
                    <div key={service._id} className="group/item">
                      <Link
                        href={`/hizmetler/${service.slug}`}
                        className="flex items-start gap-2 mb-3 min-h-[40px] px-8 group-hover/item:translate-x-1 transition-all duration-300"
                      >
                        <h3 className="font-display font-bold text-base text-primary transition-colors leading-tight">
                          {service.baslik}
                        </h3>
                      </Link>

                      {/* Divider & Sub Services List */}
                      <div
                        className={`relative min-h-[140px] px-8 ${
                          index % 5 !== 4 ? "lg:border-r border-primary/70" : ""
                        } ${
                          index % 2 === 0
                            ? "border-r border-primary/70 lg:border-r-0"
                            : ""
                        }`}
                      >
                        {service.altHizmetler &&
                          service.altHizmetler.length > 0 && (
                            <ul className="space-y-3">
                              {service.altHizmetler.slice(0, 4).map((sub) => (
                                <li key={sub._id}>
                                  <Link
                                    href={`/hizmetler/${service.slug}/${sub.slug}`}
                                    className="text-[13px] text-text-secondary hover:text-text-primary hover:translate-x-1 transition-all duration-300 flex items-center min-h-[32px] leading-tight"
                                  >
                                    {sub.baslik}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
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
                                {t("allServices")}
                              </Link>
                              {services.map((service) => (
                                <div
                                  key={service._id}
                                  className="text-left bg-surface/30 rounded-lg overflow-hidden border border-text-primary/5"
                                >
                                  <button
                                    onClick={() =>
                                      setActiveMobileServiceId(
                                        activeMobileServiceId === service._id
                                          ? null
                                          : service._id,
                                      )
                                    }
                                    className="w-full flex items-center justify-between p-4 group"
                                  >
                                    <span
                                      className={`font-bold transition-colors duration-300 ${
                                        activeMobileServiceId === service._id
                                          ? "text-primary"
                                          : "text-text-primary group-hover:text-primary"
                                      }`}
                                    >
                                      {service.baslik}
                                    </span>
                                    <ChevronRight
                                      className={`w-4 h-4 transition-transform duration-300 ${
                                        activeMobileServiceId === service._id
                                          ? "rotate-90 text-primary"
                                          : "text-text-muted"
                                      }`}
                                    />
                                  </button>

                                  <AnimatePresence>
                                    {activeMobileServiceId === service._id && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                          height: "auto",
                                          opacity: 1,
                                        }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-4 pb-4">
                                          <Link
                                            href={`/hizmetler/${service.slug}`}
                                            className="block text-sm font-semibold text-primary/80 hover:text-primary mb-3 pl-2 border-l-2 border-primary/20"
                                            onClick={() =>
                                              setIsMobileMenuOpen(false)
                                            }
                                          >
                                            {service.baslik} ({t("viewAll")})
                                          </Link>
                                          {service.altHizmetler && (
                                            <ul className="pl-2 border-l border-text-primary/10 space-y-2">
                                              {service.altHizmetler.map(
                                                (sub) => (
                                                  <li key={sub._id}>
                                                    <Link
                                                      href={`/hizmetler/${service.slug}/${sub.slug}`}
                                                      className="text-[13px] text-text-secondary hover:text-primary block py-1"
                                                      onClick={() =>
                                                        setIsMobileMenuOpen(
                                                          false,
                                                        )
                                                      }
                                                    >
                                                      {sub.baslik}
                                                    </Link>
                                                  </li>
                                                ),
                                              )}
                                            </ul>
                                          )}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
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
