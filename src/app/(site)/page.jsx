import HeroSection from "../../components/sections/HeroSection";
import ProcessSection from "../../components/sections/ProcessSection";
import ServicesSection from "../../components/sections/ServicesSection";
import PartnersSection from "../../components/sections/PartnersSection";
import ProjectsSection from "../../components/sections/ProjectsSection";
import BlogSection from "../../components/sections/BlogSection";
import ContactSection from "../../components/sections/ContactSection";
import { sanityFetch } from "../../sanity/lib/fetch";
import {
  homePageQuery,
  allServicesQuery,
  allReferencesQuery,
  allProjectsQuery,
  allBlogPostsQuery,
  siteSettingsQuery,
} from "../../sanity/lib/queries";

export async function generateMetadata() {
  const [homeRes, settingsRes] = await Promise.all([
    sanityFetch(homePageQuery),
    sanityFetch(siteSettingsQuery),
  ]);

  const homeSeo = homeRes.data?.seo;
  const siteSettings = settingsRes.data;

  return {
    title:
      homeSeo?.baslik ||
      siteSettings?.seo?.baslik ||
      "SedMina | Dijital Çözüm Ortağınız",
    description:
      homeSeo?.aciklama ||
      siteSettings?.seo?.aciklama ||
      siteSettings?.aciklama,
    keywords:
      homeSeo?.anahtarKelimeler || siteSettings?.seo?.anahtarKelimeler || [],
    openGraph: {
      title: homeSeo?.baslik || siteSettings?.seo?.baslik,
      description: homeSeo?.aciklama || siteSettings?.seo?.aciklama,
      images: [
        {
          url:
            homeSeo?.ogGorselUrl ||
            siteSettings?.seo?.ogGorselUrl ||
            "/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function HomePage() {
  // Fetch all data in parallel
  const [
    homeRes,
    servicesRes,
    referencesRes,
    projectsRes,
    blogRes,
    settingsRes,
  ] = await Promise.all([
    sanityFetch(homePageQuery),
    sanityFetch(allServicesQuery),
    sanityFetch(allReferencesQuery),
    sanityFetch(allProjectsQuery),
    sanityFetch(allBlogPostsQuery),
    sanityFetch(siteSettingsQuery),
  ]);

  const homePage = homeRes.data;
  const services = servicesRes.data;
  const references = referencesRes.data;
  const projects = projectsRes.data;
  const blogPosts = blogRes.data;
  const siteSettings = settingsRes.data;

  return (
    <>
      <HeroSection
        companyName={siteSettings?.sirketAdi}
        slogan={homePage?.heroSlogan}
        ctaText={homePage?.heroCtaYazi}
        ctaLink={homePage?.heroCtaLink}
        backgroundImage={homePage?.heroArkaPlanGorsel}
      />
      <ProcessSection
        title={homePage?.surecBaslik}
        steps={homePage?.surecAdimlari}
        ctaText={homePage?.surecCtaYazi}
      />
      <ServicesSection
        title={homePage?.hizmetlerBaslik}
        subtitle={homePage?.hizmetlerAltBaslik}
        services={services}
      />
      <PartnersSection
        title={homePage?.referanslarBaslik}
        references={references}
      />
      <ProjectsSection
        title={homePage?.projelerBaslik}
        subtitle={homePage?.projelerAltBaslik}
        viewAllText={homePage?.projelerTumunuGorYazi}
        projects={projects}
      />
      <BlogSection
        title={homePage?.blogBaslik}
        subtitle={homePage?.blogAltBaslik}
        viewAllText={homePage?.blogTumunuGorYazi}
        posts={blogPosts}
      />
      <ContactSection
        title={homePage?.iletisimBaslik}
        subtitle={homePage?.iletisimAltYazi}
        siteSettings={siteSettings}
      />
    </>
  );
}
