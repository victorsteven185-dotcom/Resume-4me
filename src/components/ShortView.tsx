import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResumeBySlug } from '../services/resumeService';
import { ResumePreview } from './ResumePreview';
import { ResumeData } from '../types';
import { Loader2, AlertCircle, FileX } from 'lucide-react';
import { motion } from 'motion/react';

export const ShortView = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResume = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const resumeData = await getResumeBySlug(slug);
        if (resumeData) {
          setData(resumeData);
        } else {
          setError('Resume not found. The link might be expired or incorrect.');
        }
      } catch (err: any) {
        setError('Failed to fetch resume. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-slate-900">Fetching Resume...</h2>
        <p className="text-slate-500 mt-2">Our high-speed engine is retrieving your data.</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <FileX className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 underline decoration-red-500 underline-offset-8 decoration-4">404: RESUME NOT FOUND</h2>
        <p className="text-slate-500 mt-6 max-w-sm mx-auto leading-relaxed font-medium capitalize">
          {error}
        </p>
        <button 
          onClick={() => navigate('/')}
          className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all uppercase tracking-widest text-xs"
        >
          Build Your Own Resume
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-[210mm] mx-auto shadow-2xl rounded-sm overflow-hidden">
        <ResumePreview data={data} />
      </div>
      
      {/* Footer Branding */}
      <div className="mt-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          Powered by <span className="text-indigo-600 italic">Resume4me</span> High-Speed Engine
        </p>
      </div>
    </div>
  );
};
