import { sanityFetch } from "../../../../sanity/lib/fetch";
import {
  serviceBySlugQuery,
  allServicesQuery,
} from "../../../../sanity/lib/queries";
import ServiceDetailClient from "./ServiceDetailClient";
import JsonLd from "../../../../components/seo/JsonLd";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: service } = await sanityFetch(serviceBySlugQuery, { slug });

  if (!service) {
    return {
      title: "Hizmet Bulunamadı",
      description: "Aradığınız hizmet bulunamadı.",
    };
  }

  return {
    title: service.seo?.baslik || `${service.baslik} | SedMina`,
    description: service.seo?.aciklama || service.altBaslik || service.aciklama,
    keywords: service.seo?.anahtarKelimeler || [],
    openGraph: {
      title: service.seo?.baslik || `${service.baslik} | SedMina`,
      description: service.seo?.aciklama || service.aciklama,
      ...(service.gorselUrl && { images: [service.gorselUrl] }),
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const [serviceRes, allServicesRes] = await Promise.all([
    sanityFetch(serviceBySlugQuery, { slug }),
    sanityFetch(allServicesQuery),
  ]);

  const service = serviceRes.data;
  const allServices = allServicesRes.data;

  if (!service) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.baslik,
    description: service.aciklama,
    provider: {
      "@type": "Organization",
      name: "SedMina",
    },
    areaServed: "TR",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServiceDetailClient service={service} allServices={allServices} />
    </>
  );
}
