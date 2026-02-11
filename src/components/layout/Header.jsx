import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import navigation from "../../data/navigation.json";
import siteConfig from "../../data/siteConfig.json";
import { Button } from "../common";
import sedminaLogo from "../../assets/brightlogo.png";
import { ThemeToggle } from "../common";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-w-[100vw] ${
          isScrolled
            ? "bg-background/90 backdrop-blur-lg border-b border-text-primary/5"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 ">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <motion.img
                src={sedminaLogo}
                alt="sirket-logo"
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.2 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.mainNav.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-300 link-underline ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Toggle */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-muted">EN</span>
                <span className="text-text-primary font-medium">TR</span>
              </div>

              <ThemeToggle />

              <Button
                href={navigation.ctaButton.href}
                variant="primary"
                icon="arrow"
              >
                {navigation.ctaButton.label}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <ThemeToggle />
              <button
                className="p-2 text-text-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden max-w-[100vw]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 max-w-[100vw] bg-background/95 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              className="absolute top-20 left-0 right-0 p-6 flex flex-col gap-4 max-w-[100vw]"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navigation.mainNav.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`block text-2xl font-medium py-2 ${
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-text-primary hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navigation.mainNav.length * 0.1 }}
                className="pt-4"
              >
                <Button
                  href={navigation.ctaButton.href}
                  variant="primary"
                  icon="arrow"
                  className="w-full"
                >
                  {navigation.ctaButton.label}
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
