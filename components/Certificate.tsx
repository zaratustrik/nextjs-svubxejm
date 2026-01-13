import React, { useRef } from 'react';
import { ShieldCheck, Award, Fingerprint, Calendar, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CertificateProps {
  fileName: string;
  fileHash: string;
  walletAddress: string;
  signature: string;
  timestamp: string;
}

export const Certificate: React.FC<CertificateProps> = ({
  fileName,
  fileHash,
  walletAddress,
  signature,
  timestamp,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadPdf = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Высокое качество
        backgroundColor: '#FFFCF5',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      
      // ИЗМЕНЕНИЕ: Portrait (Вертикальная ориентация)
      const pdf = new jsPDF({
        orientation: 'portrait', 
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Растягиваем на весь лист
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      pdf.save(`Certificate_${fileName}.pdf`);
    } catch (error) {
      console.error('Ошибка генерации PDF:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 mt-8 pb-12">
      
      {/* === БУМАГА СЕРТИФИКАТА (Формат А4) === */}
      {/* w-[794px] h-[1123px] — это точные пиксельные размеры А4 при 96 DPI */}
      <div 
        ref={certificateRef}
        className="w-[794px] h-[1123px] bg-[#FFFCF5] text-slate-900 relative p-16 shadow-2xl overflow-hidden border border-slate-300 flex flex-col justify-between"
        style={{ fontFamily: 'Times New Roman, serif' }}
      >
        
        {/* --- ДЕКОРАЦИИ (Рамки и Фон) --- */}
        {/* Внешняя тонкая рамка */}
        <div className="absolute inset-4 border border-slate-400 pointer-events-none z-10"></div>
        {/* Внутренняя толстая рамка */}
        <div className="absolute inset-6 border-[4px] border-double border-slate-900 pointer-events-none z-10"></div>
        
        {/* Угловые узоры */}
        <div className="absolute top-6 left-6 w-24 h-24 border-t-[6px] border-l-[6px] border-slate-900 z-20"></div>
        <div className="absolute top-6 right-6 w-24 h-24 border-t-[6px] border-r-[6px] border-slate-900 z-20"></div>
        <div className="absolute bottom-6 left-6 w-24 h-24 border-b-[6px] border-l-[6px] border-slate-900 z-20"></div>
        <div className="absolute bottom-6 right-6 w-24 h-24 border-b-[6px] border-r-[6px] border-slate-900 z-20"></div>

        {/* Водяной знак */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <ShieldCheck size={600} />
        </div>

        {/* --- КОНТЕНТ (Верхняя часть) --- */}
        <div className="relative z-20 flex flex-col items-center text-center mt-8">
          
          {/* Иконка */}
          <div className="mb-6 text-slate-800">
             <Award size={64} strokeWidth={1} />
          </div>

          {/* Заголовок */}
          <h1 className="text-6xl font-bold uppercase tracking-widest mb-4 text-slate-900">
            Certificate
          </h1>
          <p className="text-2xl italic text-slate-600 font-serif">
            of Blockchain Ownership & Timestamp
          </p>
          
          <div className="w-1/2 h-0.5 bg-slate-800 mt-8 mb-2"></div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Official Document</p>
        </div>

        {/* --- КОНТЕНТ (Центральная часть - Данные) --- */}
        <div className="relative z-20 flex flex-col items-center w-full px-12 space-y-10 flex-grow justify-center">
            
            {/* Файл */}
            <div className="w-full text-center">
              <p className="text-sm uppercase tracking-widest text-slate-500 mb-3 font-semibold">Authenticated File Asset</p>
              <div className="flex flex-col items-center justify-center p-4 bg-white/60 border border-slate-200 rounded-lg">
                 <FileText size={32} className="text-blue-800 mb-2" />
                 <span className="text-3xl font-bold text-slate-900 break-all leading-tight">
                   {fileName}
                 </span>
              </div>
            </div>

            {/* Владелец */}
            <div className="w-full text-center">
              <p className="text-sm uppercase tracking-widest text-slate-500 mb-3 font-semibold">Registered Owner (Wallet)</p>
              <p className="font-mono text-lg bg-slate-100 py-2 px-6 rounded border border-slate-300 inline-block text-slate-800 shadow-sm">
                {walletAddress}
              </p>
            </div>

            {/* Технические данные (Сетка) */}
            <div className="w-full grid grid-cols-1 gap-6 text-left bg-white/40 border-2 border-slate-100 p-6 rounded-xl">
               {/* Hash */}
               <div>
                  <div className="flex items-center gap-2 text-xs uppercase font-bold text-slate-500 mb-2">
                    <Fingerprint size={16} /> SHA-256 Digital Fingerprint
                  </div>
                  <p className="font-mono text-xs text-slate-600 break-all bg-white p-3 border border-slate-200 rounded">
                    {fileHash}
                  </p>
               </div>
               
               {/* Signature */}
               <div>
                  <div className="flex items-center gap-2 text-xs uppercase font-bold text-slate-500 mb-2">
                    <Award size={16} /> Cryptographic Signature
                  </div>
                  <p className="font-mono text-xs text-slate-500 break-all bg-white p-3 border border-slate-200 rounded leading-relaxed">
                    {signature}
                  </p>
               </div>
            </div>
        </div>

        {/* --- ПОДВАЛ (Нижняя часть) --- */}
        <div className="relative z-20 w-full grid grid-cols-3 items-end px-4 mb-8">
            
            {/* Слева: Дата */}
            <div className="text-left">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold">Date Issued</p>
              <div className="flex items-center gap-2 text-slate-800 border-t border-slate-400 pt-2 pr-8">
                <Calendar size={18} />
                <span className="font-mono text-lg font-bold">{timestamp}</span>
              </div>
            </div>

            {/* Центр: Печать */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FCD34D] via-[#F59E0B] to-[#B45309] shadow-2xl border-[6px] border-[#FEF3C7] flex items-center justify-center relative">
                <div className="absolute inset-2 border border-yellow-700/30 rounded-full"></div>
                <ShieldCheck className="text-yellow-900 opacity-80 drop-shadow-sm" size={60} />
              </div>
              <div className="mt-4 text-center">
                 <p className="text-xs uppercase tracking-[0.2em] font-bold text-yellow-700">Verified</p>
                 <p className="text-[10px] uppercase text-slate-400">Immutable Proof</p>
              </div>
            </div>

            {/* Справа: Провайдер */}
            <div className="text-right">
               <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold">Service Provider</p>
               <div className="flex flex-col items-end border-t border-slate-400 pt-2 pl-8">
                 <div className="flex items-center gap-2 mb-1">
                    <div className="bg-slate-900 text-white text-xs font-bold px-2 py-0.5 rounded">CN</div>
                    <span className="font-bold text-xl text-slate-900">CryptoNotary</span>
                 </div>
                 <p className="text-[10px] text-slate-400">Blockchain Verification Protocol</p>
               </div>
            </div>

        </div>

      </div>

      <button 
        onClick={downloadPdf}
        className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition shadow-xl shadow-blue-600/20 flex items-center gap-3 transform hover:-translate-y-1 active:translate-y-0"
      >
        <Award size={24} />
        Скачать PDF Сертификат
      </button>

    </div>
  );
};