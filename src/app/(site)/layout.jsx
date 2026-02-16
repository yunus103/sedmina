import Layout from "../../components/layout/Layout";
import JsonLd from "../../components/seo/JsonLd";
import { sanityFetch } from "../../sanity/lib/fetch";
import { siteSettingsQuery } from "../../sanity/lib/queries";

export default async function SiteLayout({ children }) {
  const { data: siteSettings } = await sanityFetch(siteSettingsQuery);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings?.sirketAdi || "SedMina",
    url: "https://sedmina.com",
    logo: "https://sedmina.com/logo.png",
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
      <Layout siteSettings={siteSettings}>{children}</Layout>
    </>
  );
}
