'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-8 text-center bg-white border-t border-slate-100 mt-auto relative z-10">
      <div className="flex flex-col gap-3 text-slate-400 text-sm">
        <p>
          © {new Date().getFullYear()} CryptoNotary. {t('footerRights')}
        </p>
        
        <Link href="/terms" className="hover:text-blue-500 transition-colors duration-200">
          {t('footerTerms')}
        </Link>
        
        <p className="opacity-60 text-[10px] uppercase tracking-wide mt-2">
          {t('builtWith')}
        </p>
      </div>
    </footer>
  );
};