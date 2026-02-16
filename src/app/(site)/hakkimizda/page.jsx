import AboutClient from "./AboutClient";
import { sanityFetch } from "../../../sanity/lib/fetch";
import { aboutPageQuery } from "../../../sanity/lib/queries";

export async function generateMetadata() {
  const { data } = await sanityFetch(aboutPageQuery);
  return {
    title: data?.seo?.baslik || "Hakkımızda | SedMina",
    description: data?.seo?.aciklama || "SedMina hakkında bilgi edinin.",
    keywords: data?.seo?.anahtarKelimeler || [],
    openGraph: {
      title: data?.seo?.baslik || "Hakkımızda | SedMina",
      description: data?.seo?.aciklama || "SedMina hakkında bilgi edinin.",
      ...(data?.seo?.ogGorselUrl && { images: [data.seo.ogGorselUrl] }),
    },
  };
}

export default async function HakkimizdaPage() {
  const { data } = await sanityFetch(aboutPageQuery);
  return <AboutClient aboutData={data} />;
}
