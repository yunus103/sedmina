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

export const metadata = {
  metadataBase: new URL("https://sedmina.com"),
  title: {
    default: "SedMina | Dijital Çözüm Ortağınız",
    template: "%s | SedMina",
  },
  description:
    "Web yazılım, mobil uygulama, sosyal medya yönetimi ve dijital pazarlama çözümleriyle markanızı geleceğe taşıyın.",
  keywords: [
    "Web Tasarım",
    "Web Yazılım",
    "Mobil Uygulama",
    "SEO",
    "Dijital Pazarlama",
    "Sosyal Medya Yönetimi",
    "SedMina",
    "İstanbul Ajans",
  ],
  authors: [{ name: "SedMina", url: "https://sedmina.com" }],
  creator: "SedMina",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://sedmina.com",
    title: "SedMina | Dijital Çözüm Ortağınız",
    description:
      "Web yazılım, mobil uygulama ve dijital pazarlama çözümleriyle markanızı geleceğe taşıyın.",
    siteName: "SedMina",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SedMina Dijital Ajans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SedMina | Dijital Çözüm Ortağınız",
    description:
      "Web yazılım, mobil uygulama ve dijital pazarlama çözümleriyle markanızı geleceğe taşıyın.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-background text-text-primary antialiased selection:bg-primary-500 selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
