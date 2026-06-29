import ServicesClient from "./ServicesClient";
import { sanityFetch } from "../../../../sanity/lib/fetch";
import { allServicesQuery, hizmetlerSayfasiQuery } from "../../../../sanity/lib/queries";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { data: pageData } = await sanityFetch(hizmetlerSayfasiQuery, { locale });
  const seo = pageData?.seo || {};

  return {
    title: seo.baslik || pageData?.baslik || "Hizmetlerimiz",
    description:
      seo.aciklama ||
      pageData?.aciklama ||
      "Kurumsal web tasarım, e-ticaret, SEO ve sosyal medya yönetimi hizmetlerimizle işletmenize değer katıyoruz.",
    alternates: {
      canonical: locale === "en" ? "/en/services" : "/tr/hizmetler",
      languages: {
        tr: "/tr/hizmetler",
        en: "/en/services",
        "x-default": "/tr/hizmetler",
      },
    },
  };
}

import { setRequestLocale } from 'next-intl/server';

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [{ data: services }, { data: pageData }] = await Promise.all([
    sanityFetch(allServicesQuery, { locale }),
    sanityFetch(hizmetlerSayfasiQuery, { locale }),
  ]);

  return <ServicesClient services={services} pageData={pageData} />;
}
