'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function VerifyPage() {
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [inputHash, setInputHash] = useState('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    setIsMatch(null);
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const buffer = e.target?.result;
      if (buffer instanceof ArrayBuffer) {
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setFileHash(`0x${hashHex}`);
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const checkHash = () => {
    if (!fileHash || !inputHash) return;
    const cleanInput = inputHash.trim().toLowerCase();
    const cleanCalculated = fileHash.toLowerCase();
    setIsMatch(cleanInput === cleanCalculated);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <h1 className="font-outfit text-3xl font-bold mb-6 text-center">Проверка подлинности</h1>
        
        <div className="mb-8">
          <label className="block font-bold text-gray-700 mb-2">1. Загрузите исходный файл</label>
          <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
            <input {...getInputProps()} />
            <p className="text-gray-500">{fileName || "Перетащи файл сюда для проверки"}</p>
          </div>
          {fileHash && (
            <div className="mt-2 text-xs text-gray-400 font-mono break-all">
              Вычисленный хэш: {fileHash}
            </div>
          )}
        </div>

        <div className="mb-8">
          <label className="block font-bold text-gray-700 mb-2">2. Вставьте Хэш из сертификата</label>
          <input 
            type="text"
            placeholder="0x..." 
            className="w-full p-4 border border-gray-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setInputHash(e.target.value)}
          />
        </div>

        <button 
          onClick={checkHash}
          disabled={!fileHash || !inputHash}
          className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Проверить совпадение
        </button>

        {isMatch === true && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-xl flex items-center gap-3 animate-in fade-in">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold">Успех!</p>
              <p className="text-sm">Файл не был изменен. Хэш совпадает.</p>
            </div>
          </div>
        )}

        {isMatch === false && (
          <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-xl flex items-center gap-3 animate-in fade-in">
            <span className="text-2xl">❌</span>
            <div>
              <p className="font-bold">Ошибка!</p>
              <p className="text-sm">Файл отличается от заявленного.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}