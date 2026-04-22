import { forwardRef } from 'react';
import { ResumeData } from '../types';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';

interface CoverLetterPreviewProps {
  data: ResumeData;
  onUpdate?: (info: Partial<ResumeData['coverLetter']>) => void;
  onAIGenerate?: () => void;
  isGenerating?: boolean;
}

export const CoverLetterPreview = forwardRef<HTMLDivElement, CoverLetterPreviewProps>(({ data, onUpdate, onAIGenerate, isGenerating }, ref) => {
  const { personalInfo, coverLetter, templateId } = data;

  if (!coverLetter) return null;

  // Branded styles based on templateId
  const getBranding = () => {
    switch (templateId) {
      case 'creative':
        return {
          container: "bg-white font-sans",
          header: "text-center pt-8 border-b-2 border-indigo-100 pb-12 mb-12",
          name: "text-6xl font-black uppercase tracking-tight text-indigo-600 mb-4",
          meta: "text-xs font-bold uppercase tracking-[0.2em] text-slate-400 flex justify-center gap-6",
          accent: "text-indigo-600",
          date: "text-slate-300 font-bold uppercase tracking-widest text-sm mb-10",
          recipient: "space-y-1 mb-12",
          body: "text-slate-700 leading-relaxed text-[11pt]",
          signature: "border-t border-slate-100 pt-10 mt-20"
        };
      case 'technical':
        return {
          container: "bg-[#F8F9FA] font-mono",
          header: "border-b-2 border-slate-900 pb-8 mb-10",
          name: "text-4xl font-black uppercase tracking-tighter text-slate-900",
          meta: "text-[10px] font-bold text-slate-500 flex gap-4 mt-4",
          accent: "text-slate-900",
          date: "text-slate-500 font-bold mb-8",
          recipient: "space-y-1 mb-10 bg-slate-100 p-4 rounded-sm border-l-4 border-slate-900",
          body: "text-slate-800 leading-loose text-[10pt]",
          signature: "border-t-2 border-slate-900 pt-8 mt-16"
        };
      case 'editorial':
        return {
          container: "bg-[#fdfcf5] font-serif",
          header: "text-center mb-16 border-b border-slate-200 pb-12",
          name: "text-5xl font-serif font-light italic text-slate-800 mb-4",
          meta: "text-[10px] uppercase tracking-[0.3em] font-sans text-slate-400 flex justify-center gap-8",
          accent: "text-slate-300",
          date: "text-slate-400 font-sans uppercase tracking-[0.2em] text-[10px] mb-12",
          recipient: "space-y-2 mb-14 text-center mx-auto max-w-sm",
          body: "text-slate-700 leading-[1.8] text-[12pt] text-justify",
          signature: "border-t border-slate-200 pt-12 mt-24 text-center"
        };
      case 'bold':
        return {
          container: "bg-white font-sans border-l-[32px] border-black",
          header: "border-b-8 border-black pb-8 mb-12",
          name: "text-7xl font-black uppercase tracking-tighter text-black leading-none mb-4",
          meta: "text-sm font-black uppercase tracking-widest text-slate-500 flex gap-8",
          accent: "text-black",
          date: "text-black font-black uppercase tracking-widest bg-yellow-400 inline-block px-2 py-1 mb-12",
          recipient: "space-y-1 mb-12 border-l-4 border-black pl-6",
          body: "text-black font-medium leading-relaxed text-[11pt]",
          signature: "border-t-8 border-black pt-10 mt-20"
        };
      case 'minimal':
        return {
          container: "bg-white font-sans",
          header: "mb-20",
          name: "text-3xl font-light tracking-tight text-slate-900 mb-2",
          meta: "text-[11px] font-medium text-slate-400 flex gap-6",
          accent: "text-slate-200",
          date: "text-slate-400 font-medium text-sm mb-12",
          recipient: "space-y-0.5 mb-16",
          body: "text-slate-600 leading-relaxed text-[11pt]",
          signature: "pt-16 mt-20 border-t border-slate-50"
        };
      case 'executive':
        return {
          container: "bg-white font-serif",
          header: "border-b border-slate-200 pb-12 mb-12",
          name: "text-4xl font-serif text-slate-900 mb-2 tracking-tight",
          meta: "text-xs font-sans uppercase tracking-[0.15em] text-slate-500 flex gap-6",
          accent: "text-slate-400",
          date: "text-slate-500 font-sans text-sm mb-12 italic",
          recipient: "space-y-1 mb-12",
          body: "text-slate-700 leading-loose text-[11pt]",
          signature: "border-t border-slate-100 pt-12 mt-20"
        };
      case 'culinary':
        return {
          container: "bg-[#fffef2] font-serif",
          header: "border-b-4 border-orange-600 pb-10 mb-12 text-center",
          name: "text-5xl font-black uppercase text-orange-600 mb-2 tracking-widest",
          meta: "text-[10px] font-bold text-slate-400 flex justify-center gap-8",
          accent: "text-orange-200",
          date: "text-slate-400 font-bold mb-10 italic",
          recipient: "space-y-1 mb-12 text-center italic",
          body: "text-slate-700 leading-relaxed text-[11.5pt]",
          signature: "border-t-2 border-orange-100 pt-10 mt-20 text-center"
        };
      case 'accounting':
        return {
          container: "bg-white font-sans",
          header: "bg-slate-900 text-white -mx-[25mm] -mt-[25mm] p-[25mm] mb-12",
          name: "text-3xl font-black uppercase tracking-[0.1em]",
          meta: "text-[10px] uppercase font-medium text-slate-400 flex gap-6 mt-4",
          accent: "text-slate-600",
          date: "text-slate-900 font-bold mb-12",
          recipient: "space-y-1 mb-16 border-l border-slate-900 pl-8",
          body: "text-slate-800 leading-relaxed text-[10pt] tracking-tight",
          signature: "border-t-4 border-slate-900 pt-8 mt-20"
        };
      case 'sales':
        return {
          container: "bg-white font-sans",
          header: "border-b-2 border-slate-100 pb-8 mb-12 flex justify-between items-end",
          name: "text-4xl font-black text-slate-900 tracking-tighter",
          meta: "text-[10px] font-bold text-slate-400 text-right",
          accent: "text-indigo-600",
          date: "text-indigo-600 font-black mb-12 text-lg",
          recipient: "space-y-1 mb-12",
          body: "text-slate-700 leading-relaxed text-[11pt] font-medium",
          signature: "bg-slate-50 -mx-[25mm] p-[25mm] mt-20 border-t border-slate-100"
        };
      case 'medical':
        return {
          container: "bg-white font-sans",
          header: "bg-blue-50 -mx-[25mm] -mt-[25mm] p-[25mm] mb-12 border-b-4 border-blue-600",
          name: "text-4xl font-bold text-blue-900 mb-2",
          meta: "text-xs font-medium text-blue-700 flex gap-6",
          accent: "text-blue-400",
          date: "text-slate-400 font-bold mb-10",
          recipient: "space-y-1 mb-12 border-l-2 border-blue-100 pl-6",
          body: "text-slate-700 leading-relaxed text-[11pt]",
          signature: "border-t border-blue-50 pt-10 mt-20"
        };
      case 'student':
        return {
          container: "bg-white font-sans",
          header: "mb-12 border-b border-indigo-50 pb-10",
          name: "text-4xl font-bold text-slate-900 mb-2",
          meta: "text-xs font-medium text-slate-400 flex gap-6",
          accent: "text-indigo-500",
          date: "text-slate-300 font-bold mb-10",
          recipient: "space-y-1 mb-12",
          body: "text-slate-700 leading-relaxed text-[11pt]",
          signature: "pt-10 mt-16 border-t border-slate-100"
        };
      case 'engineering':
        return {
          container: "bg-white font-display",
          header: "border-2 border-slate-900 p-8 mb-12 relative after:absolute after:bottom-[-2px] after:right-[-2px] after:w-4 after:h-4 after:bg-slate-900",
          name: "text-4xl font-black uppercase text-slate-900 mb-2 tracking-tighter",
          meta: "text-[11px] font-bold text-slate-500 flex gap-6",
          accent: "text-slate-400",
          date: "text-slate-900 font-bold mb-12 underline underline-offset-4",
          recipient: "space-y-1 mb-12 border-2 border-slate-100 p-6",
          body: "text-slate-800 leading-relaxed text-[10.5pt]",
          signature: "border-2 border-slate-900 p-8 mt-20"
        };
      default: // professional style
        return {
          container: "bg-white font-sans border-t-[12px] border-slate-900",
          header: "border-b border-slate-100 pb-10 mb-12",
          name: "text-4xl font-black uppercase tracking-tight text-slate-900 mb-2",
          meta: "text-xs font-bold uppercase tracking-widest text-slate-500 flex gap-6",
          accent: "text-indigo-600",
          date: "text-slate-400 font-bold uppercase tracking-widest text-xs mb-12",
          recipient: "space-y-1 mb-14",
          body: "text-slate-700 leading-[1.7] text-[11pt]",
          signature: "border-t border-slate-100 pt-10 mt-20"
        };
    }
  };

  const style = getBranding();

  return (
    <div 
      ref={ref} 
      className={`w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[25mm] mx-auto overflow-hidden transition-all duration-500 ${style.container}`}
    >
      {/* Header / Sender Info */}
      <header className={style.header}>
        <h1 className={style.name}>{personalInfo.fullName || "Your Name"}</h1>
        <div className={style.meta}>
          <span className="flex items-center gap-2"><Mail className={`w-3.5 h-3.5 ${style.accent}`} /> <span className="opacity-80">{personalInfo.email}</span></span>
          <span className="flex items-center gap-2"><Phone className={`w-3.5 h-3.5 ${style.accent}`} /> <span className="opacity-80">{personalInfo.phone}</span></span>
          <span className="flex items-center gap-2"><MapPin className={`w-3.5 h-3.5 ${style.accent}`} /> <span className="opacity-80">{personalInfo.location}</span></span>
        </div>
      </header>

      {/* Date */}
      <div className={`${style.date} outline-none focus:text-indigo-600 transition-colors inline-block`}
           contentEditable={!!onUpdate}
           onBlur={(e) => onUpdate?.({ date: e.currentTarget.textContent || "" })}
           suppressContentEditableWarning
      >
        {coverLetter.date}
      </div>

      {/* Recipient Info */}
      <div className={style.recipient}>
        <p className="font-bold text-slate-900 leading-none outline-none focus:text-indigo-600 mb-1"
           contentEditable={!!onUpdate}
           onBlur={(e) => onUpdate?.({ recipientName: e.currentTarget.textContent || "" })}
           suppressContentEditableWarning
        >
          {coverLetter.recipientName}
        </p>
        <p className="text-slate-600 text-sm outline-none focus:text-indigo-600 mb-1"
           contentEditable={!!onUpdate}
           onBlur={(e) => onUpdate?.({ recipientTitle: e.currentTarget.textContent || "" })}
           suppressContentEditableWarning
        >
          {coverLetter.recipientTitle}
        </p>
        <p className="font-black uppercase tracking-widest text-[10px] text-slate-900 pt-2 outline-none focus:text-indigo-600"
           contentEditable={!!onUpdate}
           onBlur={(e) => onUpdate?.({ companyName: e.currentTarget.textContent || "" })}
           suppressContentEditableWarning
        >
          {coverLetter.companyName}
        </p>
        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider outline-none focus:text-indigo-600"
           contentEditable={!!onUpdate}
           onBlur={(e) => onUpdate?.({ companyAddress: e.currentTarget.textContent || "" })}
           suppressContentEditableWarning
        >
          {coverLetter.companyAddress}
        </p>
      </div>

      {/* Content */}
      <main className={`relative group/letter ${style.body}`}>
        {onUpdate ? (
          <>
            <div className="absolute -left-10 top-0 opacity-0 group-hover/letter:opacity-100 transition-opacity flex flex-col items-center gap-1 pointer-events-none">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <div className="h-20 w-[1px] bg-indigo-100" />
            </div>
            
            {coverLetter.content.length < 50 && onAIGenerate && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] z-10 rounded-xl border-2 border-dashed border-indigo-200">
                <button 
                  onClick={onAIGenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isGenerating ? <Sparkles className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  GENERATE WITH AI
                </button>
              </div>
            )}

            <textarea
              value={coverLetter.content || ''}
              onChange={(e) => onUpdate({ content: e.target.value })}
              className="w-full bg-transparent border-none outline-none resize-none overflow-hidden p-0 m-0 focus:ring-0 whitespace-pre-line selection:bg-indigo-100 placeholder:text-slate-200 min-h-[500px]"
              style={{ height: 'auto', minHeight: '500px' }}
              spellCheck={false}
              placeholder="Click here to start drafting your cover letter..."
            />
          </>
        ) : (
          <div className="whitespace-pre-line min-h-[500px]">{coverLetter.content}</div>
        )}
      </main>

      {/* Primary Expertise Section */}
      {data.skills && data.skills.length > 0 && (
        <div className="mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 flex items-center gap-4">
            Key Competencies <div className="h-[1px] bg-slate-100 flex-1" />
          </h4>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {data.skills.filter(s => s.trim()).map((skill, index) => (
              <div key={index} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <div className={`w-1 h-1 rounded-full ${style.accent.replace('text-', 'bg-') || 'bg-slate-300'}`} />
                {skill}
              </div>
            ))}
          </div>
          {data.softSkills && data.softSkills.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 opacity-70">
              {data.softSkills.filter(s => s.trim()).map((skill, index) => (
                <span key={index} className="text-[9px] font-medium text-slate-400 uppercase tracking-[0.15em] italic">
                  • {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sign-off */}
      <div className={style.signature}>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-slate-400 italic mb-8 text-sm">Sincerely,</p>
            <div className={`
              ${templateId === 'editorial' ? 'font-serif italic' : ''} 
              ${templateId === 'bold' ? 'font-black uppercase tracking-tighter' : ''}
              ${templateId === 'engineering' ? 'font-display uppercase tracking-widest border-b-2 border-slate-900 pb-1' : ''}
              ${templateId === 'accounting' ? 'font-sans font-black uppercase tracking-widest' : ''}
              ${templateId === 'culinary' ? 'font-serif italic text-orange-600' : ''}
              ${templateId === 'sales' ? 'font-sans font-black tracking-tighter text-indigo-600' : ''}
              ${!['editorial', 'bold', 'engineering', 'accounting', 'culinary', 'sales'].includes(templateId) ? 'font-bold' : ''}
              text-4xl text-slate-900
            `}>
              {personalInfo.fullName}
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-200 pointer-events-none select-none italic text-right opacity-40">
            Professional Match<br />
            {templateId.toUpperCase()} EDITION
          </div>
        </div>
      </div>
    </div>
  );
});
