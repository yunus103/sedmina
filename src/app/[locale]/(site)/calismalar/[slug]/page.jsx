import { sanityFetch } from "../../../../../sanity/lib/fetch";
import {
  projectBySlugQuery,
  allProjectsQuery,
} from "../../../../../sanity/lib/queries";
import ProjectDetailClient from "./ProjectDetailClient";
import JsonLd from "../../../../../components/seo/JsonLd";
import { setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  const locales = ["tr", "en"];
  const paths = [];
  for (const locale of locales) {
    const res = await sanityFetch(allProjectsQuery, { locale });
    const projects = res.data || [];
    projects.forEach((proj) => {
      if (proj.slug) {
        paths.push({ locale, slug: proj.slug });
      }
    });
  }
  return paths;
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { slug } = await params;
  const { data: project } = await sanityFetch(projectBySlugQuery, { slug, locale });

  if (!project) {
    return {
      title: "Proje Bulunamadı",
      description: "Aradığınız proje bulunamadı.",
    };
  }

  return {
    title: project.seo?.baslik || project.baslik,
    description: project.seo?.aciklama || project.aciklama,
    keywords: project.seo?.anahtarKelimeler || [],
    openGraph: {
      title: project.seo?.baslik || project.baslik,
      description: project.seo?.aciklama || project.aciklama,
      images: [
        {
          url: project.seo?.ogGorselUrl || project.gorselUrl,
          width: 1200,
          height: 630,
          alt: project.seo?.baslik || project.baslik,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo?.baslik || project.baslik,
      description: project.seo?.aciklama || project.aciklama,
      images: [project.seo?.ogGorselUrl || project.gorselUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { locale } = await params;
  const { slug } = await params;
  setRequestLocale(locale);

  const [projectRes, allProjectsRes] = await Promise.all([
    sanityFetch(projectBySlugQuery, { slug, locale }),
    sanityFetch(allProjectsQuery, { locale }),
  ]);

  const project = projectRes.data;
  const allProjects = allProjectsRes.data;

  if (!project) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.baslik,
    description: project.aciklama,
    image: project.gorselUrl,
    creator: {
      "@type": "Organization",
      name: "SedMina",
    },
    dateCreated: project.yil,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProjectDetailClient project={project} allProjects={allProjects} />
    </>
  );
}
