'use client'; 

import React from 'react';
import FileHasher from './FileHasher'; 
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-transparent flex flex-col items-center pt-32 pb-12 px-4">
      
      <div className="text-center max-w-4xl mx-auto mb-12 space-y-6">
        <h1 className="font-outfit text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
          {t('heroTitle')} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            {t('heroSubtitle')}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          {t('heroDesc')}
        </p>
      </div>

      <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-900/10 border border-white/50 p-8 relative z-10 mb-24">
        <FileHasher />
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-24">
        
        <div className="bg-white/60 hover:bg-white/80 transition p-8 rounded-3xl border border-white/50 shadow-lg shadow-gray-200/50 group">
          <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
            🎨
          </div>
          <h3 className="font-outfit font-bold text-xl text-gray-900 mb-3">{t('caseDesignTitle')}</h3>
          <p className="text-gray-500 leading-relaxed text-sm">
            {t('caseDesignDesc')}
          </p>
        </div>

        <div className="bg-white/60 hover:bg-white/80 transition p-8 rounded-3xl border border-white/50 shadow-lg shadow-gray-200/50 group">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
            ⚖️
          </div>
          <h3 className="font-outfit font-bold text-xl text-gray-900 mb-3">{t('caseLawTitle')}</h3>
          <p className="text-gray-500 leading-relaxed text-sm">
            {t('caseLawDesc')}
          </p>
        </div>

        <div className="bg-white/60 hover:bg-white/80 transition p-8 rounded-3xl border border-white/50 shadow-lg shadow-gray-200/50 group">
          <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
            🎵
          </div>
          <h3 className="font-outfit font-bold text-xl text-gray-900 mb-3">{t('caseMusicTitle')}</h3>
          <p className="text-gray-500 leading-relaxed text-sm">
            {t('caseMusicDesc')}
          </p>
        </div>

      </div>

      <div className="text-center opacity-60 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">{t('poweredBy')}</p>
        <div className="flex gap-8 items-center justify-center grayscale opacity-70">
           <span className="font-bold text-xl">Ethereum</span>
           <span className="font-bold text-xl">Polygon</span>
           <span className="font-bold text-xl">IPFS</span>
        </div>
      </div>

    </main>
  );
}