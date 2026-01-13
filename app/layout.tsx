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
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-slate-900 relative selection:bg-blue-100 selection:text-blue-900`}>
        
        {/* === ФОН (ГЛАВНОЕ ИЗМЕНЕНИЕ) === */}
        {/* 1. Основной фон белый (указан в className выше: bg-white) */}
        
        {/* 2. Свечение сверху (Aurora Effect) как на сайте */}
        {/* Это большой градиент, который идет от светло-голубого к белому сверху вниз */}
        <div className="fixed top-0 inset-x-0 h-[600px] -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-indigo-50/30 to-white blur-3xl opacity-80" />
          
          {/* Дополнительное пятно по центру для глубины */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/40 rounded-[100%] blur-[80px]" />
        </div>

        <LanguageProvider>
          <Providers>
            
            <Header />
            
            {/* main: pt-28 (отступ сверху), чтобы не перекрывалось хедером */}
            <main className="flex-grow pt-28 px-4 w-full max-w-7xl mx-auto flex flex-col items-center relative z-0">
              {children}
            </main>
            
            <Footer />

          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}