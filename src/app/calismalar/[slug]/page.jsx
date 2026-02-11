import projectsData from "../../../data/projects.json";
import ProjectDetailClient from "./ProjectDetailClient";


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Proje Bulunamadı",
      description: "Aradığınız proje bulunamadı.",
    };
  }

  return {
    title: `${project.title} | SedMina`,
    description: project.description,
    openGraph: {
      title: `${project.title} | SedMina`,
      description: project.description,
      images: [project.image],
    },
  };
}

export async function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    slug: project.id,
  }));
}

import JsonLd from "../../../components/seo/JsonLd";

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.id === slug);

  if (!project) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image,
    creator: {
      "@type": "Organization",
      name: "SedMina",
    },
    dateCreated: project.year,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProjectDetailClient slug={slug} />
    </>
  );
}
