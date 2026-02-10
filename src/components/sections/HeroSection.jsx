import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '../common';
import siteConfig from '../../data/siteConfig.json';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 10, 0.3), rgba(10, 10, 10, 0.8)), url('/images/hero-bg.jpg')`,
                    }}
                />
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 animate-gradient" />

                {/* Light beam effect */}
                <motion.div
                    className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                />
            </div>

            {/* Watermark Text */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <h1 className="text-[15vw] md:text-[12vw] font-display font-black text-white/[0.03] whitespace-nowrap select-none leading-none">
                    {siteConfig.companyName.toUpperCase()}
                </h1>
            </motion.div>

            {/* Content */}
            <div className="container-custom relative z-10 text-center pt-20">
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Tagline */}
                    <motion.p
                        className="text-lg md:text-xl lg:text-2xl text-text-secondary mb-8 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <span className="text-primary font-semibold">Fikir</span> ve{' '}
                        <span className="text-primary font-semibold">Etki</span> arasındaki görünmeyen bağı işleyen
                        <br className="hidden md:block" />
                        <span className="text-white">Stratejik Dijital Deneyim Stüdyosu.</span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Button href="/iletisim" variant="primary" icon="arrow">
                            PROJE BAŞLAT
                        </Button>

                        <motion.button
                            className="flex items-center gap-3 text-white group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300"
                                whileHover={{ scale: 1.1 }}
                            >
                                <Play className="w-4 h-4 ml-0.5 group-hover:text-primary transition-colors duration-300" />
                            </motion.div>
                            <span className="text-sm font-medium group-hover:text-primary transition-colors duration-300">
                                Tanıtım Videosu
                            </span>
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Floating Astronaut */}
                <motion.div
                    className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden xl:block"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <img
                            src="/images/astronaut.png"
                            alt="Astronaut"
                            className="w-80 h-auto drop-shadow-2xl"
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                <motion.div
                    className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
                    animate={{ borderColor: ['rgba(255,255,255,0.3)', 'rgba(0,212,255,0.5)', 'rgba(255,255,255,0.3)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-2 rounded-full bg-white"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
