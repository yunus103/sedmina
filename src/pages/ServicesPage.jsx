import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionTitle, AnimatedElement, StaggerContainer, StaggerItem } from '../components/common';
import servicesData from '../data/services.json';

export default function ServicesPage() {
    const getIcon = (iconName) => {
        const Icon = LucideIcons[iconName];
        return Icon || LucideIcons.Globe;
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-background">
            <div className="container-custom">
                {/* Page Header */}
                <AnimatedElement animation="fadeUp" className="mb-16 md:mb-20">
                    <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
                        {servicesData.sectionSubtitle}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                        Markanızı öne çıkaran<br />
                        <span className="text-gradient">dijital çözümler.</span>
                    </h1>
                    <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
                        Stratejiden uygulamaya, tasarımdan geliştirmeye kadar kapsamlı hizmetlerimizle
                        dijital dönüşüm yolculuğunuzda yanınızdayız.
                    </p>
                </AnimatedElement>

                {/* Services Grid */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {servicesData.services.map((service, index) => {
                        const Icon = getIcon(service.icon);

                        return (
                            <StaggerItem key={service.id}>
                                <Link to={`/hizmetler/${service.id}`}>
                                    <motion.div
                                        className="group relative bg-surface rounded-2xl border border-white/5 overflow-hidden h-full cursor-pointer"
                                        whileHover={{ y: -6, transition: { duration: 0.3 } }}
                                    >
                                        {/* Top Image Banner */}
                                        <div className="relative h-48 md:h-56 overflow-hidden">
                                            <motion.div
                                                className="absolute inset-0 bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url('${service.image}')`,
                                                    backgroundColor: '#2a2a2a',
                                                }}
                                                whileHover={{ scale: 1.06 }}
                                                transition={{ duration: 0.6 }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                                            {/* Index Number */}
                                            <div className="absolute top-5 right-5">
                                                <span className="text-white/10 text-6xl font-display font-bold">
                                                    0{index + 1}
                                                </span>
                                            </div>

                                            {/* Icon */}
                                            <div className="absolute bottom-5 left-6 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center backdrop-blur-sm">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 md:p-8">
                                            <p className="text-primary text-[10px] tracking-[0.2em] uppercase font-medium mb-2">
                                                {service.subtitle}
                                            </p>
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                                                {service.title}
                                            </h3>
                                            <p className="text-text-secondary text-sm leading-relaxed mb-6">
                                                {service.description}
                                            </p>

                                            {/* Features Preview */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {service.features.slice(0, 3).map((feature, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-[11px] px-3 py-1 rounded-full bg-white/5 text-text-muted border border-white/5"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                                {service.features.length > 3 && (
                                                    <span className="text-[11px] px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                                        +{service.features.length - 3} daha
                                                    </span>
                                                )}
                                            </div>

                                            {/* CTA */}
                                            <div className="flex items-center gap-2 text-primary text-sm font-medium">
                                                <span>Detayları Gör</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </div>

                                        {/* Bottom hover accent */}
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                    </motion.div>
                                </Link>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </div>
        </div>
    );
}
