import { motion } from 'framer-motion';
import { AnimatedElement } from '../common';
import partnersData from '../../data/partners.json';

export default function PartnersSection() {
    return (
        <section className="py-16 md:py-24 bg-background border-y border-white/5">
            <div className="container-custom">
                {/* Title */}
                <AnimatedElement animation="fadeUp" className="text-center mb-12">
                    <p className="text-xs md:text-sm tracking-[0.3em] text-text-muted uppercase">
                        {partnersData.sectionTitle}
                    </p>
                </AnimatedElement>

                {/* Partners Logo Grid */}
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-20">
                    {partnersData.partners.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            className="group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* If logo SVG exists, use it; otherwise show text */}
                                {partner.logo ? (
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="h-8 md:h-10 w-auto opacity-40 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                                    />
                                ) : (
                                    <span className="text-xl md:text-2xl font-display font-semibold text-text-muted transition-colors duration-300 group-hover:text-white">
                                        {partner.name}
                                    </span>
                                )}

                                {/* Hover glow effect */}
                                <motion.div
                                    className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
                                        filter: 'blur(20px)',
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Animated line decoration */}
                <motion.div
                    className="mt-16 flex justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex items-center gap-4">
                        <motion.div
                            className="w-12 md:w-24 h-px bg-gradient-to-r from-transparent to-primary/50"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        />
                        <div className="w-2 h-2 rounded-full bg-primary/50" />
                        <motion.div
                            className="w-12 md:w-24 h-px bg-gradient-to-l from-transparent to-primary/50"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
