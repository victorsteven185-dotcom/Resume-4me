import { useRef, useState, useEffect } from 'react';
import { CoverLetterPreview } from './CoverLetterPreview';
import { Download, FileText, Loader2, Sparkles, Printer, ArrowLeft, ArrowRight, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ResumeData } from '../types';
import { generateCoverLetter } from '../services/geminiService';

interface CoverLetterEditorProps {
  data: ResumeData;
  updateCoverLetter: any;
  onUpdateSkills: (skills: string[]) => void;
  onUpdateSoftSkills: (skills: string[]) => void;
}

export const CoverLetterEditor = ({ data, updateCoverLetter, onUpdateSkills, onUpdateSoftSkills }: CoverLetterEditorProps) => {
  const navigate = useNavigate();
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [scale, setScale] = useState(1);
  const [activeMobileTab, setActiveMobileTab] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth - 32;
      const resumeWidth = 794; // A4 width in px at 96 DPI
      
      if (containerWidth < resumeWidth) {
        setScale(containerWidth / resumeWidth);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleGenerateCoverLetter = async () => {
    try {
      setIsGeneratingCoverLetter(true);
      const content = await generateCoverLetter(data);
      if (content) {
        updateCoverLetter({ content });
      }
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  const handleExportPDF = async () => {
    if (!previewRef.current || isExporting) return;
    try {
      setIsExporting(true);
      const element = previewRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const fileName = data.personalInfo.fullName 
        ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Cover_Letter.pdf` 
        : `Cover_Letter.pdf`;
        
      pdf.save(fileName);
      setShowExportSuccess(true);
      setTimeout(() => setShowExportSuccess(false), 3000);
    } catch (error) {
      console.error('PDF Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportWord = async () => {
    if (!previewRef.current || isExportingWord) return;
    try {
      setIsExportingWord(true);
      const element = previewRef.current;
      const fileName = data.personalInfo.fullName 
        ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Cover_Letter.doc` 
        : `Cover_Letter.doc`;

      const header = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Export</title>
          <style>
            p.MsoNormal, li.MsoNormal, div.MsoNormal {
              margin: 0in; margin-bottom: .0001pt; font-size: 11.0pt; font-family: "Calibri",sans-serif;
            }
            body { font-family: "Calibri",sans-serif; }
          </style>
        </head>
        <body>
      `;
      const footer = "</body></html>";
      const content = element.innerHTML.replace(/<button[^>]*>.*?<\/button>/gi, '').replace(/lucide/gi, 'icon'); 
      const source = header + content + footer;
      const blob = new Blob(['\ufeff', source], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
      setShowExportSuccess(true);
      setTimeout(() => setShowExportSuccess(false), 3000);
    } catch (error) {
      console.error('Word Export failed:', error);
    } finally {
      setIsExportingWord(false);
    }
  };

  const handlePrint = () => window.print();

  const handleLoadSample = () => {
    updateCoverLetter({
      recipientName: "Ms. Sarah Jennings",
      recipientTitle: "Director of Technology",
      companyName: "Global Innovators Group",
      companyAddress: "450 Science Park, Palo Alto, CA",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      content: `Dear Ms. Jennings,\n\nI am writing to formally apply for the Senior Software Engineer position at Global Innovators Group. With over 8 years of experience building mission-critical web applications and a deep expertise in modern TypeScript ecosystems, I have followed your company's growth with great admiration.\n\nIn my recent role at TechFlow Systems, I spearheaded a migration to a micro-frontend architecture which resulted in a 40% improvement in performance metrics. I believe my background in high-scale system design and my commitment to clean, maintainable code align perfectly with the engineering standards at Global Innovators.\n\nI am excited about the possibility of bringing my technical leadership to your team. Thank you for your time and consideration.\n\nBest regards,\n\n${data.personalInfo.fullName}`
    });
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden text-slate-900 font-sans">
      <aside className={`w-full max-w-sm border-r border-slate-200 bg-white overflow-y-auto ${activeMobileTab === 'edit' ? 'block' : 'hidden'} lg:block`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
           <button 
             onClick={() => navigate('/editor')}
             className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-bold text-xs uppercase tracking-widest"
           >
             <ArrowLeft className="w-4 h-4" /> Back to Resume
           </button>
        </div>
        <div className="p-6 space-y-8">
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
             <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                   <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                   <h4 className="text-sm font-bold text-slate-900">AI Editor Pro</h4>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Real-time Preview</p>
                </div>
             </div>
             <button 
               onClick={handleLoadSample}
               className="w-full py-2.5 bg-white border border-indigo-100 text-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
             >
               Load Professional Sample
             </button>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 font-sans">Recipient Details</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Name</label>
                <input 
                  type="text" 
                  value={data.coverLetter?.recipientName || ''}
                  onChange={(e) => updateCoverLetter({ recipientName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-semibold focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Title</label>
                <input 
                  type="text" 
                  value={data.coverLetter?.recipientTitle || ''}
                  onChange={(e) => updateCoverLetter({ recipientTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-semibold focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all"
                  placeholder="Hiring Manager"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company</label>
                <input 
                  type="text" 
                  value={data.coverLetter?.companyName || ''}
                  onChange={(e) => updateCoverLetter({ companyName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-semibold focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all"
                  placeholder="Tech Solutions Inc."
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Address</label>
                <input 
                  type="text" 
                  value={data.coverLetter?.companyAddress || ''}
                  onChange={(e) => updateCoverLetter({ companyAddress: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-semibold focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 font-sans">Skills Highlights</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Expertise (Comma Separated)</label>
                <textarea 
                  value={data.skills.join(', ')}
                  onChange={(e) => onUpdateSkills(e.target.value.split(',').map(s => s.trim()))}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all min-h-[80px] resize-none"
                  placeholder="e.g. React, TypeScript, Project Management"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Soft Skills (Comma Separated)</label>
                <textarea 
                  value={data.softSkills?.join(', ') || ''}
                  onChange={(e) => onUpdateSoftSkills(e.target.value.split(',').map(s => s.trim()))}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all min-h-[80px] resize-none"
                  placeholder="e.g. Leadership, Communication, Problem Solving"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">AI Assistance</h3>
              <button 
                onClick={handleGenerateCoverLetter}
                disabled={isGeneratingCoverLetter}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all disabled:opacity-50"
              >
                {isGeneratingCoverLetter ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                Draft with GenAI
              </button>
            </div>
            <textarea 
              value={data.coverLetter?.content || ''}
              onChange={(e) => updateCoverLetter({ content: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all min-h-[300px] resize-none"
              placeholder="Write your content..."
            />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4 flex items-center gap-2 leading-tight">
              <ArrowRight className="w-3 h-3" /> You can also type directly on the document inside the preview
            </p>
          </div>
        </div>
      </aside>

      <main className={`flex-1 flex flex-col min-w-0 ${activeMobileTab === 'preview' ? 'block' : 'hidden'} lg:flex`}>
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 sm:gap-3">
             <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full lg:hidden"><ArrowLeft className="w-5 h-5" /></button>
             <h2 className="text-sm sm:text-lg font-bold truncate">Cover Letter</h2>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button onClick={handlePrint} className="p-2 sm:p-2.5 text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"><Printer className="w-4 h-4 sm:w-5 h-5" /></button>
            <button onClick={handleExportPDF} disabled={isExporting} className="px-3 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-1.5 sm:gap-2">
              {isExporting ? <Loader2 className="w-3 h-3 sm:w-4 h-4 animate-spin" /> : <Download className="w-3 h-3 sm:w-4 h-4" />}
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button onClick={handleExportWord} disabled={isExportingWord} className="px-3 sm:px-5 py-2 sm:py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-1.5 sm:gap-2">
              {isExportingWord ? <Loader2 className="w-3 h-3 sm:w-4 h-4 animate-spin" /> : <FileText className="w-3 h-3 sm:w-4 h-4" />}
              <span className="hidden sm:inline">Word</span>
            </button>
          </div>
        </header>

        <div ref={containerRef} className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-8 bg-slate-200/50">
          <div 
            className="mx-auto relative transition-all duration-300"
            style={{ 
              width: `${794 * scale}px`,
              height: 'auto'
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: '794px'
              }}
            >
              <AnimatePresence>
                {showExportSuccess && (
                  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold">
                    <FileText className="w-4 h-4" /> Download Ready!
                  </motion.div>
                )}
              </AnimatePresence>
              <CoverLetterPreview 
                data={data} 
                ref={previewRef} 
                onUpdate={updateCoverLetter}
                onAIGenerate={handleGenerateCoverLetter}
                isGenerating={isGeneratingCoverLetter}
              />
            </div>
          </div>
          {scale < 1 && (
            <div style={{ height: `${(previewRef.current?.offsetHeight || 1123) * scale - 20}px` }} className="lg:hidden" />
          )}
        </div>
      </main>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center z-40 px-6 print:hidden">
        <div className="flex-1 flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50">
          <button 
            onClick={() => setActiveMobileTab('edit')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeMobileTab === 'edit' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >
            <Sparkles className="w-4 h-4" /> Edit
          </button>
          <button 
            onClick={() => setActiveMobileTab('preview')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeMobileTab === 'preview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >
            <Monitor className="w-4 h-4" /> Preview
          </button>
        </div>
      </div>
    </div>
  );
};
