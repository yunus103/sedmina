import ContactClient from "./ContactClient";
import { sanityFetch } from "../../../sanity/lib/fetch";
import {
  contactPageQuery,
  siteSettingsQuery,
} from "../../../sanity/lib/queries";

export async function generateMetadata() {
  const { data } = await sanityFetch(contactPageQuery);
  return {
    title: data?.seo?.baslik || "İletişim",
    description:
      data?.seo?.aciklama ||
      "Projenizi konuşmak ve teklif almak için bizimle iletişime geçin. İstanbul, Türkiye.",
    keywords: data?.seo?.anahtarKelimeler || [],
  };
}

export default async function ContactPage() {
  const [contactRes, settingsRes] = await Promise.all([
    sanityFetch(contactPageQuery),
    sanityFetch(siteSettingsQuery),
  ]);

  return (
    <ContactClient
      contactData={contactRes.data}
      siteSettings={settingsRes.data}
    />
  );
}
