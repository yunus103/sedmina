import AboutClient from "./AboutClient";
import { sanityFetch } from "../../../../sanity/lib/fetch";
import { aboutPageQuery } from "../../../../sanity/lib/queries";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { data } = await sanityFetch(aboutPageQuery, { locale });
  return {
    title: data?.seo?.baslik || "Hakkımızda",
    description: data?.seo?.aciklama || "SedMina hakkında bilgi edinin.",
    keywords: data?.seo?.anahtarKelimeler || [],
    openGraph: {
      title: data?.seo?.baslik || "Hakkımızda",
      description: data?.seo?.aciklama || "SedMina hakkında bilgi edinin.",
      ...(data?.seo?.ogGorselUrl && { images: [data.seo.ogGorselUrl] }),
    },
  };
}

export default async function HakkimizdaPage({ params }) {
  const { locale } = await params;
  const { data } = await sanityFetch(aboutPageQuery, { locale });
  return <AboutClient aboutData={data} />;
}
