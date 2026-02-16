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
    title: project.seo?.baslik || `${project.baslik} | SedMina`,
    description: project.seo?.aciklama || project.aciklama,
    keywords: project.seo?.anahtarKelimeler || [],
    openGraph: {
      title: project.seo?.baslik || `${project.baslik} | SedMina`,
      description: project.seo?.aciklama || project.aciklama,
      ...(project.gorselUrl && { images: [project.gorselUrl] }),
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
