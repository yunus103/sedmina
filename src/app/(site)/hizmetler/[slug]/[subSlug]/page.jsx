import { sanityFetch } from "../../../../../sanity/lib/fetch";
import { subServiceBySlugQuery } from "../../../../../sanity/lib/queries";
import ServiceDetailClient from "../ServiceDetailClient";
import JsonLd from "../../../../../components/seo/JsonLd";

export async function generateMetadata({ params }) {
  const { slug, subSlug } = await params;
  const { data: service } = await sanityFetch(subServiceBySlugQuery, {
    slug,
    subSlug,
  });

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

export default async function SubServiceDetailPage({ params }) {
  const { slug, subSlug } = await params;
  const { data: service } = await sanityFetch(subServiceBySlugQuery, {
    slug,
    subSlug,
  });

  if (!service) return null;

  const parentService = service.ustHizmet;
  // Use siblings for prev/next navigation
  const allServices = parentService?.altHizmetler || [];

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
    isRelatedTo: parentService
      ? {
          "@type": "Service",
          name: parentService.baslik,
          url: `https://sedmina.com/hizmetler/${parentService.slug}`,
        }
      : undefined,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServiceDetailClient
        service={service}
        allServices={allServices}
        parentService={parentService}
      />
    </>
  );
}
