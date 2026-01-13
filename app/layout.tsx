import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { Providers } from './providers';
import { LanguageProvider } from '../context/LanguageContext';
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
      <body className={`${inter.className} min-h-screen flex flex-col relative text-slate-900 bg-white`}>
        
        {/* === ГЛОБАЛЬНЫЙ ФОН (Aurora) === */}
        {/* Он fixed на весь экран. z-[-1] держит его позади всего. */}
        <div className="fixed inset-0 -z-10 w-full h-full bg-white overflow-hidden pointer-events-none">
          
          {/* Градиент сверху вниз */}
          <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-blue-50/80 via-indigo-50/20 to-transparent opacity-90" />
          
          {/* Цветные пятна по бокам */}
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-blue-400/10 rounded-full blur-[120px]" />
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-purple-400/10 rounded-full blur-[120px]" />
        </div>

        <LanguageProvider>
          <Providers>
            
            <Header />
            
            {/* MAIN КОНТЕНТ:
                - pt-24: отступ сверху под хедер
                - max-w-7xl mx-auto: контент держится центра, а фон (сзади) — во весь экран
                - bg-transparent: чтобы сквозь контент было видно градиент
            */}
            <main className="flex-grow pt-24 px-4 w-full max-w-7xl mx-auto flex flex-col items-center bg-transparent relative z-0">
              {children}
            </main>
            
            <Footer />

          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}