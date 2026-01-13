import './globals.css';
import { Providers } from './providers';
import { Header } from '../components/Header'; 
import { LanguageProvider } from '../context/LanguageContext';
import { Inter, Outfit } from 'next/font/google';
// 1. ДОБАВЛЕН ИМПОРТ LINK
import Link from 'next/link'; 

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata = {
  title: 'CryptoNotary',
  description: 'Web3 Notary Service',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-700 relative overflow-x-hidden`}>
        
        {/* Фоновые пятна (Web3 Style) */}
        <div className="fixed inset-0 -z-10 bg-gray-50">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>

        <Providers>
          <LanguageProvider>
            <Header />
            
            {/* Основной контент */}
            {children}

            {/* 2. ДОБАВЛЕН ФУТЕР */}
            <footer className="py-8 text-center text-gray-400 text-sm relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-4">
                <p>© {new Date().getFullYear()} CryptoNotary</p>
                
                <Link href="/terms" className="hover:text-blue-600 transition underline underline-offset-4">
                  Условия использования
                </Link>
              </div>
              <p className="opacity-50 text-xs">Built with Next.js & Ethereum</p>
            </footer>

          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}