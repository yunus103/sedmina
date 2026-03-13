import ProjectsClient from "./ProjectsClient";
import { sanityFetch } from "../../../../sanity/lib/fetch";
import { allProjectsQuery, projelerSayfasiQuery } from "../../../../sanity/lib/queries";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { data: pageData } = await sanityFetch(projelerSayfasiQuery, { locale });
  const seo = pageData?.seo || {};

  return {
    title: seo.baslik || pageData?.baslik || "Çalışmalar",
    description:
      seo.aciklama ||
      pageData?.aciklama ||
      "SedMina olarak hayata geçirdiğimiz web tasarım, dijital pazarlama ve yazılım projelerini inceleyin.",
  };
}

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  const { data: projects } = await sanityFetch(allProjectsQuery, { locale });
  const { data: pageData } = await sanityFetch(projelerSayfasiQuery, { locale });
  return <ProjectsClient projects={projects} pageData={pageData} />;
}
