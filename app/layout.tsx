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
      <body className={`${inter.className} min-h-screen flex flex-col relative text-slate-900`}>
        
        {/* === ФОН (Aurora Background) === */}
        {/* Это точная копия фона: белый с мягким голубым градиентом сверху */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white">
          <div className="absolute top-0 right-0 -z-10 w-[50%] h-[500px] bg-blue-100/40 blur-[100px] rounded-full mix-blend-multiply opacity-70 animate-blob"></div>
          <div className="absolute top-0 left-0 -z-10 w-[50%] h-[500px] bg-purple-100/40 blur-[100px] rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-[-20%] left-[20%] -z-10 w-[60%] h-[500px] bg-indigo-50/50 blur-[100px] rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <LanguageProvider>
          <Providers>
            
            <Header />
            
            {/* Main Container: pt-24 (отступ для хедера) + центровка */}
            <main className="flex-grow pt-24 px-4 w-full max-w-7xl mx-auto flex flex-col items-center">
              {children}
            </main>
            
            <Footer />

          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}