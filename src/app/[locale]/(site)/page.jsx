import dynamic from "next/dynamic";
import HeroSection from "../../../components/sections/HeroSection";
import ServicesSection from "../../../components/sections/ServicesSection";

const ProcessSection = dynamic(
  () => import("../../../components/sections/ProcessSection"),
);
const PartnersSection = dynamic(
  () => import("../../../components/sections/PartnersSection"),
);
const ProjectsSection = dynamic(
  () => import("../../../components/sections/ProjectsSection"),
);
const BlogSection = dynamic(
  () => import("../../../components/sections/BlogSection"),
);
const ContactSection = dynamic(
  () => import("../../../components/sections/ContactSection"),
);
import { sanityFetch } from "../../../sanity/lib/fetch";
import {
  homePageQuery,
  allServicesQuery,
  allReferencesQuery,
  allProjectsQuery,
  allBlogPostsQuery,
  siteSettingsQuery,
} from "../../../sanity/lib/queries";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const [homeRes, settingsRes] = await Promise.all([
    sanityFetch(homePageQuery, { locale }),
    sanityFetch(siteSettingsQuery, { locale }),
  ]);

  const homeSeo = homeRes.data?.seo;
  const siteSettings = settingsRes.data;

  return {
    title: {
      absolute:
        homeSeo?.baslik ||
        siteSettings?.seo?.baslik ||
        "SedMina Dijital | Web Yazılım Web Tasarım Sosyal Medya Yönetimi SEO Reklamlar",
    },
    description:
      homeSeo?.aciklama ||
      siteSettings?.seo?.aciklama ||
      "SedMina Dijital | Web Yazılım Web Tasarım Sosyal Medya Yönetimi SEO Reklamlar için bizimle iletişime geçiniz.",
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
    alternates: {
      canonical: `/${locale}`,
      languages: {
        tr: "/tr",
        en: "/en",
        "x-default": "/tr",
      },
    },
  };
}

import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Fetch all data in parallel
  const [
    homeRes,
    servicesRes,
    referencesRes,
    projectsRes,
    blogRes,
    settingsRes,
  ] = await Promise.all([
    sanityFetch(homePageQuery, { locale }),
    sanityFetch(allServicesQuery, { locale }),
    sanityFetch(allReferencesQuery),
    sanityFetch(allProjectsQuery, { locale }),
    sanityFetch(allBlogPostsQuery, { locale }),
    sanityFetch(siteSettingsQuery, { locale }),
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
        images={
          homePage?.heroSlaytlarUrls?.length > 0
            ? homePage.heroSlaytlarUrls
            : [homePage?.heroArkaPlanGorsel]
        }
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
