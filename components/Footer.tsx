'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    // bg-white/30 — очень прозрачный белый. Граница еле заметна.
    <footer className="w-full py-8 text-center mt-auto border-t border-slate-50 bg-white/30 backdrop-blur-sm">
      <div className="flex flex-col gap-3 text-slate-400 text-sm">
        <p>
          © {new Date().getFullYear()} CryptoNotary. {t('footerRights')}
        </p>
        
        <div className="flex justify-center gap-6 text-xs md:text-sm">
            <Link href="/terms" className="hover:text-blue-600 transition-colors duration-200 underline decoration-slate-300 underline-offset-4 hover:decoration-blue-400">
              {t('footerTerms')}
            </Link>
            
            <Link href="/verify" className="hover:text-blue-600 transition-colors duration-200">
              Verify Certificate
            </Link>
        </div>
        
        <p className="opacity-60 text-[10px] uppercase tracking-wide mt-2">
          {t('builtWith')}
        </p>
      </div>
    </footer>
  );
};