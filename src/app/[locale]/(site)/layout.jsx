import Layout from "../../../components/layout/Layout";
import JsonLd from "../../../components/seo/JsonLd";
import { sanityFetch } from "../../../sanity/lib/fetch";
import { siteSettingsQuery, allServicesQuery } from "../../../sanity/lib/queries";

import { setRequestLocale } from 'next-intl/server';

export default async function SiteLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [siteSettingsRes, allServicesRes] = await Promise.all([
    sanityFetch(siteSettingsQuery, { locale }),
    sanityFetch(allServicesQuery, { locale }),
  ]);

  const siteSettings = siteSettingsRes.data;
  const allServices = allServicesRes.data;

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings?.sirketAdi || "SedMina",
    url: "https://sedminadijital.com",
    logo: siteSettings?.logoKoyuUrl || "https://sedminadijital.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteSettings?.telefon || "",
      contactType: "customer service",
    },
    sameAs: [
      siteSettings?.linkedin,
      siteSettings?.twitter,
      siteSettings?.instagram,
      siteSettings?.facebook,
    ].filter(Boolean),
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <Layout siteSettings={siteSettings} allServices={allServices}>
        {children}
      </Layout>
    </>
  );
}
