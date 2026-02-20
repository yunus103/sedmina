import { sanityFetch } from "../sanity/lib/fetch";
import { sitemapQuery } from "../sanity/lib/queries";

const BASE_URL = "https://sedmina.com";

export default async function sitemap() {
  const { data } = await sanityFetch(sitemapQuery);

  // Static routes
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calismalar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic service routes
  const serviceRoutes = (data?.services || []).map((s) => ({
    url: `${BASE_URL}/hizmetler/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic project routes
  const projectRoutes = (data?.projects || []).map((p) => ({
    url: `${BASE_URL}/calismalar/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic blog routes
  const blogRoutes = (data?.posts || []).map((b) => ({
    url: `${BASE_URL}/${b.slug}`,
    lastModified: b.tarih ? new Date(b.tarih) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
