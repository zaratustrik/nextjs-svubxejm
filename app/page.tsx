'use client';

import React from 'react';
// Убрали импорт Header, оставили только Footer (хотя Footer тоже лучше в layout, но пока пусть тут, если не дублируется)
// А нет, давай уберем и Footer отсюда, если он есть в Layout!
// Давай сделаем чисто: в page.tsx только уникальный контент.

import { FileHasher } from '../components/FileHasher';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900 font-sans flex flex-col">
      
      {/* HEADER УДАЛЕН ОТСЮДА (он будет в layout) */}

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Заголовок (Hero Section) */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <div className="inline-block animate-pulse bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            New: Ethereum & Polygon Support
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
            {t('heroTitle')} <br />
            <span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {t('heroSubtitle')}
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t('heroDesc')}
          </p>
        </div>

        {/* Главный компонент (Загрузка файла) */}
        <div className="w-full max-w-3xl mb-24 z-10">
          <FileHasher />
        </div>

        {/* Блок преимуществ */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4">
          <FeatureCard 
            icon="🎨" 
            title={t('caseDesignTitle')} 
            desc={t('caseDesignDesc')} 
          />
          <FeatureCard 
            icon="⚖️" 
            title={t('caseLawTitle')} 
            desc={t('caseLawDesc')} 
          />
          <FeatureCard 
            icon="🎵" 
            title={t('caseMusicTitle')} 
            desc={t('caseMusicDesc')} 
          />
        </div>
        
        {/* Инструкция */}
        <div className="mt-24 w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">{t('navHow')}</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Step number="1" title={t('step1Title')} desc={t('step1Desc')} />
            <Step number="2" title={t('step2Title')} desc={t('step2Desc')} />
            <Step number="3" title={t('step3Title')} desc={t('step3Desc')} />
          </div>
        </div>

      </main>

      {/* FOOTER тоже лучше убрать, если он дублируется. 
          Если Footer в layout.tsx уже есть - удали строчку ниже. 
          Если нет - оставь. Для надежности я пока оставлю тут импорт Footer в layout.tsx */}
    </div>
  );
}

// Маленькие компоненты
function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-lg shadow-blue-200">
        {number}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-xs">{desc}</p>
    </div>
  );
}