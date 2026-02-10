import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import navigation from '../../data/navigation.json';
import siteConfig from '../../data/siteConfig.json';
import { Button } from '../common';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? 'bg-background/90 backdrop-blur-lg border-b border-white/5'
                        : 'bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <motion.div
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="text-background font-bold text-lg">S</span>
                            </motion.div>
                            <span className="text-xl font-display font-bold text-white">
                                {siteConfig.companyName}
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navigation.mainNav.map((item) => (
                                <Link
                                    key={item.id}
                                    to={item.href}
                                    className={`text-sm font-medium transition-colors duration-300 link-underline ${location.pathname === item.href
                                            ? 'text-primary'
                                            : 'text-text-secondary hover:text-white'
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
                                <span className="text-white font-medium">TR</span>
                            </div>

                            <Button href={navigation.ctaButton.href} variant="primary" icon="arrow">
                                {navigation.ctaButton.label}
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div
                            className="absolute inset-0 bg-background/95 backdrop-blur-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.nav
                            className="absolute top-20 left-0 right-0 p-6 flex flex-col gap-4"
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
                                        className={`block text-2xl font-medium py-2 ${location.pathname === item.href
                                                ? 'text-primary'
                                                : 'text-white hover:text-primary'
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
                                <Button href={navigation.ctaButton.href} variant="primary" icon="arrow" className="w-full">
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
