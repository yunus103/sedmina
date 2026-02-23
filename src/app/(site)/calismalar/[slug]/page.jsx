import { sanityFetch } from "../../../../sanity/lib/fetch";
import {
  projectBySlugQuery,
  allProjectsQuery,
} from "../../../../sanity/lib/queries";
import ProjectDetailClient from "./ProjectDetailClient";
import JsonLd from "../../../../components/seo/JsonLd";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: project } = await sanityFetch(projectBySlugQuery, { slug });

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
  const { slug } = await params;
  const [projectRes, allProjectsRes] = await Promise.all([
    sanityFetch(projectBySlugQuery, { slug }),
    sanityFetch(allProjectsQuery),
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
