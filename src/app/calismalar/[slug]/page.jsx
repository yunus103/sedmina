import projectsData from "../../../data/projects.json";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
