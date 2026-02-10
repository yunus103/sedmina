import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { AnimatedElement, StaggerContainer, StaggerItem, Button } from '../components/common';
import servicesData from '../data/services.json';

export default function ServiceDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const services = servicesData.services;
    const currentIndex = services.findIndex((s) => s.id === id);
    const service = services[currentIndex];

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20 bg-background">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold text-white mb-4">
                        Hizmet Bulunamadı
                    </h1>
                    <p className="text-text-secondary mb-8">
                        Aradığınız hizmet sayfası mevcut değil.
                    </p>
                    <Button href="/hizmetler" variant="primary" icon="arrow">
                        Tüm Hizmetlere Dön
                    </Button>
                </div>
            </div>
        );
    }

    const Icon = LucideIcons[service.icon] || LucideIcons.Globe;
    const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
    const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

    return (
        <div className="pt-24 pb-20 min-h-screen bg-background">
            <div className="container-custom">
                {/* Breadcrumb */}
                <AnimatedElement animation="fadeUp">
                    <Link
                        to="/hizmetler"
                        className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-primary transition-colors duration-300 mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Tüm Hizmetler
                    </Link>
                </AnimatedElement>

                {/* Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
                    {/* Left — Text */}
                    <AnimatedElement animation="fadeUp">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-primary text-xs tracking-[0.2em] uppercase font-medium">
                                {service.subtitle}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                            {service.title}
                        </h1>

                        <p className="text-text-secondary text-lg leading-relaxed mb-8">
                            {service.detailDescription}
                        </p>

                        <Button href="/iletisim" variant="primary" icon="arrow">
                            Proje Başlat
                        </Button>
                    </AnimatedElement>

                    {/* Right — Image */}
                    <AnimatedElement animation="fadeLeft">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url('${service.image}')`,
                                    backgroundColor: '#2a2a2a',
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

                            {/* Counter Overlay */}
                            <div className="absolute bottom-6 left-6">
                                <span className="text-6xl font-display font-bold text-white/20">
                                    0{currentIndex + 1}
                                </span>
                            </div>
                        </div>
                    </AnimatedElement>
                </div>

                {/* Features & Technologies */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    {/* Features */}
                    <div className="lg:col-span-2">
                        <AnimatedElement animation="fadeUp">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
                                Neler Sunuyoruz
                            </h2>
                        </AnimatedElement>

                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {service.features.map((feature, index) => (
                                <StaggerItem key={index}>
                                    <motion.div
                                        className="flex items-start gap-3 p-4 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/20 transition-colors duration-300"
                                        whileHover={{ x: 4 }}
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-white text-sm font-medium">{feature}</span>
                                    </motion.div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>

                    {/* Technologies */}
                    <div>
                        <AnimatedElement animation="fadeUp" delay={0.2}>
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
                                Teknolojiler
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {service.technologies.map((tech, index) => (
                                    <motion.span
                                        key={index}
                                        className="px-4 py-2 rounded-full bg-surface border border-white/10 text-text-secondary text-sm hover:border-primary/30 hover:text-primary transition-all duration-300"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </AnimatedElement>
                    </div>
                </div>

                {/* CTA Banner */}
                <AnimatedElement animation="fadeUp">
                    <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 bg-surface border border-white/5 mb-16">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 text-center">
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                                Bu hizmete ihtiyacınız mı var?
                            </h3>
                            <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                                Projenizi birlikte değerlendirelim ve size en uygun çözümü bulalım.
                            </p>
                            <Button href="/iletisim" variant="primary" icon="arrow">
                                İletişime Geçin
                            </Button>
                        </div>
                    </div>
                </AnimatedElement>

                {/* Prev/Next Navigation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {prevService ? (
                        <Link
                            to={`/hizmetler/${prevService.id}`}
                            className="group flex items-center gap-4 p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/20 transition-all duration-300"
                        >
                            <ArrowLeft className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors group-hover:-translate-x-1 duration-300" />
                            <div>
                                <span className="text-text-muted text-xs uppercase tracking-wider">Önceki</span>
                                <p className="text-white font-medium group-hover:text-primary transition-colors duration-300">{prevService.title}</p>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {nextService && (
                        <Link
                            to={`/hizmetler/${nextService.id}`}
                            className="group flex items-center justify-end gap-4 p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-primary/20 transition-all duration-300 text-right"
                        >
                            <div>
                                <span className="text-text-muted text-xs uppercase tracking-wider">Sonraki</span>
                                <p className="text-white font-medium group-hover:text-primary transition-colors duration-300">{nextService.title}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
