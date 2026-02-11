import servicesData from "../../../data/services";
import ServiceDetailClient from "./ServiceDetailClient";

export async function generateStaticParams() {
  return servicesData.services.map((service) => ({
    slug: service.id,
  }));
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  return <ServiceDetailClient slug={slug} />;
}
