'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ShieldCheck, Upload, CheckCircle, XCircle } from 'lucide-react'; // Используем иконки из библиотеки

export default function VerifyPage() {
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [inputHash, setInputHash] = useState('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setIsMatch(null);
    setFileHash(null); // Сброс хеша пока считаем новый
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const buffer = e.target?.result;
      if (buffer instanceof ArrayBuffer) {
        // Твоя логика хеширования (оставляем как есть)
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setFileHash(hashHex); // Обычно хеш пишут без 0x в простых инструментах, но если в сертификате 0x, то добавь `0x${hashHex}`
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const checkHash = () => {
    if (!fileHash || !inputHash) return;
    // Очищаем от пробелов и приводим к нижнему регистру для сравнения
    const cleanInput = inputHash.trim().toLowerCase().replace('0x', ''); // Убираем 0x если юзер вставил
    const cleanCalculated = fileHash.toLowerCase().replace('0x', '');
    
    setIsMatch(cleanInput === cleanCalculated);
  };

  return (
    <div className="w-full flex flex-col items-center py-20 px-4">
      
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6 shadow-sm">
           <ShieldCheck size={32} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Проверка сертификата</h1>
        <p className="text-slate-500 text-lg">
          Загрузи файл и вставь хеш из PDF, чтобы убедиться в подлинности.
        </p>
      </div>

      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white">
        
        {/* Шаг 1 */}
        <div className="mb-8">
          <label className="block font-bold text-slate-700 mb-3 ml-1">1. Загрузите исходный файл</label>
          <div 
            {...getRootProps()} 
            className={`
              border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}
            `}
          >
            <input {...getInputProps()} />
            <div className="flex justify-center mb-3 text-slate-400">
               <Upload size={32} />
            </div>
            <p className="text-slate-500 font-medium">{fileName || "Перетащи файл сюда или кликни"}</p>
          </div>
          
          {fileHash && (
            <div className="mt-4 p-3 bg-slate-100 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Вычисленный SHA-256:</p>
              <p className="text-xs text-slate-600 font-mono break-all">{fileHash}</p>
            </div>
          )}
        </div>

        {/* Шаг 2 */}
        <div className="mb-8">
          <label className="block font-bold text-slate-700 mb-3 ml-1">2. Вставьте Хэш из сертификата</label>
          <input 
            type="text"
            placeholder="aacc8b7f94b..." 
            className="w-full p-4 bg-white border border-slate-300 rounded-xl font-mono text-sm text-slate-800 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
            onChange={(e) => setInputHash(e.target.value)}
          />
        </div>

        <button 
          onClick={checkHash}
          disabled={!fileHash || !inputHash}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20"
        >
          Проверить совпадение
        </button>

        {/* Результаты */}
        {isMatch === true && (
          <div className="mt-6 p-6 bg-green-50 border border-green-100 text-green-800 rounded-2xl flex items-start gap-4 animate-fade-in-up">
            <CheckCircle size={28} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-lg">Успех! Хеши совпадают.</p>
              <p className="text-sm opacity-80 mt-1">
                Файл аутентичен и не был изменен с момента создания сертификата.
              </p>
            </div>
          </div>
        )}

        {isMatch === false && (
          <div className="mt-6 p-6 bg-red-50 border border-red-100 text-red-800 rounded-2xl flex items-start gap-4 animate-fade-in-up">
            <XCircle size={28} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-lg">Ошибка! Не совпадает.</p>
              <p className="text-sm opacity-80 mt-1">
                Этот файл отличается от того, что указан в сертификате, либо вы вставили неверный хеш.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}