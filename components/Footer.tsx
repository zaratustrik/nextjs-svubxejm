'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-8 text-center text-gray-400 text-sm mt-12 border-t border-gray-100">
      <div className="flex flex-col gap-2">
        <p>
          © {new Date().getFullYear()} CryptoNotary. {t('footerRights')}
        </p>
        
        <Link href="/terms" className="hover:text-blue-500 hover:underline transition-colors">
          {t('footerTerms')}
        </Link>
        
        <p className="opacity-50 text-xs mt-2">
          {t('builtWith')}
        </p>
      </div>
    </footer>
  );
};