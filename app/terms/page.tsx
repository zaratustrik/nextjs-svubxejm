'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function Terms() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-white p-8 md:p-16 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-600 hover:underline mb-8 block">
        &larr; {lang === 'ru' ? 'Назад на главную' : 'Back to Home'}
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        {lang === 'ru' ? 'Условия использования' : 'Terms of Use'}
      </h1>

      <div className="prose prose-blue max-w-none text-gray-700 space-y-4">
        {lang === 'ru' ? (
          <>
            <p><strong>1. Введение</strong><br/>Добро пожаловать в CryptoNotary. Используя наш сервис, вы соглашаетесь с тем, что мы не храним ваши файлы. Мы лишь создаем их цифровой отпечаток (хэш).</p>
            <p><strong>2. Отказ от ответственности</strong><br/>Сервис предоставляется "как есть". Мы не несем ответственности за потерю доступа к вашему крипто-кошельку.</p>
            <p><strong>3. Блокчейн</strong><br/>Записи в блокчейне неизменяемы. То, что вы подписали и отправили в сеть, останется там навсегда.</p>
          </>
        ) : (
          <>
            <p><strong>1. Introduction</strong><br/>Welcome to CryptoNotary. By using our service, you agree that we do not store your files. We only create their digital fingerprint (hash).</p>
            <p><strong>2. Disclaimer</strong><br/>The service is provided "as is". We are not responsible for lost access to your crypto wallet.</p>
            <p><strong>3. Blockchain</strong><br/>Blockchain records are immutable. What you sign and submit to the network will remain there forever.</p>
          </>
        )}
      </div>
    </div>
  );
}