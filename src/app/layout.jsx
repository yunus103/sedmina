import { ThemeProvider } from "../context/ThemeContext";
import "./globals.css";
import { Inter, Outfit } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

import { sanityFetch } from "../sanity/lib/fetch";
import { siteSettingsQuery } from "../sanity/lib/queries";

export async function generateMetadata() {
  const settings = await sanityFetch(siteSettingsQuery).then((res) => res.data);

  return {
    metadataBase: new URL("https://sedminadijital.com"),
    title: {
      default:
        settings?.seo?.baslik ||
        "SedMina Dijital | Web Yazılım Web Tasarım Sosyal Medya Yönetimi SEO Reklamlar",
      template: "%s | SedMina Dijital",
    },
    description:
      settings?.seo?.aciklama ||
      "SedMina Dijital | Web Yazılım Web Tasarım Sosyal Medya Yönetimi SEO Reklamlar için bizimle iletişime geçiniz.",
    keywords: settings?.seo?.anahtarKelimeler || [
      "Web Tasarım",
      "Web Yazılım",
      "Mobil Uygulama",
      "SEO",
      "Dijital Pazarlama",
      "Sosyal Medya Yönetimi",
      "SedMina",
      "İstanbul Ajans",
    ],
    authors: [{ name: "SedMina", url: "https://sedminadijital.com" }],
    creator: "SedMina",
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: "https://sedminadijital.com",
      title:
        settings?.seo?.baslik ||
        "SedMina Dijital | Web Yazılım Web Tasarım Sosyal Medya Yönetimi SEO Reklamlar",
      description:
        settings?.seo?.aciklama ||
        "SedMina Dijital | Web Yazılım Web Tasarım Sosyal Medya Yönetimi SEO Reklamlar için bizimle iletişime geçiniz.",
      siteName: "SedMina",
      images: [
        {
          url: settings?.seo?.ogGorselUrl || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: settings?.seo?.baslik || "SedMina Dijital Ajans",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        settings?.seo?.baslik ||
        "SedMina Dijital | Web Yazılım Web Tasarım Sosyal Medya Yönetimi SEO Reklamlar",
      description:
        settings?.seo?.aciklama ||
        "SedMina Dijital | Web Yazılım Web Tasarım Sosyal Medya Yönetimi SEO Reklamlar için bizimle iletişime geçiniz.",
      images: [settings?.seo?.ogGorselUrl || "/og-image.jpg"],
      creator: "@sedmina",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "/",
    },
    manifest: "/manifest.json",
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-icon.png",
    },
    verification: {
      google: "eHOv3HWO3bg0DguiDM-fbpBxYivYh3BNOr1sT9apszc" || undefined,
    },
  };
}

import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-background text-text-primary antialiased selection:bg-primary-500 selection:text-white">
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
              },
            }}
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
