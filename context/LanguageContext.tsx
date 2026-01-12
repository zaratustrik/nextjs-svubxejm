'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'ru' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    heroTitle: 'Докажи авторство',
    heroSubtitle: 'навсегда в блокчейне',
    heroDesc: 'Загрузи файл, подпиши его своим крипто-кошельком и получи неизменяемый сертификат владения.',
    connect: 'Подключить',
    security: 'Безопасно',
    speed: 'Быстро',
    public: 'Публично',
    dragDrop: 'Перетащи файл сюда или кликни',
    navHow: 'Как это работает',
    navCheck: 'Проверить файл',
    // Новые переводы
    caseDesignTitle: 'Для Дизайнеров',
    caseDesignDesc: 'Защитите свои работы перед публикацией в портфолио. Докажите, что вы создали логотип или иллюстрацию первыми.',
    caseLawTitle: 'Для Бизнеса',
    caseLawDesc: 'Зафиксируйте состояние контракта или NDA в момент подписания. Гарантия неизменности документа на века.',
    caseMusicTitle: 'Для Авторов',
    caseMusicDesc: 'Битмейкеры, писатели и исследователи могут закрепить за собой первенство идеи до официального релиза.',
    poweredBy: 'Работает на базе'
  },
  en: {
    heroTitle: 'Prove ownership',
    heroSubtitle: 'forever on blockchain',
    heroDesc: 'Upload a file, sign it with your crypto wallet, and get an immutable certificate of ownership.',
    connect: 'Connect',
    security: 'Secure',
    speed: 'Fast',
    public: 'Public',
    dragDrop: 'Drag & drop file here or click',
    navHow: 'How it works',
    navCheck: 'Verify file',
    // New translations
    caseDesignTitle: 'For Designers',
    caseDesignDesc: 'Protect your work before publishing in a portfolio. Prove you created the logo or illustration first.',
    caseLawTitle: 'For Business',
    caseLawDesc: 'Freeze the state of a contract or NDA at the moment of signing. Guarantee of document immutability forever.',
    caseMusicTitle: 'For Creators',
    caseMusicDesc: 'Beatmakers, writers, and researchers can secure the priority of an idea before the official release.',
    poweredBy: 'Powered by'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('ru');

  const toggleLang = () => setLang((prev) => (prev === 'ru' ? 'en' : 'ru'));

  const t = (key: string) => {
    // @ts-ignore
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};