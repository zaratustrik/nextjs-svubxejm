'use client';

import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useLanguage } from '../context/LanguageContext';

export const Header = () => {
  const { t, toggleLang, lang } = useLanguage();
  const [isCopied, setIsCopied] = useState(false);

  // ВСТАВЬ СЮДА СВОЙ КОШЕЛЕК! 👇
  const DONATION_ADDRESS = '0x1e5433909b8Daa6414af528cDfac4FA162A33Aa2'; 

  const handleDonate = () => {
    navigator.clipboard.writeText(DONATION_ADDRESS);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Через 2 секунды возвращаем текст обратно
  };

  return (
    <header className="p-4 flex justify-between items-center max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 text-white font-bold p-2 rounded-lg">CN</div>
        <span className="font-bold text-xl hidden sm:block">CryptoNotary</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Кнопка Donate */}
        <button
          onClick={handleDonate}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
            ${isCopied 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-100'}
          `}
        >
          {isCopied ? (
            <span>✅ {t('copied')}</span>
          ) : (
            <>
              <span>💖 {t('donate')}</span>
            </>
          )}
        </button>

        {/* Переключатель языка */}
        <button 
          onClick={toggleLang}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 font-bold text-sm text-gray-600 transition-colors"
        >
          {lang === 'ru' ? 'RU' : 'EN'}
        </button>

        {/* Кнопка кошелька */}
        <ConnectButton showBalance={false} accountStatus="address" />
      </div>
    </header>
  );
};