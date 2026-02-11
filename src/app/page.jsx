import {
  HeroSection,
  ProcessSection,
  ServicesSection,
  PartnersSection,
  ProjectsSection,
  BlogSection,
  ContactSection,
} from "../components/sections";

export const metadata = {
  title: "Ana Sayfa | SedMina Dijital Ajans",
  description: "Markanızı dijital dünyada öne çıkaran yaratıcı ve stratejik çözümler. Web yazılım, tasarım ve dijital pazarlama.",
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProcessSection />
      <ServicesSection />
      <PartnersSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
