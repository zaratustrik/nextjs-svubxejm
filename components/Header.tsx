'use client';

import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useLanguage } from '../context/LanguageContext';

export const Header = () => {
  const { t, toggleLang, lang } = useLanguage();
  const [isCopied, setIsCopied] = useState(false);

  const DONATION_ADDRESS = '0x0000000000000000000000000000000000000000'; 

  const handleDonate = () => {
    navigator.clipboard.writeText(DONATION_ADDRESS);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    // 1. Внешняя оболочка: Фиксирована, прозрачная, на всю ширину
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/50">
      
      {/* 2. Внутренний контейнер: Ограничивает ширину, чтобы кнопки не улетали */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Логотип */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
          <div className="bg-blue-600 text-white font-bold p-2 rounded-lg shadow-md shadow-blue-500/20">
            CN
          </div>
          <span className="font-bold text-xl hidden sm:block text-slate-900 tracking-tight">
            CryptoNotary
          </span>
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-3 md:gap-4">
          
          <button
            onClick={handleDonate}
            className={`
              hidden md:flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200
              ${isCopied 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-100 active:scale-95'}
            `}
          >
            {isCopied ? <span>✅ {t('copied')}</span> : <span>💖 {t('donate')}</span>}
          </button>

          <button 
            onClick={toggleLang}
            className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 font-bold text-xs text-slate-600 transition-colors"
          >
            {lang === 'ru' ? 'RU' : 'EN'}
          </button>

          <div className="shadow-lg shadow-blue-500/10 rounded-xl">
             <ConnectButton showBalance={false} accountStatus="address" />
          </div>
        </div>

      </div>
    </header>
  );
};