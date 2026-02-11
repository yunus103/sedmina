import servicesData from "../../../data/services";
import ServiceDetailClient from "./ServiceDetailClient";


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData.services.find((s) => s.id === slug);

  if (!service) {
    return {
      title: "Hizmet Bulunamadı",
      description: "Aradığınız hizmet bulunamadı.",
    };
  }

  return {
    title: `${service.title} | SedMina`,
    description: service.subtitle || service.description,
    openGraph: {
      title: `${service.title} | SedMina`,
      description: service.description,
      images: [service.image],
    },
  };
}

export async function generateStaticParams() {
  return servicesData.services.map((service) => ({
    slug: service.id,
  }));
}

import JsonLd from "../../../components/seo/JsonLd";

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = servicesData.services.find((s) => s.id === slug);

  if (!service) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "SedMina",
    },
    areaServed: "TR",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServiceDetailClient slug={slug} />
    </>
  );
}
