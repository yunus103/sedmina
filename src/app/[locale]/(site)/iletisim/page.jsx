import ContactClient from "./ContactClient";
import { sanityFetch } from "../../../../sanity/lib/fetch";
import {
  contactPageQuery,
  siteSettingsQuery,
} from "../../../../sanity/lib/queries";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { data } = await sanityFetch(contactPageQuery, { locale });
  return {
    title: data?.seo?.baslik || "İletişim",
    description:
      data?.seo?.aciklama ||
      "Projenizi konuşmak ve teklif almak için bizimle iletişime geçin. İstanbul, Türkiye.",
    keywords: data?.seo?.anahtarKelimeler || [],
    alternates: {
      canonical: locale === "en" ? "/en/contact" : "/tr/iletisim",
      languages: {
        tr: "/tr/iletisim",
        en: "/en/contact",
        "x-default": "/tr/iletisim",
      },
    },
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const [contactRes, settingsRes] = await Promise.all([
    sanityFetch(contactPageQuery, { locale }),
    sanityFetch(siteSettingsQuery, { locale }),
  ]);

  return (
    <ContactClient
      contactData={contactRes.data}
      siteSettings={settingsRes.data}
    />
  );
}
