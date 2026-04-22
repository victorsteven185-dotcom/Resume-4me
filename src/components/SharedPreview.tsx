import { useParams, Navigate } from 'react-router-dom';
import { ResumePreview } from './ResumePreview';
import { ResumeData } from '../types';
import LZString from 'lz-string';
import { Download, Printer, Home } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const SharedPreview = () => {
  const { data: encodedData } = useParams<{ data: string }>();
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    // Auto-trigger download
    const timer = setTimeout(() => {
      handleExportPDF();
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!encodedData) return <Navigate to="/" replace />;

  let data: ResumeData | null = null;
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(encodedData);
    if (!decompressed) throw new Error('Decompression failed');
    data = JSON.parse(decompressed);
  } catch (error) {
    console.error('Failed to decode resume data:', error);
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Invalid Link</h1>
          <p className="text-slate-500 mb-6">This resume link appears to be broken or expired.</p>
          <a href="/" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">Go Home</a>
        </div>
      </div>
    );
  }

  const handleExportPDF = async () => {
    if (!previewRef.current || isDownloading) return;
    try {
      setIsDownloading(true);
      const element = previewRef.current;
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff',
        windowWidth: 794 
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${data?.personalInfo.fullName || 'Resume'}.pdf`);
      setDownloadSuccess(true);
    } catch (err) {
      console.error('Auto-download failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-100 pt-20 pb-12 px-4 md:px-8 print:p-0 print:bg-white text-slate-900 font-sans overflow-x-hidden">
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 z-50 shadow-sm print:hidden">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight text-indigo-600">Resume4me</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest border-l border-slate-100 pl-3">Direct Download</span>
        </div>
        <div className="flex items-center gap-3">
          {isDownloading && (
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold animate-pulse">
              Generating PDF...
            </div>
          )}
          <button onClick={() => window.print()} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Printer className="w-5 h-5" />
          </button>
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
            <Download className="w-4 h-4" /> Download
          </button>
          <a href="/" className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-full hover:bg-indigo-600 transition-all ml-2 shadow-lg">
            <Home className="w-5 h-5" />
          </a>
        </div>
      </nav>

      {/* Download Alert */}
      <AnimatePresence>
        {isDownloading && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 pointer-events-none font-bold text-sm">
            <Download className="w-4 h-4 animate-bounce" />
            Your download is starting...
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto print:mx-0 shadow-2xl relative group print:shadow-none">
        <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
            Verified Portfolio Link
        </div>
        <ResumePreview data={data!} ref={previewRef} />
      </div>
      
      <footer className="mt-12 text-center text-slate-400 text-xs font-medium uppercase tracking-widest print:hidden">
        Powered by <span className="text-indigo-600 font-black">Resume4me</span>
      </footer>
    </div>
  );
};
