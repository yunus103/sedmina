import { sanityFetch } from "../sanity/lib/fetch";
import { sitemapQuery } from "../sanity/lib/queries";
import { routing } from "../i18n/routing";

const BASE_URL = "https://sedminadijital.com";

export default async function sitemap() {
  const { data } = await sanityFetch(sitemapQuery);
  const locales = routing.locales;

  // Static routes configuration
  const staticPathConfigs = [
    { key: "/", priority: 1, changeFrequency: "weekly" },
    { key: "/hakkimizda", priority: 0.8, changeFrequency: "monthly" },
    { key: "/hizmetler", priority: 0.9, changeFrequency: "weekly" },
    { key: "/calismalar", priority: 0.9, changeFrequency: "weekly" },
    { key: "/blog", priority: 0.9, changeFrequency: "daily" },
    { key: "/iletisim", priority: 0.7, changeFrequency: "monthly" },
  ];

  const staticRoutes = [];
  staticPathConfigs.forEach((config) => {
    locales.forEach((locale) => {
      const pathname = routing.pathnames[config.key];
      const localizedPath =
        typeof pathname === "string" ? pathname : pathname[locale];

      const url = `${BASE_URL}/${locale}${localizedPath === "/" ? "" : localizedPath}`;

      // Build alternates (hreflang) for each static page
      const languages = {};
      locales.forEach((l) => {
        const lp = typeof pathname === "string" ? pathname : pathname[l];
        languages[l] = `${BASE_URL}/${l}${lp === "/" ? "" : lp}`;
      });

      staticRoutes.push({
        url,
        lastModified: new Date(),
        changeFrequency: config.changeFrequency,
        priority: config.priority,
        alternates: {
          languages,
        },
      });
    });
  });

  // Dynamic service routes
  const serviceRoutes = (data?.services || []).map((s) => {
    const locale = s.language || "tr";
    const prefix = locale === "en" ? "/services" : "/hizmetler";
    return {
      url: `${BASE_URL}/${locale}${prefix}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  // Dynamic subservice routes
  const subServiceRoutes = (data?.subServices || []).map((s) => {
    const locale = s.language || "tr";
    const prefix = locale === "en" ? "/services" : "/hizmetler";
    return {
      url: `${BASE_URL}/${locale}${prefix}/${s.parentSlug}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  // Dynamic blog routes - Only for Turkish as requested
  const blogRoutes = (data?.posts || [])
    .filter((b) => (b.language || "tr") === "tr")
    .map((b) => {
      return {
        url: `${BASE_URL}/tr/blog/${b.slug}`,
        lastModified: b.tarih ? new Date(b.tarih) : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });

  // Projects (calismalar) are NOT listed as subpages in the sitemap currently
  // as per user request (only shown as cards on /tr/calismalar or /en/projects).

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...subServiceRoutes,
    ...blogRoutes,
    {
      url: `${BASE_URL}/iletisim-kanallari`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }
  ];
}
