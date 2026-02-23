import ServicesClient from "./ServicesClient";
import { sanityFetch } from "../../../sanity/lib/fetch";
import { allServicesQuery } from "../../../sanity/lib/queries";

export const metadata = {
  title: "Hizmetlerimiz",
  description:
    "Kurumsal web tasarım, e-ticaret, SEO ve sosyal medya yönetimi hizmetlerimizle işletmenize değer katıyoruz.",
};

export default async function ServicesPage() {
  const { data: services } = await sanityFetch(allServicesQuery);
  return <ServicesClient services={services} />;
}
