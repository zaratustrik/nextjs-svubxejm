import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { Providers } from './providers';
import { LanguageProvider } from '../context/LanguageContext';
// Импортируем ваши компоненты
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
      <body 
        className={`${inter.className} min-h-screen flex flex-col bg-[#F8FAFC] relative overflow-x-hidden selection:bg-blue-100 selection:text-blue-900`}
      >
        {/* === АНИМИРОВАННЫЙ ФОН (ПЯТНА) === */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          {/* Синее пятно слева сверху */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[120px] animate-pulse" />
          {/* Фиолетовое пятно справа */}
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 rounded-full blur-[100px]" />
          {/* Индиго пятно снизу */}
          <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-400/10 rounded-full blur-[120px]" />
        </div>

        <LanguageProvider>
          <Providers>
            
            {/* ШАПКА (Fixed/Sticky будет работать внутри, так как она fixed в самом компоненте) */}
            <Header />
            
            {/* ОСНОВНОЙ КОНТЕНТ (Растягивается, чтобы прижать футер) */}
            {/* pt-24 добавлен, чтобы контент не заезжал под фиксированную шапку */}
            <main className="flex-grow pt-24 px-4 flex flex-col items-center">
              {children}
            </main>
            
            {/* ПОДВАЛ */}
            <Footer />

          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}