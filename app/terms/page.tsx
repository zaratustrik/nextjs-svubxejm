import React from 'react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-12 px-4">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1 className="font-outfit text-3xl font-bold mb-6 text-gray-900">Условия использования (Terms of Service)</h1>
        
        <p className="text-gray-500 mb-8">Дата обновления: {new Date().toLocaleDateString()}</p>

        <section className="space-y-4 text-gray-700">
          <h3 className="text-xl font-bold text-gray-900">1. Ограничение ответственности</h3>
          <p>
            Сервис <strong>CryptoNotary</strong> предоставляет техническую возможность фиксации цифрового отпечатка (хэша) файла в публичном блокчейне. 
            Мы не являемся нотариусом, юридической фирмой или государственным регистратором прав.
          </p>

          <h3 className="text-xl font-bold text-gray-900">2. Природа доказательств</h3>
          <p>
            Сертификат подтверждает, что файл в неизменном виде существовал на момент создания транзакции. 
            Юридическая сила этого доказательства определяется законами страны, в которой происходит судебное разбирательство. 
            В РФ данные блокчейна могут приниматься судами как письменные доказательства (ст. 75 АПК РФ).
          </p>

          <h3 className="text-xl font-bold text-gray-900">3. Хранение данных</h3>
          <p>
            Мы уважаем вашу приватность. <strong>Мы не загружаем и не храним ваши файлы.</strong> 
            Процесс вычисления хэша (SHA-256) происходит локально в вашем браузере. 
            Если вы потеряете исходный файл, восстановить его через наш сервис будет невозможно.
          </p>
        </section>
      </div>
    </main>
  );
}