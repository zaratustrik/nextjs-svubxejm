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

  // Функция для скачивания именно ЭТОГО красивого вида в PDF
  const downloadPdf = async () => {
    if (!certificateRef.current) return;

    try {
      // 1. Делаем "скриншот" сертификата в высоком качестве
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Улучшает четкость текста
        backgroundColor: '#FFFCF5', // Цвет фона бумаги
        logging: false,
      });

      // 2. Создаем PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // 3. Растягиваем изображение на весь А4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // 4. Скачиваем
      pdf.save(`Certificate_${fileName}.pdf`);
    } catch (error) {
      console.error('Ошибка генерации PDF:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      
      {/* === ВИЗУАЛЬНАЯ ЧАСТЬ СЕРТИФИКАТА === */}
      {/* Этот блок будет сохранен в PDF */}
      <div 
        ref={certificateRef}
        className="w-[800px] h-[600px] bg-[#FFFCF5] text-slate-900 relative p-12 shadow-2xl overflow-hidden border border-slate-300"
        style={{ fontFamily: 'Times New Roman, serif' }} // Принудительно ставим шрифт с засечками
      >
        
        {/* Декоративная рамка (Двойная) */}
        <div className="absolute inset-4 border-[3px] border-slate-800 pointer-events-none z-10"></div>
        <div className="absolute inset-6 border border-slate-600 pointer-events-none z-10"></div>

        {/* Водяной знак на фоне */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <ShieldCheck size={400} />
        </div>

        {/* Угловые узоры (CSS треугольники) */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-[3px] border-l-[3px] border-slate-800"></div>
        <div className="absolute top-4 right-4 w-16 h-16 border-t-[3px] border-r-[3px] border-slate-800"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-[3px] border-l-[3px] border-slate-800"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-[3px] border-r-[3px] border-slate-800"></div>

        {/* Контент */}
        <div className="relative z-20 flex flex-col items-center text-center h-full justify-between py-4">
          
          {/* Шапка */}
          <div>
            <div className="flex justify-center mb-4 text-slate-800">
               <Award size={48} />
            </div>
            <h1 className="text-5xl font-bold uppercase tracking-widest mb-2 text-slate-900">
              Certificate
            </h1>
            <p className="text-xl italic text-slate-600">
              of Blockchain Timestamp & Ownership
            </p>
          </div>

          <div className="w-2/3 h-px bg-slate-300 my-2"></div>

          {/* Основные данные */}
          <div className="w-full space-y-6 px-8">
            
            {/* Файл */}
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Authenticated File Asset</p>
              <div className="text-2xl font-bold text-blue-900 break-all leading-tight flex items-center justify-center gap-2">
                 <FileText size={20} className="text-blue-600" />
                 {fileName}
              </div>
            </div>

            {/* Владелец */}
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Digital Owner (Wallet)</p>
              <p className="font-mono text-base bg-slate-100/50 py-1 px-4 rounded border border-slate-200 inline-block text-slate-700">
                {walletAddress}
              </p>
            </div>

            {/* Хеш и подпись (Технические данные) */}
            <div className="grid grid-cols-2 gap-4 text-left bg-white/50 border border-slate-200 p-4 rounded-lg">
               <div>
                  <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 mb-1">
                    <Fingerprint size={12} /> SHA-256 Fingerprint
                  </div>
                  <p className="font-mono text-[10px] text-slate-600 break-all leading-relaxed">
                    {fileHash}
                  </p>
               </div>
               <div>
                  <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 mb-1">
                    <Award size={12} /> Digital Signature
                  </div>
                  <p className="font-mono text-[10px] text-slate-400 break-all leading-relaxed line-clamp-3">
                    {signature}
                  </p>
               </div>
            </div>

          </div>

          {/* Подвал с печатью и датой */}
          <div className="w-full flex justify-between items-end px-12 mt-4">
            
            <div className="text-left">
              <div className="flex items-center gap-2 text-slate-600 mb-1">
                <Calendar size={16} />
                <span className="font-bold text-sm">Date Issued:</span>
              </div>
              <p className="text-lg border-b border-slate-400 pb-1 pr-8 inline-block font-mono">
                {timestamp}
              </p>
            </div>

            {/* Золотая Печать */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 shadow-xl border-4 border-yellow-100 flex items-center justify-center">
                <ShieldCheck className="text-yellow-900 opacity-70" size={40} />
              </div>
              <div className="absolute -bottom-8 w-full text-center">
                 <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Verified</p>
              </div>
            </div>

            <div className="text-right">
               <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Service Provider</p>
               <div className="flex items-center gap-2 justify-end">
                 <div className="bg-blue-600 text-white text-xs font-bold p-1 rounded">CN</div>
                 <span className="font-bold text-slate-800">CryptoNotary</span>
               </div>
               <p className="text-[10px] text-slate-400 mt-1">Immutable Proof</p>
            </div>

          </div>
        </div>
      </div>

      {/* Кнопка скачивания */}
      <button 
        onClick={downloadPdf}
        className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg shadow-slate-900/20 flex items-center gap-2 animate-bounce"
      >
        Скачать PDF Сертификат
      </button>

    </div>
  );
};