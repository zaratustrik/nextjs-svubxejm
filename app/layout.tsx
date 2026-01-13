import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { Providers } from './providers';
import { LanguageProvider } from '../context/LanguageContext';
// Импортируем Header и Footer сюда
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CryptoNotary - Blockchain Proof',
  description: 'Secure your files on Ethereum',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Providers>
            {/* ШАПКА ТУТ (один раз для всего сайта) */}
            <Header />
            
            {children}
            
            {/* ПОДВАЛ ТУТ (один раз для всего сайта) */}
            <Footer />
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}