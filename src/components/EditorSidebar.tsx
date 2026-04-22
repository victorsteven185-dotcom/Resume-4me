import { useState, useRef, useEffect } from 'react';
import { ResumeData } from '../types';
import { 
  User, Briefcase, GraduationCap, Code, FolderGit2, Plus, Trash2, ChevronDown, ChevronRight, Sparkles, Loader2, Monitor, Check, Users, Eye
} from 'lucide-react';
import { cn } from '../lib/utils';
import { polishResumeContent } from '../services/geminiService';
import { ResumePreview } from './ResumePreview';

interface EditorSidebarProps {
  data: ResumeData;
  onUpdatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  onUpdateExperience: (id: string, info: Partial<ResumeData['experiences'][0]>) => void;
  onAddExperience: () => void;
  onRemoveExperience: (id: string) => void;
  onUpdateEducation: (id: string, info: Partial<ResumeData['education'][0]>) => void;
  onAddEducation: () => void;
  onRemoveEducation: (id: string) => void;
  onUpdateProject: (id: string, info: Partial<ResumeData['projects'][0]>) => void;
  onAddProject: () => void;
  onRemoveProject: (id: string) => void;
  onUpdateSkills: (skills: string[]) => void;
  onUpdateSoftSkills: (skills: string[]) => void;
  onUpdateTemplate: (templateId: ResumeData['templateId']) => void;
}

export const EditorSidebar = ({
  data,
  onUpdatePersonalInfo,
  onUpdateExperience,
  onAddExperience,
  onRemoveExperience,
  onUpdateEducation,
  onAddEducation,
  onRemoveEducation,
  onUpdateProject,
  onAddProject,
  onRemoveProject,
  onUpdateSkills,
  onUpdateSoftSkills,
  onUpdateTemplate
}: EditorSidebarProps) => {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [polishingId, setPolishingId] = useState<string | null>(null);
  const quickPreviewRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.4);

  useEffect(() => {
    const updateScale = () => {
      if (activeSection === 'quick-preview' && quickPreviewRef.current) {
        const width = quickPreviewRef.current.offsetWidth;
        setPreviewScale(width / 794);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [activeSection]);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  const handlePolish = async (id: string, text: string, type: 'summary' | 'experience' | 'project') => {
    setPolishingId(id);
    const polished = await polishResumeContent(text, type);
    if (type === 'summary') onUpdatePersonalInfo({ summary: polished });
    else if (type === 'experience') onUpdateExperience(id, { description: polished });
    else if (type === 'project') onUpdateProject(id, { description: polished });
    setPolishingId(null);
  };

  return (
    <div className="h-full bg-white border-r border-slate-200 overflow-y-auto w-full max-w-md flex flex-col">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-xl font-bold font-display flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Editor
        </h2>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Quick Preview - Only visible on small screens to give context while editing */}
        <section className="bg-white rounded-xl overflow-hidden border border-indigo-100 shadow-sm md:hidden">
          <button 
            onClick={() => toggleSection('quick-preview')}
            className="w-full flex items-center justify-between p-4 font-bold text-indigo-900 bg-indigo-50/50 hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-600" />
              Quick Preview
            </div>
            {activeSection === 'quick-preview' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          {activeSection === 'quick-preview' && (
            <div className="p-4 bg-slate-100/50 overflow-hidden flex flex-col items-center">
              <div 
                ref={quickPreviewRef}
                className="w-full origin-top transform-gpu"
                style={{ 
                  height: `${(297 * 3.78) * previewScale}px`,
                }}
              >
                <div style={{ transform: `scale(${previewScale})`, transformOrigin: 'top left' }}>
                  <ResumePreview data={data} />
                </div>
              </div>
              <p className="mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">Live Preview (Scaled)</p>
            </div>
          )}
        </section>

        {/* Personal Info */}
        <section className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
          <button 
            onClick={() => toggleSection('personal')}
            className="w-full flex items-center justify-between p-4 font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-500" />
              Personal Info
            </div>
            {activeSection === 'personal' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          {activeSection === 'personal' && (
            <div className="p-4 space-y-4 pt-0">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Full Name" value={data.personalInfo.fullName} onChange={(val) => onUpdatePersonalInfo({ fullName: val })} />
                <Input label="Email" value={data.personalInfo.email} onChange={(val) => onUpdatePersonalInfo({ email: val })} />
                <Input label="Phone" value={data.personalInfo.phone} onChange={(val) => onUpdatePersonalInfo({ phone: val })} />
                <Input label="Location" value={data.personalInfo.location} onChange={(val) => onUpdatePersonalInfo({ location: val })} />
                <Input label="Website" value={data.personalInfo.website} onChange={(val) => onUpdatePersonalInfo({ website: val })} />
                <Input label="LinkedIn" value={data.personalInfo.linkedin} onChange={(val) => onUpdatePersonalInfo({ linkedin: val })} />
                <Input label="GitHub" value={data.personalInfo.github} onChange={(val) => onUpdatePersonalInfo({ github: val })} />
              </div>
              
              {/* Regional Fields */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 italic">Regional / Traditional Details</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Date of Birth" value={data.personalInfo.dateOfBirth} onChange={(val) => onUpdatePersonalInfo({ dateOfBirth: val })} placeholder="e.g. 12th Feb, 1993" />
                  <Input label="Nationality" value={data.personalInfo.nationality} onChange={(val) => onUpdatePersonalInfo({ nationality: val })} />
                  <Input label="State of Origin" value={data.personalInfo.stateOfOrigin} onChange={(val) => onUpdatePersonalInfo({ stateOfOrigin: val })} />
                  <Input label="L.G.A" value={data.personalInfo.lga} onChange={(val) => onUpdatePersonalInfo({ lga: val })} />
                  <Input label="Marital Status" value={data.personalInfo.maritalStatus} onChange={(val) => onUpdatePersonalInfo({ maritalStatus: val })} />
                  <Input label="Gender" value={data.personalInfo.gender} onChange={(val) => onUpdatePersonalInfo({ gender: val })} />
                  <Input label="Religion" value={data.personalInfo.religion} onChange={(val) => onUpdatePersonalInfo({ religion: val })} />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <Input label="Hobbies" value={data.personalInfo.hobbies} onChange={(val) => onUpdatePersonalInfo({ hobbies: val })} />
                <TextArea label="Reference" value={data.personalInfo.reference} onChange={(val) => onUpdatePersonalInfo({ reference: val })} rows={3} />
              </div>

              <div className="relative">
                <TextArea 
                  label="Professional Summary" 
                  value={data.personalInfo.summary} 
                  onChange={(val) => onUpdatePersonalInfo({ summary: val })} 
                />
                <button 
                  onClick={() => handlePolish('summary', data.personalInfo.summary, 'summary')}
                  disabled={polishingId === 'summary'}
                  className="absolute bottom-2 right-2 p-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 disabled:opacity-50"
                  title="Optimize with AI"
                >
                  {polishingId === 'summary' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Experience */}
        <section className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
          <button 
            onClick={() => toggleSection('experience')}
            className="w-full flex items-center justify-between p-4 font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-500" />
              Experience
            </div>
            {activeSection === 'experience' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          {activeSection === 'experience' && (
            <div className="p-4 space-y-6 pt-0">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="p-3 bg-white rounded-lg border border-slate-200 relative group">
                  <button 
                    onClick={() => onRemoveExperience(exp.id)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <Input label="Title" value={exp.jobTitle} onChange={(val) => onUpdateExperience(exp.id, { jobTitle: val })} />
                    <Input label="Company" value={exp.company} onChange={(val) => onUpdateExperience(exp.id, { company: val })} />
                    <Input label="Start Date" value={exp.startDate} onChange={(val) => onUpdateExperience(exp.id, { startDate: val })} placeholder="e.g. 2020-01" />
                    <Input label="End Date" value={exp.endDate} onChange={(val) => onUpdateExperience(exp.id, { endDate: val })} placeholder="e.g. Present" />
                  </div>
                  <div className="relative">
                    <TextArea 
                      label="Description" 
                      value={exp.description} 
                      onChange={(val) => onUpdateExperience(exp.id, { description: val })} 
                      rows={4}
                    />
                    <button 
                      onClick={() => handlePolish(exp.id, exp.description, 'experience')}
                      disabled={polishingId === exp.id}
                      className="absolute bottom-2 right-2 p-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 disabled:opacity-50"
                      title="Optimize with AI"
                    >
                      {polishingId === exp.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
              <button 
                onClick={onAddExperience}
                className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>
          )}
        </section>

        {/* Projects */}
        <section className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
          <button 
            onClick={() => toggleSection('projects')}
            className="w-full flex items-center justify-between p-4 font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-indigo-500" />
              Projects
            </div>
            {activeSection === 'projects' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          {activeSection === 'projects' && (
            <div className="p-4 space-y-4 pt-0">
              {data.projects.map((project) => (
                <div key={project.id} className="p-3 bg-white rounded-lg border border-slate-200 relative group">
                   <button 
                    onClick={() => onRemoveProject(project.id)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <Input label="Project Name" value={project.title} onChange={(val) => onUpdateProject(project.id, { title: val })} />
                    <Input label="Link" value={project.link} onChange={(val) => onUpdateProject(project.id, { link: val })} />
                  </div>
                  <div className="relative">
                    <TextArea 
                      label="Description" 
                      value={project.description} 
                      onChange={(val) => onUpdateProject(project.id, { description: val })} 
                    />
                    <button 
                      onClick={() => handlePolish(project.id, project.description, 'project')}
                      disabled={polishingId === project.id}
                      className="absolute bottom-2 right-2 p-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 disabled:opacity-50"
                    >
                      {polishingId === project.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
              <button 
                onClick={onAddProject}
                className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>
          )}
        </section>

        {/* Education */}
        <section className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
          <button 
            onClick={() => toggleSection('education')}
            className="w-full flex items-center justify-between p-4 font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              Education
            </div>
            {activeSection === 'education' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          {activeSection === 'education' && (
            <div className="p-4 space-y-4 pt-0">
               {data.education.map((edu) => (
                <div key={edu.id} className="p-3 bg-white rounded-lg border border-slate-200 relative group">
                  <button 
                    onClick={() => onRemoveEducation(edu.id)}
                    className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="space-y-3">
                    <Input label="Degree" value={edu.degree} onChange={(val) => onUpdateEducation(edu.id, { degree: val })} />
                    <Input label="School" value={edu.school} onChange={(val) => onUpdateEducation(edu.id, { school: val })} />
                    <div className="grid grid-cols-2 gap-3">
                      <Input label="Start Date" value={edu.startDate} onChange={(val) => onUpdateEducation(edu.id, { startDate: val })} />
                      <Input label="End Date" value={edu.endDate} onChange={(val) => onUpdateEducation(edu.id, { endDate: val })} />
                    </div>
                  </div>
                </div>
               ))}
               <button 
                onClick={onAddEducation}
                className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium"
              >
                <Plus className="w-4 h-4" /> Add Education
              </button>
            </div>
          )}
        </section>

        {/* Template Selection */}
        <section className="bg-white rounded-xl overflow-hidden border border-indigo-100 shadow-sm">
          <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-900">Choose Template</h3>
          </div>
          <div className="p-4 grid grid-cols-1 gap-2">
            <TemplateButton 
              active={data.templateId === 'professional'} 
              onClick={() => onUpdateTemplate('professional')}
              label="Professional Architecture"
              desc="Best for Engineering & Tech"
            />
            <TemplateButton 
              active={data.templateId === 'creative'} 
              onClick={() => onUpdateTemplate('creative')}
              label="Modern Creative"
              desc="Best for Design & Marketing"
            />
            <TemplateButton 
              active={data.templateId === 'editorial'} 
              onClick={() => onUpdateTemplate('editorial')}
              label="Executive Editorial"
              desc="Best for Management & Legal"
            />
            <TemplateButton 
              active={data.templateId === 'minimal'} 
              onClick={() => onUpdateTemplate('minimal')}
              label="Pure Minimalist"
              desc="Clean & Ultra-Functional"
            />
            <TemplateButton 
              active={data.templateId === 'technical'} 
              onClick={() => onUpdateTemplate('technical')}
              label="Technical Console"
              desc="Perfect for Data & STEM"
            />
            <TemplateButton 
              active={data.templateId === 'bold'} 
              onClick={() => onUpdateTemplate('bold')}
              label="Brutalist Neo"
              desc="Bold Creative Impact"
            />
            <TemplateButton 
              active={data.templateId === 'medical'} 
              onClick={() => onUpdateTemplate('medical')}
              label="Clinical Trust"
              desc="Medical & Nursing Standard"
            />
            <TemplateButton 
              active={data.templateId === 'executive'} 
              onClick={() => onUpdateTemplate('executive')}
              label="Global Executive"
              desc="Leadership & C-Suite Authority"
            />
            <TemplateButton 
              active={data.templateId === 'accounting'} 
              onClick={() => onUpdateTemplate('accounting')}
              label="Fiscal Precision"
              desc="Finance & Audit Expert"
            />
            <TemplateButton 
              active={data.templateId === 'student'} 
              onClick={() => onUpdateTemplate('student')}
              label="The Graduate"
              desc="Internship & Entry Level"
            />
            <TemplateButton 
              active={data.templateId === 'culinary'} 
              onClick={() => onUpdateTemplate('culinary')}
              label="Cuisine Artist"
              desc="Chef & Hospitality Vibe"
            />
            <TemplateButton 
              active={data.templateId === 'engineering'} 
              onClick={() => onUpdateTemplate('engineering')}
              label="Blueprint Engine"
              desc="Structural & Civil Precision"
            />
            <TemplateButton 
              active={data.templateId === 'sales'} 
              onClick={() => onUpdateTemplate('sales')}
              label="Market Hero"
              desc="Sales & Growth Performance"
            />
            <TemplateButton 
              active={data.templateId === 'traditional'} 
              onClick={() => onUpdateTemplate('traditional')}
              label="Traditional Heritage"
              desc="Classic Regional Standard"
            />
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
          <button 
            onClick={() => toggleSection('skills')}
            className="w-full flex items-center justify-between p-4 font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-500" />
              Skills & Expertise
            </div>
            {activeSection === 'skills' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          {activeSection === 'skills' && (
            <div className="p-4 pt-0">
              <textarea 
                className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 min-h-[100px] outline-none text-sm placeholder:text-slate-400"
                placeholder="List your skills separated by commas (e.g. React, TypeScript, AWS)"
                value={data.skills.join(', ')}
                onChange={(e) => onUpdateSkills(e.target.value.split(',').map(s => s.trim()))}
              />
              <p className="mt-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">Separate with commas</p>
            </div>
          )}
        </section>

        {/* Soft Skills Section */}
        <section className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
          <button 
            onClick={() => toggleSection('softSkills')}
            className="w-full flex items-center justify-between p-4 font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-500" />
              Soft Skills
            </div>
            {activeSection === 'softSkills' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          {activeSection === 'softSkills' && (
            <div className="p-4 pt-0">
              <textarea 
                className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 min-h-[100px] outline-none text-sm placeholder:text-slate-400"
                placeholder="List your soft skills separated by commas (e.g. Teamwork, Communication, Problem Solving)"
                value={data.softSkills?.join(', ') || ''}
                onChange={(e) => onUpdateSoftSkills(e.target.value.split(',').map(s => s.trim()))}
              />
              <p className="mt-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">Separate with commas</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder }: { label: string, value?: string, onChange: (val: string) => void, placeholder?: string }) => (
  <div>
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">{label}</label>
    <input 
      type="text" 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)} 
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
    />
  </div>
);

const TextArea = ({ label, value, onChange, rows = 3 }: { label: string, value?: string, onChange: (val: string) => void, rows?: number }) => (
  <div className="w-full">
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">{label}</label>
    <textarea 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)} 
      rows={rows}
      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none placeholder:text-slate-300"
    />
  </div>
);

const TemplateButton = ({ active, onClick, label, desc }: { active: boolean, onClick: () => void, label: string, desc: string }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full text-left p-3.5 rounded-xl transition-all border-2 relative group overflow-hidden",
      active 
        ? "bg-indigo-50 border-indigo-600 ring-4 ring-indigo-600/5 shadow-lg" 
        : "bg-white border-slate-100 hover:border-indigo-200 text-slate-600 shadow-sm"
    )}
  >
    <div className="flex justify-between items-center mb-1.5">
      <span className={cn(
        "font-bold text-sm tracking-tight transition-colors", 
        active ? "text-indigo-900" : "text-slate-700"
      )}>{label}</span>
      {active && (
        <div className="bg-indigo-600 text-white p-1 rounded-full shadow-sm animate-in zoom-in duration-300">
          <Check className="w-3 h-3 stroke-[3px]" />
        </div>
      )}
    </div>
    <p className={cn(
      "text-[10px] font-semibold leading-none transition-colors italic", 
      active ? "text-indigo-600" : "text-slate-400"
    )}>{desc}</p>
    
    {active && (
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600" />
    )}
  </button>
);
