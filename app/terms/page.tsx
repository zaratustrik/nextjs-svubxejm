'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowLeft } from 'lucide-react'; // Добавим красивую стрелочку

export default function Terms() {
  const { lang } = useLanguage();

  return (
    // Убрали min-h-screen и bg-white, чтобы был виден глобальный фон
    <div className="w-full py-20 px-4 flex justify-center">
      
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-16 shadow-xl border border-white">
        
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline mb-8 font-medium transition">
          <ArrowLeft size={16} />
          {lang === 'ru' ? 'Назад на главную' : 'Back to Home'}
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-slate-900">
          {lang === 'ru' ? 'Условия использования' : 'Terms of Use'}
        </h1>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-6 leading-relaxed">
          {lang === 'ru' ? (
            <>
              <p><strong className="text-slate-900">1. Введение</strong><br/>Добро пожаловать в CryptoNotary. Используя наш сервис, вы соглашаетесь с тем, что мы не храним ваши файлы. Мы лишь создаем их цифровой отпечаток (хэш) локально в вашем браузере.</p>
              <p><strong className="text-slate-900">2. Отказ от ответственности</strong><br/>Сервис предоставляется "как есть". Мы не несем ответственности за потерю доступа к вашему крипто-кошельку, ошибки в подписании или юридическую силу сертификата в вашей юрисдикции.</p>
              <p><strong className="text-slate-900">3. Блокчейн</strong><br/>Записи в блокчейне неизменяемы. То, что вы подписали и отправили в сеть (если используете смарт-контракт), останется там навсегда. Офф-чейн подписи хранятся у вас в виде PDF.</p>
            </>
          ) : (
            <>
              <p><strong className="text-slate-900">1. Introduction</strong><br/>Welcome to CryptoNotary. By using our service, you agree that we do not store your files. We only create their digital fingerprint (hash) locally in your browser.</p>
              <p><strong className="text-slate-900">2. Disclaimer</strong><br/>The service is provided "as is". We are not responsible for lost access to your crypto wallet, signing errors, or the legal weight of the certificate in your jurisdiction.</p>
              <p><strong className="text-slate-900">3. Blockchain</strong><br/>Blockchain records are immutable. What you sign and submit to the network (if using smart contracts) will remain there forever. Off-chain signatures are stored by you as PDF files.</p>
            </>
          )}
        </div>

      </div>
    </div>
  );
}