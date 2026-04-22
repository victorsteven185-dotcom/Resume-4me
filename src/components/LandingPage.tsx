import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Target, ShieldCheck, Monitor, Search, X, ChevronRight, Calculator, Stethoscope, Briefcase, GraduationCap, Code, Utensils, Settings, TrendingUp, Palette, FileText, Share2, Cpu, Database, Server, Activity } from 'lucide-react';
import { ResumeData } from '../types';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { JOB_CATEGORIES, ALL_JOBS } from '../constants/jobs';

const FloatingShape = ({ className, delay = 0, duration = 10 }: { className?: string; delay?: number; duration?: number }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-30 ${className}`}
    animate={{
      y: [0, 50, -20, 0],
      x: [0, -30, 40, 0],
      scale: [1, 1.2, 0.8, 1],
      rotate: [0, 90, 180, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const Particle = ({ i }: { i: number; key?: any }) => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = Math.random() * 4 + 2;
  const duration = Math.random() * 20 + 20;

  return (
    <motion.div
      className="absolute bg-indigo-200/40 rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
      }}
      animate={{
        y: [0, -100, 0],
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay: Math.random() * 10,
        ease: "linear",
      }}
    />
  );
};

const TEMPLATES: { id: ResumeData['templateId']; name: string; desc: string; color: string; category: string }[] = [
  { id: 'professional', name: 'Professional Architecture', desc: 'The gold standard for corporate and engineering roles.', color: 'bg-slate-900', category: 'General' },
  { id: 'creative', name: 'Creative Portfolio', desc: 'Expressive layout for designers, artists, and innovators.', color: 'bg-indigo-600', category: 'Creative' },
  { id: 'editorial', name: 'Editorial Story', desc: 'Magazine-style flow for content leaders and researchers.', color: 'bg-pink-600', category: 'Academic' },
  { id: 'minimal', name: 'Infinite Minimal', desc: 'Focus on purity. High-density information, zero noise.', color: 'bg-slate-300', category: 'Administrative' },
  { id: 'technical', name: 'Technical Console', desc: 'Monospace aesthetics for developers and engineers.', color: 'bg-emerald-600', category: 'Tech' },
  { id: 'bold', name: 'Brutalist Neo', desc: 'High-contrast impact for career changers and visionaries.', color: 'bg-black', category: 'Creative' },
  { id: 'medical', name: 'Clinical Trust', desc: 'Trustworthy layout for healthcare and nursing specialists.', color: 'bg-blue-600', category: 'Medical' },
  { id: 'executive', name: 'Global Executive', desc: 'Serif-driven authority for leadership and C-suite roles.', color: 'bg-slate-800', category: 'Executive' },
  { id: 'accounting', name: 'Fiscal Precision', desc: 'Structured focus for finance, audit, and accounting.', color: 'bg-slate-700', category: 'Finance' },
  { id: 'student', name: 'The Graduate', desc: 'Skill-forward design for students and interns.', color: 'bg-indigo-500', category: 'Student' },
  { id: 'culinary', name: 'Cuisine Artist', desc: 'Vibrant layout for chefs, bakers, and food hospitality.', color: 'bg-orange-600', category: 'Culinary' },
  { id: 'engineering', name: 'Blueprint Engine', desc: 'Draftsman-inspired layout for civil and structural engineers.', color: 'bg-slate-900', category: 'Engineering' },
  { id: 'sales', name: 'Market Hero', desc: 'Results-driven focus for sales and account managers.', color: 'bg-rose-600', category: 'Sales' },
];

export const LandingPage = ({ onSelectTemplate }: { onSelectTemplate: (id: ResumeData['templateId']) => void }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<typeof ALL_JOBS[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredJobs = useMemo(() => {
    if (!search || search.length < 2) return [];
    return ALL_JOBS.filter(j => j.title.toLowerCase().includes(search.toLowerCase())).slice(0, 5);
  }, [search]);

  const recommendedTemplates = useMemo(() => {
    if (!selectedJob) return TEMPLATES;
    const recommended = TEMPLATES.filter(t => t.id === selectedJob.recommendedTemplate);
    const others = TEMPLATES.filter(t => t.id !== selectedJob.recommendedTemplate);
    return [...recommended, ...others];
  }, [selectedJob]);

  const handleSelectTemplate = (id: ResumeData['templateId']) => {
    onSelectTemplate(id);
    navigate('/editor');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      {/* Global Floating Background Icons */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] flex flex-wrap gap-40 p-20">
          {[...Array(50)].map((_, i) => {
            const icons = [FileText, ShieldCheck, Zap, Sparkles, Monitor, Database, Cpu];
            const Icon = icons[i % icons.length];
            return <Icon key={i} className="w-12 h-12" />;
          })}
        </motion.div>
      </div>

      {/* Simple Navigation */}
      <nav className="fixed top-0 w-full z-100 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 border-l-2 border-slate-100 pl-3 ml-1">Resume4me</span>
        </div>

        <div className="flex-1 max-w-xl mx-8 relative hidden md:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="What job are you aiming for? (e.g. Project Manager)" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm font-medium focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <AnimatePresence>
            {filteredJobs.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 w-full mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-[60]">
                {filteredJobs.map((job, i) => (
                  <button key={i} onClick={() => { setSelectedJob(job); setSearch(job.title); }} className="w-full text-left p-4 hover:bg-indigo-50 rounded-2xl flex items-center justify-between group transition-colors">
                    <div>
                      <div className="text-sm font-black text-slate-900 group-hover:text-indigo-700 transition-colors">{job.title}</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{job.category} Standard</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={() => navigate('/cover-letter')} className="hidden sm:block text-xs font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors">AI Cover Letter</button>
           <button onClick={() => navigate('/editor')} className="text-xs font-black uppercase tracking-widest px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95">Build My CV</button>
        </div>
      </nav>

      {/* Simple Bootstrap-style Hero Section with Floating Success Elements */}
      <header className="pt-40 pb-32 px-6 bg-white border-b border-slate-100 relative overflow-hidden">
        {/* Floating Background Blobs */}
        <div className="absolute inset-0 z-0">
          <FloatingShape className="w-96 h-96 bg-indigo-100 -top-20 -left-20" delay={0} />
          <FloatingShape className="w-[500px] h-[500px] bg-sky-50 top-1/2 -right-40" delay={2} />
          <FloatingShape className="w-80 h-80 bg-purple-50 bottom-0 left-1/3" delay={4} />
          {[...Array(20)].map((_, i) => <Particle key={i} i={i} />)}
        </div>

        {/* Mouse Follower Gradient */}
        <motion.div 
          className="pointer-events-none fixed z-[-1] w-[800px] h-[800px] rounded-full opacity-20 filter blur-[120px]"
          animate={{
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 50 }}
        />

        {/* Floating Success Elements Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Hired Bubble 1 */}
          <motion.div 
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute top-[20%] left-[10%] hidden lg:flex items-center gap-3 bg-white p-3 rounded-2xl shadow-xl border border-slate-100"
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-emerald-500">
              <img src="https://picsum.photos/seed/hired1/100/100" alt="Hired User" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase text-emerald-600">Land the Job</div>
              <div className="text-xs font-bold text-slate-900 leading-none">Hired at Google</div>
            </div>
          </motion.div>

          {/* Hired Bubble 2 */}
          <motion.div 
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
            className="absolute top-[40%] right-[12%] hidden lg:flex items-center gap-3 bg-white p-3 rounded-2xl shadow-xl border border-slate-100"
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-indigo-500">
              <img src="https://picsum.photos/seed/hired2/100/100" alt="Hired User" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase text-indigo-600">Interview Secured</div>
              <div className="text-xs font-bold text-slate-900 leading-none">Senior Architect</div>
            </div>
          </motion.div>

          {/* Floating Achievement Badge */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute bottom-[25%] left-[15%] hidden lg:flex flex-col items-center gap-2 bg-indigo-600 p-4 rounded-3xl shadow-2xl shadow-indigo-200 text-white"
          >
            <Zap className="w-6 h-6 fill-white" />
            <div className="text-[10px] font-black uppercase tracking-tighter">ATS Verified</div>
          </motion.div>

          {/* Decorative Sparkles */}
          <div className="absolute top-[15%] right-[25%] opacity-20">
            <Sparkles className="w-12 h-12 text-indigo-200 animate-pulse" />
          </div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Professional Resume Builder</span>
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
            Land Your Dream Job with <br />
            <span className="text-indigo-600">a Recruiter-Approved CV.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12">
            Build a professional, ATS-friendly resume and <span className="font-bold text-slate-900 underline decoration-indigo-600 underline-offset-4">AI-powered cover letter</span> in minutes—no design skills required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/editor')} 
              className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-3"
            >
               Build My Resume <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/cover-letter')} 
              className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
            >
               Draft Cover Letter <Sparkles className="w-5 h-5 text-indigo-500" />
            </button>
          </div>

          {/* Trust Badge / Proof */}
          <div className="mt-20 flex flex-col items-center gap-4 opacity-60">
             <div className="flex -space-x-3">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden ring-2 ring-slate-50">
                    <img src={`https://picsum.photos/seed/u${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                 </div>
               ))}
             </div>
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">10,000+ Careers Crafted This Month</span>
          </div>
        </div>
      </header>

      {/* 3-Step Process - "The Path to Employment" */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-24">
             <h2 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-600 mb-6">The Success Blueprint</h2>
             <p className="text-5xl font-black tracking-tight leading-none uppercase italic">How to get the job in <span className="text-indigo-600">3 simple steps.</span></p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-[15%] left-[20%] right-[20%] h-[2px] bg-indigo-100 z-0"></div>
            
            <StepCard 
              num="01"
              title="Select Your Blueprint"
              desc="Choose from a curated library of high-performance templates engineered by hiring experts to grab instant attention."
              icon={<Target className="w-8 h-8 text-indigo-600" />}
            />
            <StepCard 
              num="02"
              title="Maximize Your Impact"
              desc="Transform static job duties into dynamic, achievement-oriented bullets using our built-in AI career strategist."
              icon={<Zap className="w-8 h-8 text-amber-500" />}
            />
            <StepCard 
              num="03"
              title="Share Your Portfolio"
              desc="Generate a professional web link for your resume or export to PDF/Word to land premium career opportunities instantly."
              icon={<Share2 className="w-8 h-8 text-indigo-600" />}
            />
          </div>
        </div>
      </section>

      {/* "The Backend Engine" Section (Playful nod to PHP request) */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.2),transparent_70%)]" />
          <svg className="w-full h-full opacity-20">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/30">
                <Cpu className="w-4 h-4" /> Real-time Kernel Processing
              </div>
              <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter leading-tight uppercase">
                High-Speed <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400">CV Engine.</span>
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed max-w-xl">
                Our ultra-low latency infrastructure transforms your career history into a professional, recruiter-ready CV in <span className="text-white font-bold underline decoration-indigo-500 underline-offset-4">seconds</span>. No lag. Just pure performance.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="space-y-2">
                  <div className="text-3xl font-black text-white">1.02s</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Average Generation Time</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-black text-white">100%</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Processing Success</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-indigo-600/20 blur-[100px] rounded-full scale-75 animate-pulse" />
              <div className="relative w-full h-full bg-slate-800 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">System Core / CLI</div>
                </div>
                
                <div className="flex-1 mt-8 font-mono text-xs text-indigo-300 leading-relaxed overflow-hidden flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-slate-500">$</span>
                    <span>php cv_engine.php --build-template</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="space-y-2">
                       <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Memory Mapping</div>
                       <motion.div 
                        className="w-full h-1 bg-white/5 rounded-full overflow-hidden"
                       >
                         <motion.div 
                          animate={{ width: ['0%', '100%'] }} 
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="h-full bg-indigo-500" 
                         />
                       </motion.div>
                       <div className="text-[10px] text-slate-400">Loading experience_data...</div>
                       <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                        className="p-2 bg-slate-900/50 rounded border border-white/5"
                       >
                         <span className="text-emerald-400">VAR</span> user_metadata = [ ... ]
                       </motion.div>
                    </div>
                    
                    <div className="p-3 bg-slate-900 rounded-xl border border-white/5 relative overflow-hidden">
                       <div className="text-[10px] text-slate-500 uppercase mb-2 font-black">Live Reconstruction</div>
                       <div className="space-y-1.5 scale-75 origin-top-left">
                          <motion.div animate={{ width: [10, 40, 20] }} className="h-2 bg-indigo-500/50 rounded" />
                          <motion.div animate={{ width: [30, 80, 50] }} transition={{ delay: 0.1 }} className="h-1 bg-slate-700 rounded" />
                          <motion.div animate={{ width: [20, 70, 40] }} transition={{ delay: 0.2 }} className="h-1 bg-slate-700 rounded" />
                          <div className="pt-2 space-y-1">
                             <motion.div animate={{ opacity: [0.2, 1, 0.2] }} className="h-4 bg-emerald-500/20 rounded border border-emerald-500/30 flex items-center px-1">
                                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                             </motion.div>
                             <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ delay: 0.5 }} className="h-4 bg-indigo-500/20 rounded border border-indigo-500/30" />
                          </div>
                       </div>
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-4 flex items-center justify-between"
                  >
                    <div className="text-emerald-400 flex items-center gap-2">
                       <Activity className="w-3 h-3" />
                       <span className="text-[10px] font-black italic">OPTIMIZING ATS PATHS...</span>
                    </div>
                    <div className="text-slate-500 text-[10px]">VER 2.4.0</div>
                  </motion.div>
                </div>

                <div className="h-24 bg-slate-900/50 rounded-2xl border border-white/5 flex items-center justify-around px-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <motion.div 
                         animate={{ height: [20, 40, 20] }}
                         transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                         className="w-1 bg-indigo-500 rounded-full"
                      />
                      <div className="w-1 h-1 bg-slate-700 rounded-full" />
                    </div>
                  ))}
                  <div className="text-right">
                    <div className="text-[10px] font-mono font-bold text-slate-500">CORES ACTIVE</div>
                    <div className="text-xs font-mono font-bold text-white">4 x 3.2GHz</div>
                  </div>
                </div>
              </div>

              {/* Floating server bits */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 bg-white text-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-slate-400">Load Time</div>
                  <div className="text-sm font-bold">12ms Response</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Template Engine Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">Template Gallery</h2>
              <p className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
                Choose your template.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {selectedJob && (
                <button onClick={() => setSelectedJob(null)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all mr-4">
                  <X className="w-4 h-4" /> Reset Filters
                </button>
              )}
              {/* Carousel Controls */}
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button 
                  onClick={() => {
                    const el = document.getElementById('template-carousel');
                    if (el) el.scrollBy({ left: -400, behavior: 'smooth' });
                  }}
                  className="p-3 bg-white text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('template-carousel');
                    if (el) el.scrollBy({ left: 400, behavior: 'smooth' });
                  }}
                  className="p-3 bg-white text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div 
            id="template-carousel"
            className="flex gap-8 overflow-x-auto pb-12 transition-all scroll-smooth no-scrollbar scrollbar-hide snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <AnimatePresence mode="popLayout">
              {recommendedTemplates.map((template, idx) => (
                <motion.div
                  layout
                  key={template.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleSelectTemplate(template.id)}
                  className="min-w-[320px] md:min-w-[380px] group cursor-pointer snap-start"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-600 transition-all shadow-sm hover:shadow-2xl relative">
                    {selectedJob && template.id === selectedJob.recommendedTemplate && (
                      <div className="absolute top-4 left-4 z-10 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-lg">
                        Recommended
                      </div>
                    )}
                    <div className={`aspect-[3/4] ${template.color} relative overflow-hidden flex items-center justify-center p-8 bg-slate-50`}>
                        <div className="w-full h-full bg-white rounded shadow-2xl border border-slate-100 p-6 flex flex-col gap-3 group-hover:scale-[1.02] transition-transform duration-500">
                           <div className="w-2/3 h-4 bg-slate-100 rounded" />
                           <div className="w-full h-2 bg-slate-50 rounded" />
                           <div className="w-full h-2 bg-slate-50 rounded" />
                           <div className="grid grid-cols-2 gap-4 mt-4">
                              <div className="h-20 bg-slate-50 rounded" />
                              <div className="h-20 bg-slate-50 rounded" />
                           </div>
                           <div className="mt-auto flex justify-between items-center">
                              <div className="w-12 h-12 rounded-full bg-slate-100" />
                              <div className="w-24 h-2 bg-slate-100 rounded" />
                           </div>
                        </div>
                    </div>
                    <div className="p-8">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{template.category}</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{template.name}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-8 h-8 overflow-hidden">{template.desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-[10px]">
                          Preview Template <ArrowRight className="w-3 h-3" />
                        </div>
                        <div className="flex -space-x-2">
                           {[1,2,3].map(i => (
                             <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                                <img src={`https://picsum.photos/seed/tp${template.id}${i}/100/100`} alt="User" />
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 bg-slate-900 text-white border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20">
            <div className="max-w-md">
               <h2 className="text-4xl font-black italic mb-8 tracking-tighter text-indigo-600">Resume4me</h2>
               <p className="text-slate-400 text-lg leading-relaxed mb-8">Optimizing your career path with AI-driven precision. We help you build a high-impact professional brand and land your next role faster.</p>
               <div className="flex gap-4">
                  {['React', 'Vite', 'Gemini', 'PDF_Lib'].map(t => (
                    <span key={t} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-lg">{t}</span>
                  ))}
               </div>
            </div>
            <div className="grid grid-cols-2 gap-20">
               <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Product</h3>
                  <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-slate-300">
                     <li className="hover:text-indigo-400 transition-colors cursor-pointer">Templates</li>
                     <li className="hover:text-indigo-400 transition-colors cursor-pointer">AI Writing</li>
                     <li className="hover:text-indigo-400 transition-colors cursor-pointer">ATS Check</li>
                     <li className="hover:text-indigo-400 transition-colors cursor-pointer">Pricing</li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Company</h3>
                  <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-slate-300">
                     <li className="hover:text-indigo-400 transition-colors cursor-pointer">About</li>
                     <li className="hover:text-indigo-400 transition-colors cursor-pointer">Legal</li>
                     <li className="hover:text-indigo-400 transition-colors cursor-pointer">Contact</li>
                     <li className="hover:text-indigo-400 transition-colors cursor-pointer">Careers</li>
                  </ul>
               </div>
            </div>
          </div>
          <div className="mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
             <span className="text-xs font-black uppercase tracking-widest text-slate-500 italic">© 2026 Resume4me / The Workforce Engine.</span>
             <div className="flex items-center gap-10">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">All Systems Operational</span>
                </div>
                <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Runtime: Gemini_Ultra_1.5</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StepCard = ({ num, title, desc, icon }: { num: string; title: string; desc: string; icon: React.ReactNode }) => (
  <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
    <div className="mb-6 p-4 bg-slate-50 text-slate-900 rounded-xl w-fit transition-colors group-hover:bg-indigo-600 group-hover:text-white">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const TechBadge = ({ label }: { label: string }) => (
  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest">
    {label}
  </div>
);

