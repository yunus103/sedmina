import "../globals.css";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "../../context/ThemeContext";

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
  title: "İletişim Kanalları | SedMina Dijital",
  description: "SedMina Dijital Ajans iletişim kanalları ve sosyal medya hesapları.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function LinksLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="dark bg-[#0a0a0a] text-white antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
