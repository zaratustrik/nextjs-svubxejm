'use client';

import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useLanguage } from '../context/LanguageContext';

export const Header = () => {
  const { t, toggleLang, lang } = useLanguage();
  const [isCopied, setIsCopied] = useState(false);

  // 👇 ВСТАВЬ СЮДА СВОЙ КОШЕЛЕК
  const DONATION_ADDRESS = '0x0000000000000000000000000000000000000000'; 

  const handleDonate = () => {
    navigator.clipboard.writeText(DONATION_ADDRESS);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    // Изменено: fixed, backdrop-blur и bg-white/70 для эффекта стекла
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-white/70 backdrop-blur-md border-b border-white/20 transition-all">
      
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
        {/* Кнопка Donate */}
        <button
          onClick={handleDonate}
          className={`
            hidden md:flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm
            ${isCopied 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-100 active:scale-95'}
          `}
        >
          {isCopied ? (
            <span>✅ {t('copied')}</span>
          ) : (
            <>
              {/* Иконка сердца текстом или SVG */}
              <span>💖 {t('donate')}</span>
            </>
          )}
        </button>

        {/* Язык */}
        <button 
          onClick={toggleLang}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 font-bold text-xs text-slate-600 transition-colors shadow-sm"
        >
          {lang === 'ru' ? 'RU' : 'EN'}
        </button>

        {/* Connect Wallet */}
        <div className="shadow-lg shadow-blue-500/10 rounded-xl">
            <ConnectButton showBalance={false} accountStatus="address" label="Connect Wallet" />
        </div>
      </div>
    </header>
  );
};