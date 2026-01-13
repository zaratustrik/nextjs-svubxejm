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
      {/* Важно: 
         - bg-[#F8FAFC]: очень светлый фон (не серый).
         - text-slate-900: темный текст.
         - relative: чтобы пятна позиционировались относительно body.
      */}
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 relative selection:bg-blue-100 selection:text-blue-900`}>
        
        {/* === ФОНОВЫЕ ПЯТНА (Fixed) === */}
        {/* Они лежат под всем контентом и не двигаются */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[120px]" />
           <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 rounded-full blur-[100px]" />
        </div>

        <LanguageProvider>
          <Providers>
            
            <Header />
            
            {/* Main растягивается (flex-grow) и имеет отступ сверху (pt-24), чтобы не заезжать под шапку */}
            <main className="flex-grow pt-28 px-4 w-full max-w-7xl mx-auto flex flex-col items-center">
              {children}
            </main>
            
            <Footer />

          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}