import { sanityFetch } from "../../../../../../sanity/lib/fetch";
import { subServiceBySlugQuery, allServicesQuery } from "../../../../../../sanity/lib/queries";
import ServiceDetailClient from "../ServiceDetailClient";
import JsonLd from "../../../../../../components/seo/JsonLd";
import { setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  const locales = ["tr", "en"];
  const paths = [];
  for (const locale of locales) {
    const res = await sanityFetch(allServicesQuery, { locale });
    const services = res.data || [];
    services.forEach((parentService) => {
      const subServices = parentService.altHizmetler || [];
      subServices.forEach((subService) => {
        if (parentService.slug && subService.slug) {
          paths.push({
            locale,
            slug: parentService.slug,
            subSlug: subService.slug,
          });
        }
      });
    });
  }
  return paths;
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { slug, subSlug } = await params;
  const { data: service } = await sanityFetch(subServiceBySlugQuery, {
    locale,
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
    title: service.seo?.baslik || service.baslik,
    description: service.seo?.aciklama || service.aciklama,
    keywords: service.seo?.anahtarKelimeler || [],
    openGraph: {
      title: service.seo?.baslik || service.baslik,
      description: service.seo?.aciklama || service.aciklama,
      images: [
        {
          url: service.seo?.ogGorselUrl || service.gorselUrl,
          width: 1200,
          height: 630,
          alt: service.seo?.baslik || service.baslik,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.seo?.baslik || service.baslik,
      description: service.seo?.aciklama || service.aciklama,
      images: [service.seo?.ogGorselUrl || service.gorselUrl],
    },
  };
}

export default async function SubServiceDetailPage({ params }) {
  const { locale } = await params;
  const { slug, subSlug } = await params;
  setRequestLocale(locale);

  const { data: service } = await sanityFetch(subServiceBySlugQuery, {
    locale,
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
          url: `https://sedminadijital.com/hizmetler/${parentService.slug}`,
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
