"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import HakkimizdaSedminadijitalCom from "../../assets/images/hakkimizda-Sedminadijital-com.webp";
import {
  ArrowRight,
  Users,
  Rocket,
  Award,
  Heart,
  Target,
  Zap,
} from "lucide-react";
import {
  AnimatedElement,
  StaggerContainer,
  StaggerItem,
  Button,
} from "../../components/common";

const stats = [
  { value: "50+", label: "Tamamlanan Proje" },
  { value: "30+", label: "Mutlu Müşteri" },
  { value: "15+", label: "Yıllık Deneyim" },
  { value: "12", label: "Uzman Ekip" },
];

const values = [
  {
    icon: Target,
    title: "Stratejik Düşünce",
    description:
      "Her projeye derinlemesine analiz ve veri odaklı stratejilerle yaklaşıyoruz.",
  },
  {
    icon: Zap,
    title: "Yenilikçi Çözümler",
    description:
      "En yeni teknolojileri kullanarak sınırları zorlayan dijital deneyimler tasarlıyoruz.",
  },
  {
    icon: Heart,
    title: "Tutku & Özveri",
    description:
      "Her projemize kendi markamızmış gibi tutkuyla ve özveriyle yaklaşıyoruz.",
  },
  {
    icon: Award,
    title: "Kalite Odaklılık",
    description:
      "En yüksek standartlarda çalışarak, mükemmeliyeti hedefliyoruz.",
  },
  {
    icon: Users,
    title: "İşbirlikçi Yaklaşım",
    description:
      "Müşterilerimizle şeffaf ve sürekli iletişim içinde çalışıyoruz.",
  },
  {
    icon: Rocket,
    title: "Sonuç Odaklılık",
    description:
      "Ölçülebilir sonuçlar üreten, ROI odaklı projeler geliştiriyoruz.",
  },
];

const timeline = [
  {
    year: "2021",
    title: "Kuruluş",
    description:
      "SedMina, dijital dünyada fark yaratma vizyonuyla İstanbul'da kuruldu.",
  },
  {
    year: "2022",
    title: "İlk Büyük Projeler",
    description:
      "Kurumsal müşterilerle çalışmaya başlayarak portföyümüzü genişlettik.",
  },
  {
    year: "2023",
    title: "Ekip Büyümesi",
    description:
      "Alanında uzman yetenekleri ekibimize katarak kapasitemizi artırdık.",
  },
  {
    year: "2024",
    title: "Ödüller & Tanınırlık",
    description: "Ulusal ve uluslararası projelerde başarılarımızla tanındık.",
  },
  {
    year: "2025",
    title: "Yeni Ufuklar",
    description:
      "AI destekli çözümler ve ileri teknolojilerle hizmet yelpazemizi genişletiyoruz.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      {/* Hero */}
      <section className="container-custom mb-20 md:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedElement animation="fadeUp">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
              HAKKIMIZDA
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6 leading-tight">
              Doğru Çözümler Her Zaman{" "}
              <span className="text-gradient">Doğru Araçlarla</span> Ulaşılır.
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              SedMina, dijital dünyada markaları öne çıkaran stratejik bir
              deneyim stüdyosudur. Yaratıcılığı teknolojiyle, stratejiyi
              tasarımla harmanlayarak unutulmaz dijital deneyimler yaratıyoruz.
            </p>
            <Button href="/iletisim" variant="primary" icon="arrow">
              Birlikte Çalışalım
            </Button>
          </AnimatedElement>

          <AnimatedElement animation="fadeLeft">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface">
              <Image
                src={HakkimizdaSedminadijitalCom}
                alt="Hakkimizda"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Stats */}
      <section className="container-custom mb-20 md:mb-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 md:p-8 rounded-2xl bg-surface/50 border border-text-primary/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, borderColor: "rgba(0,212,255,0.2)" }}
            >
              <span className="text-4xl md:text-5xl font-display font-bold text-primary">
                {stat.value}
              </span>
              <p className="text-text-secondary text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-custom mb-20 md:mb-28">
        <AnimatedElement animation="fadeUp" className="mb-12">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
            DEĞERLERİMİZ
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
            Bizi biz yapan ilkeler.
          </h2>
        </AnimatedElement>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <StaggerItem key={index}>
                <motion.div
                  className="p-6 md:p-8 rounded-2xl bg-surface/50 border border-text-primary/5 h-full hover:border-primary/20 transition-all duration-300"
                  whileHover={{ y: -6 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* Timeline */}
      <section className="container-custom mb-20 md:mb-28">
        <AnimatedElement animation="fadeUp" className="mb-12">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
            YOLCULUĞUMUZ
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
            Nasıl buraya geldik.
          </h2>
        </AnimatedElement>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-text-primary/10 md:-translate-x-px" />

          <div className="space-y-12">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className={`relative flex items-start gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16"}`}
                  >
                    <span className="text-primary text-sm font-bold">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-text-primary mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom">
        <AnimatedElement animation="fadeUp">
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-16 bg-surface border border-text-primary/5 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                Projenizi birlikte hayata geçirelim.
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                Dijital dönüşüm yolculuğunuzda size rehberlik edelim. İlk adımı
                birlikte atalım.
              </p>
              <Button href="/iletisim" variant="primary" icon="arrow">
                İletişime Geçin
              </Button>
            </div>
          </div>
        </AnimatedElement>
      </section>
    </div>
  );
}
