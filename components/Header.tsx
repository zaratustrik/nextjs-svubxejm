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
    // ИЗМЕНЕНИЯ ЗДЕСЬ:
    // bg-white/10 -> очень прозрачный белый (всего 10%)
    // backdrop-blur-md -> размывает всё, что проплывает под хедером (эффект стекла)
    // border-white/20 -> граница едва заметна
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 transition-all duration-300">
      
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex justify-between items-center">
        
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
        <div className="flex items-center gap-3">
          
          <button
            onClick={handleDonate}
            className={`
              hidden md:flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200
              ${isCopied 
                ? 'bg-green-100/80 text-green-700 border border-green-200' 
                : 'bg-white/40 text-pink-600 hover:bg-pink-50 border border-pink-100/50 backdrop-blur-sm active:scale-95'}
            `}
          >
            {isCopied ? <span>✅ {t('copied')}</span> : <span>💖 {t('donate')}</span>}
          </button>

          {/* Кнопка языка тоже стала чуть прозрачнее */}
          <button 
            onClick={toggleLang}
            className="w-10 h-10 rounded-full bg-white/40 border border-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/60 font-bold text-xs text-slate-600 transition-colors shadow-sm"
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