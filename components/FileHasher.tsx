'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAccount, useSignMessage } from 'wagmi';
import { SHA256 } from 'crypto-js';
import { useLanguage } from '../context/LanguageContext';
// Импортируем наш новый красивый сертификат
import { Certificate } from './Certificate';
import { Upload, FileCheck, RefreshCw } from 'lucide-react';

export const FileHasher = () => {
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  
  // Состояния для сертификата
  const [signature, setSignature] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  
  const { t } = useLanguage(); 
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // --- 1. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---

  const API_SHA256_HELPER = (buffer: any) => {
    const words = [];
    const u8 = new Uint8Array(buffer);
    for (let i = 0; i < u8.length; i += 4) {
      words.push(
        (u8[i] << 24) | (u8[i + 1] << 16) | (u8[i + 2] << 8) | u8[i + 3]
      );
    }
    return { sigBytes: u8.length, words: words };
  };

  // --- 2. ОСНОВНЫЕ ФУНКЦИИ ---

  const handleSign = async () => {
    if (!fileHash || !address) return;
    try {
      setStatus('Please sign in your wallet...');
      
      const sig = await signMessageAsync({
        message: `I certify that I possess the file "${fileName}" with SHA-256 hash: ${fileHash}`,
      });

      // Если подпись успешна, сохраняем данные и показываем сертификат
      setSignature(sig);
      setTimestamp(new Date().toLocaleString());
      setStatus('Certificate generated successfully!');
      
    } catch (error) {
      console.error(error);
      setStatus('Error signing message');
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Сбрасываем старые данные при загрузке нового файла
    setSignature(null);
    setTimestamp(null);
    
    setFileName(file.name);
    setStatus('Computing SHA-256...');

    const reader = new FileReader();
    reader.onload = (event) => {
      const binary = event.target?.result;
      if (binary) {
        const wordArray = API_SHA256_HELPER(binary);
        // "as any" для crypto-js типов
        const hash = SHA256(wordArray as any).toString();
        setFileHash(hash);
        setStatus('Ready to sign');
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleReset = () => {
    setFileHash(null);
    setFileName(null);
    setSignature(null);
    setStatus('');
  };

  // --- 3. ИНТЕРФЕЙС ---
  
  // Если сертификат уже создан (есть подпись), показываем ТОЛЬКО его
  if (signature && fileHash && fileName && address && timestamp) {
    return (
      <div className="w-full flex flex-col items-center animate-fade-in">
        <div className="bg-green-100 text-green-800 px-6 py-2 rounded-full font-medium mb-8 flex items-center gap-2">
            <FileCheck size={18} />
            Proof Generated Successfully
        </div>

        {/* Наш красивый компонент */}
        <Certificate 
          fileName={fileName}
          fileHash={fileHash}
          walletAddress={address}
          signature={signature}
          timestamp={timestamp}
        />

        <button 
            onClick={handleReset}
            className="mt-12 text-slate-400 hover:text-slate-600 flex items-center gap-2 transition"
        >
            <RefreshCw size={14} /> Process another file
        </button>
      </div>
    );
  }

  // Иначе показываем форму загрузки
  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-[2rem] shadow-2xl shadow-blue-900/5 p-8 md:p-12 border border-white">
      
      {!fileHash ? (
        // Состояние: Загрузка файла
        <div 
          {...getRootProps()} 
          className={`
            border-2 border-dashed rounded-2xl h-80 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
              : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50 bg-slate-50/50'}
          `}
        >
          <input {...getInputProps()} />
          <div className="bg-white p-5 rounded-full mb-6 shadow-sm group-hover:scale-110 transition duration-300">
            <Upload className="text-blue-600" size={32} />
          </div>
          <p className="text-slate-600 font-semibold text-xl text-center px-4 mb-2">
            {isDragActive ? 'Drop it like it\'s hot!' : t('dragDrop')}
          </p>
          <p className="text-slate-400 text-sm">Supports any file type</p>
        </div>
      ) : (
        // Состояние: Файл загружен, ждем подписи
        <div className="text-center space-y-8 animate-fade-in-up">
          
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">File Processed</h3>
            <p className="text-slate-500">{fileName}</p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">SHA-256 Fingerprint</p>
            <p className="font-mono text-xs break-all text-slate-600 leading-relaxed">{fileHash}</p>
          </div>
          
          <div className="h-px w-full bg-slate-100"></div>

          {!address ? (
            <div className="p-4 bg-orange-50 text-orange-600 rounded-xl text-sm font-medium">
              Please connect your wallet in the top right corner to continue.
            </div>
          ) : (
            <button
              onClick={handleSign}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl shadow-blue-600/20 transition-all transform hover:-translate-y-1 active:translate-y-0 text-lg flex items-center justify-center gap-2"
            >
              <FileCheck size={20} />
              Sign & Create Certificate
            </button>
          )}

          <button 
            onClick={handleReset}
            className="text-slate-400 text-sm hover:text-slate-600 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};