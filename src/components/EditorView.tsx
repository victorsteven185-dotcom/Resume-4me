import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorSidebar } from './EditorSidebar';
import { ResumePreview } from './ResumePreview';
import { Download, FileText, Share2, Github, AlertCircle, Loader2, Sparkles, Printer, X, Monitor, ChevronRight, ArrowRight, Link as LinkIcon, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ResumeData } from '../types';
import { generateCoverLetter } from '../services/geminiService';
import { saveResume } from '../services/resumeService';
import LZString from 'lz-string';

interface EditorViewProps {
  data: ResumeData;
  updatePersonalInfo: any;
  addExperience: any;
  updateExperience: any;
  removeExperience: any;
  addEducation: any;
  updateEducation: any;
  removeEducation: any;
  addProject: any;
  updateProject: any;
  removeProject: any;
  updateSkills: any;
  updateSoftSkills: any;
  updateTemplate: any;
  updateCoverLetter: any;
}

export const EditorView = (props: EditorViewProps) => {
  const { 
    data, 
    updatePersonalInfo, 
    addExperience, 
    updateExperience, 
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addProject,
    updateProject,
    removeProject,
    updateSkills,
    updateSoftSkills,
    updateTemplate,
  } = props;

  const navigate = useNavigate();
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'edit' | 'preview'>('edit');
  
  // High-Speed Link Shortening State
  const [shortLink, setShortLink] = useState<string | null>(null);
  const [customSlug, setCustomSlug] = useState(data.personalInfo.fullName.toLowerCase().replace(/[^a-z0-9]/g, '-') || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const generateShareLink = () => {
    if (shortLink) return shortLink;
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(data));
    return `${window.location.origin}/view/${compressed}`;
  };

  const handleGenerateShortLink = async () => {
    if (!customSlug) {
      setSaveError("Please enter a name for your short link.");
      return;
    }
    
    // Validate slug (letters, numbers, dashes only)
    if (!/^[a-z0-9-]+$/.test(customSlug)) {
      setSaveError("Names can only contain letters, numbers, and dashes (v-s-1).");
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);
      await saveResume(customSlug, data);
      const link = `${window.location.origin}/r/${customSlug}`;
      setShortLink(link);
      
      // Auto-copy new link
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err: any) {
      setSaveError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = async () => {
    if (!previewRef.current || isExporting) return;
    try {
      setIsExporting(true);
      const element = previewRef.current;
      
      // Ensure the capture captures the A4 layout by forcing the window width in html2canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794, // 210mm approx at 96dpi
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
        ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf` 
        : `Resume.pdf`;
        
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
      
      // Professional Word export using the HTML with MSO headers approach.
      // This is highly reliable in browsers and preserves layout better than many JS libraries.
      const fileName = data.personalInfo.fullName 
        ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.doc` 
        : `Resume.doc`;

      const header = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Export</title>
          <!--[if gte mso 9]>
          <xml>
            <w:WordDocument>
              <w:View>Print</w:View>
              <w:Zoom>100</w:Zoom>
              <w:DoNotOptimizeForBrowser/>
            </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            p.MsoNormal, li.MsoNormal, div.MsoNormal {
              margin: 0in;
              margin-bottom: .0001pt;
              font-size: 11.0pt;
              font-family: "Calibri",sans-serif;
            }
            body { font-family: "Calibri",sans-serif; }
          </style>
        </head>
        <body>
      `;
      const footer = "</body></html>";
      
      // Minimal sanitization - removing interactive elements if any
      const content = element.innerHTML
        .replace(/<button[^>]*>.*?<\/button>/gi, '')
        .replace(/lucide/gi, 'icon'); 

      const source = header + content + footer;
      
      const blob = new Blob(['\ufeff', source], {
        type: 'application/msword'
      });

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

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden text-slate-900 font-sans">
      <AnimatePresence>
        {showShareModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
               <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-indigo-600 text-white">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2"><Download className="w-5 h-5" /> Direct Download Link</h2>
                    <p className="text-indigo-100 text-xs mt-1">Visiting this link will automatically download your CV as a PDF.</p>
                  </div>
                  <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5" /></button>
               </div>
               <div className="p-8">
                  {!shortLink ? (
                    <div className="space-y-6">
                       <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-6">
                         <h3 className="text-sm font-black uppercase tracking-tight text-indigo-900 mb-2">Create a Human-Readable Link</h3>
                         <p className="text-xs text-indigo-600/80 leading-relaxed">Instead of a long random code, create a professional link with your name.</p>
                         
                         <div className="mt-4 flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200">
                            <span className="text-slate-400 text-xs font-mono pl-2">resume4me/r/</span>
                            <input 
                              type="text" 
                              value={customSlug}
                              onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                              placeholder="your-name"
                              className="flex-1 bg-transparent border-none outline-none text-xs font-bold text-slate-900"
                            />
                         </div>
                         {saveError && (
                           <div className="mt-2 text-[10px] font-black text-red-500 uppercase flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {saveError}
                           </div>
                         )}
                       </div>
                       
                       <button 
                        onClick={handleGenerateShortLink}
                        disabled={isSaving || !customSlug}
                        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all disabled:opacity-50"
                       >
                         {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5" /> Generate Short Link</>}
                       </button>

                       <div className="flex items-center gap-4 py-4">
                          <div className="h-[1px] flex-1 bg-slate-100" />
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Or Use Standard Link</span>
                          <div className="h-[1px] flex-1 bg-slate-100" />
                       </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 mb-6 flex items-center gap-4">
                       <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shrink-0">
                          <Check className="w-6 h-6" />
                       </div>
                       <div>
                          <h3 className="text-sm font-black uppercase text-emerald-900 tracking-tight">Short Link Generated!</h3>
                          <p className="text-xs text-emerald-600">Your professional URL is ready to share.</p>
                       </div>
                    </div>
                  )}

                  <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 mb-6 relative group">
                     <span className="absolute -top-3 left-4 px-2 bg-white text-[10px] font-black uppercase text-slate-400">Your Shareable URL</span>
                     <p className="text-sm font-mono break-all text-slate-600 line-clamp-2">{generateShareLink()}</p>
                  </div>
                  <div className="flex gap-4">
                     <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all transition-colors active:scale-95">
                        {copied ? <><Check className="w-5 h-5" /> Copied!</> : <><LinkIcon className="w-5 h-5" /> Copy Link</>}
                     </button>
                     <button onClick={() => window.open(generateShareLink(), '_blank')} className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95">
                        <Monitor className="w-5 h-5" /> Open Preview
                     </button>
                  </div>
                  <div className="mt-8 flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                     <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                     <p className="text-[10px] text-amber-700 font-medium leading-relaxed">Privacy Note: Short links store your data in our secure cloud database. Standard links store data entirely in the URL itself.</p>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <aside className={`w-full max-w-md border-r border-slate-200 bg-white ${activeMobileTab === 'edit' ? 'block' : 'hidden'} md:block`}>
        <div className="h-full overflow-y-auto">
          <EditorSidebar 
            data={data}
            onUpdatePersonalInfo={updatePersonalInfo}
            onAddExperience={addExperience}
            onUpdateExperience={updateExperience}
            onRemoveExperience={removeExperience}
            onAddEducation={addEducation}
            onUpdateEducation={updateEducation}
            onRemoveEducation={removeEducation}
            onAddProject={addProject}
            onUpdateProject={updateProject}
            onRemoveProject={removeProject}
            onUpdateSkills={updateSkills}
            onUpdateSoftSkills={updateSoftSkills}
            onUpdateTemplate={updateTemplate}
          />
        </div>
      </aside>

      <main className={`flex-1 flex flex-col min-w-0 ${activeMobileTab === 'preview' ? 'block' : 'hidden'} md:flex`}>
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</span>
            <div className="flex items-center gap-2 text-sm font-semibold"><div className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />Live Preview Active</div>
          </div>

          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 scale-90 sm:scale-100">
            <button 
              onClick={() => navigate('/')}
              className="px-3 sm:px-6 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg text-slate-400 hover:text-slate-600 transition-all"
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/cover-letter')}
              className="px-3 sm:px-6 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg text-slate-400 hover:text-slate-600 transition-all"
            >
              Cover Letter
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={handlePrint} className="p-2 sm:px-4 sm:py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2 transition-all"><Printer className="w-4 h-4" /><span className="hidden sm:inline">Print</span></button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={() => setShowShareModal(true)} 
                className="p-2 sm:px-4 sm:py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-800 flex items-center gap-2 transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden lg:inline">Share Link</span>
              </button>

              <button 
                onClick={handleExportPDF} 
                disabled={isExporting} 
                className="p-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 transition-all active:scale-95"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span className="hidden sm:inline">PDF</span>
              </button>
              
              <button 
                onClick={handleExportWord} 
                disabled={isExportingWord} 
                className="p-2 sm:px-4 sm:py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50 disabled:opacity-50 flex items-center gap-2 transition-all active:scale-95"
              >
                {isExportingWord ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                <span className="hidden sm:inline">Word</span>
              </button>
            </div>
          </div>
        </header>

        <div ref={containerRef} className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 bg-slate-200/50 print:bg-white print:p-0">
          <div className="mx-auto print:mx-0">
            <AnimatePresence mode="wait">
              {showExportSuccess && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 pointer-events-none font-semibold"><FileText className="w-5 h-5" />Success! Your resume is ready.</motion.div>}
            </AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="font-sans">
              <ResumePreview data={data} ref={previewRef} />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 flex items-center z-40 px-6 print:hidden">
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
