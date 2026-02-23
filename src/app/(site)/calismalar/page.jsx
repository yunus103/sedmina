import ProjectsClient from "./ProjectsClient";
import { sanityFetch } from "../../../sanity/lib/fetch";
import { allProjectsQuery } from "../../../sanity/lib/queries";

export const metadata = {
  title: "Çalışmalar",
  description:
    "SedMina olarak hayata geçirdiğimiz web tasarım, dijital pazarlama ve yazılım projelerini inceleyin.",
};

export default async function ProjectsPage() {
  const { data: projects } = await sanityFetch(allProjectsQuery);
  return <ProjectsClient projects={projects} />;
}
