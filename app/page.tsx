'use client';

import React from 'react';
import { FileHasher } from '../components/FileHasher';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    // ГЛАВНОЕ ИЗМЕНЕНИЕ:
    // Убрали bg-gradient и min-h-screen. 
    // Теперь это просто прозрачный контейнер для контента.
    <div className="w-full flex flex-col items-center justify-start font-sans">
      
      {/* Заголовок (Hero Section) */}
      <div className="text-center max-w-4xl mx-auto mb-16 space-y-6 animate-fade-in-up">
        
        {/* Бейдж */}
        <div className="inline-block bg-blue-100/80 backdrop-blur-sm text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-blue-200 shadow-sm">
          New: Ethereum & Polygon Support
        </div>

        {/* H1 Заголовок */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {t('heroTitle')} <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            {t('heroSubtitle')}
          </span>
        </h1>

        {/* Описание */}
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {t('heroDesc')}
        </p>
      </div>

      {/* Главный компонент (Загрузка файла) */}
      {/* z-10 нужен, чтобы драг-н-дроп был поверх любых декораций */}
      <div className="w-full max-w-3xl mb-24 relative z-10">
        <FileHasher />
      </div>

      {/* Блок преимуществ */}
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4 mb-24">
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
      
      {/* Инструкция (Как это работает) */}
      <div className="w-full max-w-5xl mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900">
            {t('navHow')}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12 text-center relative">
          {/* Линия, соединяющая шаги (декоративная) */}
          <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200 -z-10" />

          <Step number="1" title={t('step1Title')} desc={t('step1Desc')} />
          <Step number="2" title={t('step2Title')} desc={t('step2Desc')} />
          <Step number="3" title={t('step3Title')} desc={t('step3Desc')} />
        </div>
      </div>

    </div>
  );
}

// === ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ===

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    // bg-white здесь НУЖЕН, чтобы карточки выделялись на общем фоне
    <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 border border-white/50 group">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
        {number}
      </div>
      <h3 className="font-bold text-lg mb-3 text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 max-w-xs leading-relaxed">{desc}</p>
    </div>
  );
}