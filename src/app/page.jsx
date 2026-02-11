import {
  HeroSection,
  ProcessSection,
  ServicesSection,
  PartnersSection,
  ProjectsSection,
  BlogSection,
  ContactSection,
} from "../components/sections";

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
