import { ThemeProvider } from '../context/ThemeContext';
import './globals.css';
import { Inter, Outfit } from 'next/font/google';
import Layout from '../components/layout/Layout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata = {
  title: 'SedMina | Dijital Çözüm Ortağınız',
  description: 'Web yazılım, mobil uygulama ve dijital pazarlama çözümleri.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="bg-background text-text-primary antialiased selection:bg-primary-500 selection:text-white">
        <ThemeProvider>
          <Layout>
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
