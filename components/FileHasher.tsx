'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAccount, useSignMessage } from 'wagmi';
import { SHA256 } from 'crypto-js';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { useLanguage } from '../context/LanguageContext';

export const FileHasher = () => {
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  
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

  const generatePDF = async (hash: string, sig: string, wallet: string, fName: string) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText('CryptoNotary Certificate', { x: 50, y: 350, size: 24, font });
    page.drawText(`File: ${fName}`, { x: 50, y: 300, size: 12, font });
    page.drawText(`SHA-256: ${hash}`, { x: 50, y: 280, size: 10, font });
    page.drawText(`Wallet Owner: ${wallet}`, { x: 50, y: 240, size: 10, font });
    page.drawText(`Digital Signature:`, { x: 50, y: 200, size: 10, font });
    page.drawText(`${sig.slice(0, 64)}...`, { x: 50, y: 185, size: 8, font });
    
    page.drawText(`Date: ${new Date().toLocaleString()}`, { x: 50, y: 50, size: 10, font });

    const pdfBytes = await pdfDoc.save();
    // ИСПРАВЛЕНИЕ 1: Добавили "as any", чтобы успокоить TypeScript
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Certificate_Proof.pdf';
    link.click();
  };

  // --- 2. ОСНОВНЫЕ ФУНКЦИИ ---

  const handleSignAndDownload = async () => {
    if (!fileHash || !address) return;
    try {
      setStatus('Please sign in your wallet...');
      const signature = await signMessageAsync({
        message: `I certify that I possess the file "${fileName}" with SHA-256 hash: ${fileHash}`,
      });

      setStatus('Generating PDF...');
      await generatePDF(fileHash, signature, address, fileName || 'Unknown File');
      setStatus('Done! Certificate downloaded.');
    } catch (error) {
      console.error(error);
      setStatus('Error signing or generating PDF');
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    setStatus('Computing SHA-256...');

    const reader = new FileReader();
    reader.onload = (event) => {
      const binary = event.target?.result;
      if (binary) {
        const wordArray = API_SHA256_HELPER(binary);
        // ИСПРАВЛЕНИЕ 2: Добавили "as any", чтобы TypeScript принял наш самодельный wordArray
        const hash = SHA256(wordArray as any).toString();
        setFileHash(hash);
        setStatus('Ready to sign');
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // --- 3. ИНТЕРФЕЙС ---
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      
      {!fileHash ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-500 font-medium text-lg text-center px-4">
            {isDragActive ? 'Drop it here!' : t('dragDrop')}
          </p>
        </div>
      ) : (
        <div className="text-center space-y-6">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="text-sm text-gray-500 mb-1">File Hash (SHA-256):</p>
            <p className="font-mono text-xs break-all text-green-800">{fileHash}</p>
          </div>
          
          <p className="text-gray-600">{status}</p>

          {!address ? (
            <p className="text-red-500 text-sm font-bold">
              Please connect wallet first
            </p>
          ) : (
            <button
              onClick={handleSignAndDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Sign & Download Certificate
            </button>
          )}

          <button 
            onClick={() => { setFileHash(null); setStatus(''); }}
            className="text-gray-400 text-sm hover:text-gray-600 underline"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};