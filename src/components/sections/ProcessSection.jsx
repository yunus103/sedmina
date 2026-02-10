import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionTitle, AnimatedElement, Button } from '../common';
import processData from '../../data/process.json';

export default function ProcessSection() {
    const [activeStep, setActiveStep] = useState(0);

    const getIcon = (iconName) => {
        const Icon = LucideIcons[iconName];
        return Icon || LucideIcons.Lightbulb;
    };

    return (
        <section className="section-padding bg-background">
            <div className="container-custom">
                <SectionTitle title={processData.title} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {processData.steps.map((step, index) => {
                        const Icon = getIcon(step.icon);
                        const isActive = activeStep === index;

                        return (
                            <motion.div
                                key={step.id}
                                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${isActive ? 'md:row-span-1' : ''
                                    }`}
                                onMouseEnter={() => setActiveStep(index)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                whileHover={{ y: -8 }}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `url('${step.image}')`,
                                            backgroundColor: '#1a1a1a',
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative p-6 md:p-8 h-full min-h-[400px] md:min-h-[450px] flex flex-col justify-between">
                                    {/* Top Row */}
                                    <div className="flex justify-between items-start">
                                        <motion.div
                                            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
                                            whileHover={{ scale: 1.1, rotate: 15 }}
                                        >
                                            <Icon className="w-5 h-5 text-background" />
                                        </motion.div>
                                        <motion.div
                                            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <ArrowUpRight className="w-4 h-4 text-white" />
                                        </motion.div>
                                    </div>

                                    {/* Bottom Content */}
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-xs tracking-[0.2em] text-text-muted uppercase mb-4">
                                            {step.subtitle}
                                        </p>

                                        <AnimatePresence mode="wait">
                                            {isActive && (
                                                <motion.p
                                                    className="text-text-secondary text-sm leading-relaxed"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {step.description}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Vertical Title for collapsed state */}
                                {!isActive && (
                                    <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
                                        <motion.span
                                            className="text-4xl font-display font-bold text-white/20 writing-vertical"
                                            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {step.title}
                                        </motion.span>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* About Us CTA */}
                <AnimatedElement animation="fadeUp" className="mt-12 text-center">
                    <p className="text-text-secondary mb-5">
                        Sürecimiz ve ekibimiz hakkında daha fazla bilgi edinin.
                    </p>
                    <Button href="/hakkimizda" variant="secondary" icon="arrow">
                        Bizi Tanıyın
                    </Button>
                </AnimatedElement>
            </div>
        </section>
    );
}
