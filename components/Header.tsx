'use client';

import React from 'react';
import Link from 'next/link'; // <--- ВАЖНЫЙ ИМПОРТ
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useLanguage } from '../context/LanguageContext'; 

export const Header = () => {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Логотип -> ведет на Главную */}
        <Link href="/" className="flex items-center gap-3 select-none hover:opacity-80 transition">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 font-outfit">
            CN
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight font-outfit hidden sm:block">
            CryptoNotary
          </span>
        </Link>

        {/* Правая часть */}
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {/* Ссылка на якорь (блок "Как это работает" на главной) */}
            <Link href="/#features" className="hover:text-blue-600 transition-colors">
              {t('navHow')}
            </Link>
            
            {/* Ссылка на страницу Проверки */}
            <Link href="/verify" className="hover:text-blue-600 transition-colors">
              {t('navCheck')}
            </Link>
          </nav>

          <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

          <button 
            onClick={toggleLang}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center shadow-sm"
          >
            {lang === 'ru' ? 'EN' : 'RU'}
          </button>

          <ConnectButton 
            accountStatus="avatar" 
            chainStatus="none" 
            showBalance={false} 
          />
        </div>
      </div>
    </header>
  );
};