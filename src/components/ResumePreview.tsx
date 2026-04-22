import { forwardRef } from 'react';
import { ResumeData } from '../types';
import { Mail, Phone, Globe, Linkedin, Github, MapPin, ExternalLink, Check, Diamond } from 'lucide-react';
import { cn } from '../lib/utils';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ data }, ref) => {
  const { templateId } = data;

  switch (templateId) {
    case 'traditional':
      return <TraditionalTemplate data={data} ref={ref} />;
    case 'creative':
      return <CreativeTemplate data={data} ref={ref} />;
    case 'editorial':
      return <EditorialTemplate data={data} ref={ref} />;
    case 'minimal':
      return <MinimalTemplate data={data} ref={ref} />;
    case 'technical':
      return <TechnicalTemplate data={data} ref={ref} />;
    case 'bold':
      return <BoldTemplate data={data} ref={ref} />;
    case 'medical':
      return <MedicalTemplate data={data} ref={ref} />;
    case 'executive':
      return <ExecutiveTemplate data={data} ref={ref} />;
    case 'accounting':
      return <AccountingTemplate data={data} ref={ref} />;
    case 'student':
      return <StudentTemplate data={data} ref={ref} />;
    case 'culinary':
      return <CulinaryTemplate data={data} ref={ref} />;
    case 'engineering':
      return <EngineeringTemplate data={data} ref={ref} />;
    case 'sales':
      return <SalesTemplate data={data} ref={ref} />;
    case 'professional':
    default:
      return <ProfessionalTemplate data={data} ref={ref} />;
  }
});

const TraditionalTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills } = data;
  
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-white p-8 md:p-16 mx-auto text-[11.5pt] leading-snug text-black font-serif shadow-2xl print:w-[210mm] print:p-16 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-fixed">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-ornate font-black uppercase mb-1 tracking-wider">
          {personalInfo.fullName}
        </h1>
        <div className="text-sm md:text-base font-classic leading-tight">
          <p>{personalInfo.location}</p>
          <p className="font-bold">Email: <span className="font-normal underline">{personalInfo.email}</span></p>
          <p className="font-bold">Tel: <span className="font-normal">{personalInfo.phone}</span></p>
        </div>
      </header>

      <div className="space-y-6 md:space-y-8">
        {/* Career Objective */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-base font-black uppercase mb-2">CAREER OBJECTIVE</h2>
            <p className="text-[10.5pt] md:text-[11.5pt] leading-relaxed text-slate-900 font-classic text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Personal Data */}
        {(personalInfo.dateOfBirth || personalInfo.stateOfOrigin || personalInfo.maritalStatus) && (
          <section>
            <h2 className="text-base font-black uppercase mb-2">PERSONAL DATA:</h2>
            <div className="space-y-1.5 px-0 text-[10.5pt] md:text-[11.5pt] font-classic">
              {personalInfo.dateOfBirth && (
                <div className="flex items-baseline">
                  <span className="w-32 md:w-40 shrink-0 font-medium">Date of Birth:</span>
                  <span className="font-bold">{personalInfo.dateOfBirth}</span>
                </div>
              )}
              {personalInfo.stateOfOrigin && (
                <div className="flex items-baseline">
                  <span className="w-32 md:w-40 shrink-0 font-medium">State of Origin:</span>
                  <span className="font-bold">{personalInfo.stateOfOrigin}</span>
                </div>
              )}
              {personalInfo.lga && (
                <div className="flex items-baseline">
                  <span className="w-32 md:w-40 shrink-0 font-medium">L.G.A:</span>
                  <span className="font-bold">{personalInfo.lga}</span>
                </div>
              )}
              {personalInfo.maritalStatus && (
                <div className="flex items-baseline">
                  <span className="w-32 md:w-40 shrink-0 font-medium">Marital Status:</span>
                  <span className="font-bold">{personalInfo.maritalStatus}</span>
                </div>
              )}
              {personalInfo.nationality && (
                <div className="flex items-baseline">
                  <span className="w-32 md:w-40 shrink-0 font-medium">Nationality:</span>
                  <span className="font-bold">{personalInfo.nationality}</span>
                </div>
              )}
              {personalInfo.gender && (
                <div className="flex items-baseline">
                  <span className="w-32 md:w-40 shrink-0 font-medium">Gender:</span>
                  <span className="font-bold">{personalInfo.gender}</span>
                </div>
              )}
              {personalInfo.religion && (
                <div className="flex items-baseline">
                  <span className="w-32 md:w-40 shrink-0 font-medium">Religion:</span>
                  <span className="font-bold">{personalInfo.religion}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Personal Profile */}
        {softSkills && softSkills.length > 0 && (
          <section>
            <h2 className="text-base font-black uppercase mb-2">PERSONAL PROFILE:</h2>
            <ul className="space-y-1.5 px-2 text-[10.5pt] md:text-[11.5pt] font-classic">
              {softSkills.map((skill, index) => (
                <li key={index} className="flex items-start gap-4">
                  <Diamond className="w-3 h-3 mt-1 fill-black shrink-0" />
                  <span className="tracking-tight">{skill}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Educational Qualification */}
        {education.length > 0 && (
          <section>
            <h2 className="text-base font-black uppercase mb-2 tracking-tighter leading-tight">EDUCATIONAL QUALIFICATION/SCHOOLS ATTENDED WITH DATES:</h2>
            <ul className="space-y-2 px-2 text-[10.5pt] md:text-[11.5pt] font-classic">
              {education.map((edu, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 text-black shrink-0" />
                  <div className="flex-1 flex flex-col md:flex-row md:items-baseline md:justify-between">
                    <div>
                      <span className="font-medium mr-1">{edu.school}</span>
                      <span className="text-[10pt] font-bold">({edu.degree})</span>
                    </div>
                    <span className="font-black italic text-right min-w-[60px]">{edu.endDate.split('-')[0]}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Core Skills / Languages */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-base font-black uppercase mb-2">LANGUAGE SPOKEN:</h2>
            <ul className="space-y-1.5 px-4 text-[10.5pt] md:text-[11.5pt] font-classic">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 border-2 border-black bg-black shrink-0" />
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Hobbies */}
        {personalInfo.hobbies && (
          <section>
            <h2 className="text-base font-black uppercase mb-1">HOBBIES:</h2>
            <p className="px-2 text-[10.5pt] md:text-[11.5pt] font-classic font-medium italic">{personalInfo.hobbies}</p>
          </section>
        )}

        {/* Reference */}
        {personalInfo.reference && (
          <section>
            <h2 className="text-base font-black uppercase mb-2">REFERENCE:</h2>
            <div className="px-2 text-[10.5pt] md:text-[11.5pt] font-classic whitespace-pre-line leading-relaxed font-bold uppercase tracking-tight">
              {personalInfo.reference}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});

const ProfessionalTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills, projects } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-white shadow-2xl flex flex-col border border-slate-200 mx-auto text-[11pt] leading-relaxed text-slate-800 font-sans overflow-hidden print:w-[210mm] print:min-h-[297mm]">
      <header className="bg-slate-900 text-white p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight uppercase">{personalInfo.fullName || "Your Name"}</h1>
          <p className="text-base md:text-lg text-slate-400 mt-1 font-medium tracking-wide">{experiences[0]?.jobTitle || "Professional"}</p>
        </div>
        <div className="text-left md:text-right text-[10px] md:text-xs text-slate-400 space-y-1">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
          {personalInfo.github && <p className="flex items-center md:justify-end gap-1"><Github size={10} /> {personalInfo.github}</p>}
        </div>
      </header>
      <div className="flex-1 flex flex-col md:flex-row">
        <aside className="w-full md:w-1/3 bg-slate-50 border-r-0 md:border-r border-slate-200 p-6 md:p-8 space-y-8 order-2 md:order-1">
          {skills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-2 mb-4">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => <span key={i} className="px-2 py-1 bg-white border border-slate-300 text-slate-700 text-[10px] uppercase font-bold rounded-sm shadow-sm">{s}</span>)}
              </div>
            </div>
          )}
          {softSkills && softSkills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-2 mb-4">Capabilities</h3>
              <div className="space-y-1">
                {softSkills.map((s, i) => <div key={i} className="text-[10px] uppercase font-medium text-slate-600 flex items-center gap-2"><div className="w-1 h-1 bg-slate-400 rounded-full" />{s}</div>)}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-2 mb-4">Education</h3>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-sm font-bold text-slate-800">{edu.degree}</p>
                    <p className="text-xs text-slate-600">{edu.school}</p>
                    <p className="text-[10px] text-slate-400 italic">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
        <main className="flex-1 p-6 md:p-10 space-y-8 order-1 md:order-2">
          {personalInfo.summary && (
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Summary</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}
          {experiences.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Experience</h3>
              <div className="space-y-6">
                {experiences.map(exp => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200">
                    <div className="absolute w-3 h-3 bg-slate-900 rounded-full -left-[7.5px] top-1"></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-0">
                      <h4 className="text-sm font-bold text-slate-900">{exp.jobTitle}</h4>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-bold mb-2">{exp.company}</p>
                    <div className="text-xs text-slate-600 whitespace-pre-line">{exp.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
});

const CreativeTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills, projects } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-white shadow-2xl flex flex-col mx-auto text-[11pt] text-slate-900 font-sans overflow-hidden border-[4px] md:border-[8px] border-indigo-600 print:w-[210mm] print:min-h-[297mm] print:border-[8px]">
      <header className="p-6 md:p-12 pb-4 md:pb-6 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-7xl font-brutal uppercase leading-[0.8] mb-4 text-indigo-600 selection:bg-indigo-100">{personalInfo.fullName}</h1>
        <p className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] mb-4 md:mb-6">{experiences[0]?.jobTitle}</p>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <span>{personalInfo.email}</span>
          <span className="hidden md:inline">•</span>
          <span>{personalInfo.phone}</span>
          <span className="hidden md:inline">•</span>
          <span>{personalInfo.location}</span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-6 md:p-12 pt-0">
        <div className="col-span-1 md:col-span-8 space-y-8 md:space-y-12">
          {personalInfo.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 mb-4 border-b-2 border-indigo-600 inline-block pb-1">Profile</h2>
              <p className="text-base md:text-lg font-medium leading-relaxed italic">{personalInfo.summary}</p>
            </section>
          )}
          {experiences.length > 0 && (
            <section>
               <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 mb-6 md:mb-8 border-b-2 border-indigo-600 inline-block pb-1">History</h2>
               <div className="space-y-8 md:space-y-10">
                 {experiences.map(exp => (
                   <div key={exp.id} className="group">
                     <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1 md:gap-0">
                       <h3 className="text-xl md:text-2xl font-brutal uppercase text-slate-800">{exp.jobTitle}</h3>
                       <span className="text-[10px] md:text-xs font-bold text-indigo-500 italic">{exp.startDate} / {exp.endDate}</span>
                     </div>
                     <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest mb-4 text-slate-400">{exp.company}</p>
                     <div className="text-sm text-slate-600 leading-relaxed pl-4 border-l-2 border-indigo-50/50">{exp.description}</div>
                   </div>
                 ))}
               </div>
            </section>
          )}
        </div>
        <div className="col-span-1 md:col-span-4 space-y-8 md:space-y-12">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 mb-4 md:mb-6 border-b-2 border-indigo-600 inline-block pb-1">Skills</h2>
            <div className="flex flex-col gap-2 md:gap-3">
              {skills.map((s, i) => <div key={i} className="text-[10px] md:text-xs font-bold uppercase tracking-widest p-2 bg-indigo-50 text-indigo-700 inline-block border-l-2 border-indigo-600">{s}</div>)}
            </div>
          </section>
          {softSkills && softSkills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 mb-4 md:mb-6 border-b-2 border-indigo-600 inline-block pb-1">Vibe</h2>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((s, i) => <div key={i} className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-slate-200 px-2 py-1 bg-slate-50/50">{s}</div>)}
              </div>
            </section>
          )}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 mb-4 md:mb-6 border-b-2 border-indigo-600 inline-block pb-1">Study</h2>
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.id}>
                  <p className="text-sm font-bold uppercase tracking-tighter">{edu.degree}</p>
                  <p className="text-[10px] md:text-xs text-slate-500 font-medium">{edu.school}</p>
                  <p className="text-[10px] font-bold text-indigo-400 mt-1">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});

const EditorialTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills, projects } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-[#fdfcf5] shadow-2xl p-6 md:p-20 mx-auto text-[11pt] leading-relaxed text-slate-900 font-classic overflow-hidden print:w-[210mm] print:min-h-[297mm] print:p-20">
      <header className="mb-10 md:mb-20 text-center">
        <h1 className="text-3xl md:text-5xl font-serif italic font-light mb-4">{personalInfo.fullName}</h1>
        <div className="w-12 md:w-16 h-0.5 bg-slate-300 mx-auto mb-6"></div>
        <div className="text-[8px] md:text-xs uppercase tracking-[0.2em] font-sans text-slate-500 flex flex-wrap justify-center gap-4 md:gap-6">
          <span>{personalInfo.location}</span>
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="col-span-1 md:col-span-4 flex flex-col gap-10 md:gap-12 order-2 md:order-1">
          {personalInfo.summary && (
            <section>
              <h2 className="text-[10px] uppercase font-sans tracking-[0.3em] text-slate-400 mb-4">Brief</h2>
              <p className="text-xs leading-relaxed italic">{personalInfo.summary}</p>
            </section>
          )}
          <section>
            <h2 className="text-[10px] uppercase font-sans tracking-[0.3em] text-slate-400 mb-4">Competencies</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                {skills.map((s, i) => <div key={i} className="text-xs border-b border-slate-200 pb-1">{s}</div>)}
              </div>
              {softSkills && softSkills.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-[8px] uppercase tracking-widest text-slate-400 mb-2 font-sans">Aptitudes</h3>
                  <div className="flex flex-wrap gap-1">
                    {softSkills.map((s, i) => <span key={i} className="text-[10px] italic">{s}{i < softSkills.length - 1 ? ',' : ''}</span>)}
                  </div>
                </div>
              )}
            </div>
          </section>
          <section>
            <h2 className="text-[10px] uppercase font-sans tracking-[0.3em] text-slate-400 mb-4">Education</h2>
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.id}>
                  <p className="text-xs font-bold italic">{edu.degree}</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">{edu.school}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="col-span-1 md:col-span-8 space-y-12 md:space-y-16 order-1 md:order-2">
          <section>
            <h2 className="text-[10px] uppercase font-sans tracking-[0.3em] text-slate-400 mb-8 border-b border-slate-100 pb-2">Professional Journey</h2>
            <div className="space-y-10 md:space-y-12">
              {experiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1 md:gap-0">
                    <h3 className="text-lg md:text-xl font-serif italic leading-none">{exp.jobTitle}</h3>
                    <span className="text-[9px] md:text-[10px] uppercase font-sans tracking-widest text-slate-400 italic">{exp.startDate} / {exp.endDate}</span>
                  </div>
                  <p className="text-[9px] md:text-[10px] uppercase font-sans tracking-[0.2em] text-slate-500 mb-4">{exp.company}</p>
                  <div className="text-xs leading-relaxed text-slate-600 pl-4 border-l border-slate-100 whitespace-pre-line">{exp.description}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});

const MinimalTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-white p-8 md:p-16 mx-auto text-[10pt] leading-snug text-slate-600 font-sans shadow-2xl border border-slate-100 print:w-[210mm] print:min-h-[297mm] print:p-16">
      <header className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-light tracking-tight text-slate-900 mb-2">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-3 md:gap-4 text-[10px] md:text-xs font-medium text-slate-400">
          <span>{personalInfo.location}</span>
          <span className="hidden md:inline">•</span>
          <span>{personalInfo.email}</span>
          <span className="hidden md:inline">•</span>
          <span>{personalInfo.phone}</span>
        </div>
      </header>
      <section className="mb-8 md:mb-12">
        <p className="text-sm border-l-2 border-slate-200 pl-4 py-1 italic">{personalInfo.summary}</p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="col-span-1 md:col-span-2 space-y-8 md:space-y-12">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-6 border-b pb-2">Experience</h2>
            <div className="space-y-8">
              {experiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 md:gap-0 mb-1">
                    <h3 className="font-bold text-slate-900 text-sm">{exp.jobTitle}</h3>
                    <span className="text-[10px] text-slate-400 tracking-tighter">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <p className="text-[10px] md:text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide italic">{exp.company}</p>
                  <p className="text-xs leading-relaxed text-slate-600 pl-3 border-l border-slate-100 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="space-y-8 md:space-y-12 text-left md:text-right">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-6 border-b pb-2">Expertise</h2>
            <div className="space-y-1 mb-8 flex flex-wrap md:flex-col gap-2 md:gap-0">
              {skills.map((s, i) => <div key={i} className="text-[10px] md:text-xs md:py-0.5 px-2 md:px-0 bg-slate-50 md:bg-transparent rounded md:rounded-none">{s}</div>)}
            </div>
            {softSkills && softSkills.length > 0 && (
              <>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-6 border-b pb-2">Personal</h2>
                <div className="space-y-1 flex flex-wrap md:flex-col gap-2 md:gap-0">
                  {softSkills.map((s, i) => <div key={i} className="text-[9px] md:text-[10px] md:py-0.5 px-2 md:px-0 bg-slate-50 md:bg-transparent italic rounded md:rounded-none">{s}</div>)}
                </div>
              </>
            )}
          </section>
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-6 border-b pb-2">Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <p className="text-xs font-bold text-slate-800">{edu.degree}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{edu.school}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});

const TechnicalTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-[#F3F4F1] p-6 md:p-12 mx-auto text-[10pt] font-mono text-slate-800 shadow-2xl border-[1px] border-slate-900 print:w-[210mm] print:min-h-[297mm] print:p-12">
      <header className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12 border-b-2 border-slate-900 pb-8">
        <div>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-2 italic serif pointer-events-none">{personalInfo.fullName}</h1>
          <p className="text-xs md:text-sm font-bold bg-slate-900 text-white inline-block px-2 py-0.5 whitespace-nowrap">DEV_STUB // {experiences[0]?.jobTitle}</p>
        </div>
        <div className="text-left md:text-right text-[8px] md:text-[10px] space-y-1 md:opacity-70">
          <div className="border-b border-slate-300 pb-1">MAIL: {personalInfo.email}</div>
          <div className="border-b border-slate-300 pb-1">LOC: {personalInfo.location}</div>
          {personalInfo.github && <div className="border-b border-slate-300 pb-1 flex items-center md:justify-end gap-1"><Github size={8} /> GITHUB: {personalInfo.github}</div>}
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8">
        <div className="col-span-1 md:col-span-8 space-y-8 md:space-y-10 order-2 md:order-1">
          <section>
            <h2 className="text-xs font-bold italic serif opacity-50 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="text-[8px] opacity-100 font-sans">01</span> Experience
            </h2>
            <div className="space-y-4 md:space-y-6">
              {experiences.map(exp => (
                <div key={exp.id} className="hover:bg-slate-900 hover:text-white p-3 border-b border-slate-900/10 transition-colors">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1 gap-1 md:gap-0">
                    <h3 className="font-black uppercase text-sm">{exp.jobTitle}</h3>
                    <span className="text-[8px] md:text-[10px] opacity-60">[{exp.startDate} :: {exp.endDate}]</span>
                  </div>
                  <p className="text-[10px] font-bold opacity-80 mb-2 italic tracking-tighter">{exp.company}</p>
                  <p className="text-[10px] leading-tight opacity-90 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="col-span-1 md:col-span-4 space-y-8 md:space-y-10 order-1 md:order-2">
          <section>
             <h2 className="text-xs font-bold italic serif opacity-50 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="text-[8px] opacity-100 font-sans">02</span> Core_Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
              {skills.map((s, i) => <div key={i} className="text-[10px] border border-slate-900/20 px-2 py-1 bg-white">-{s}</div>)}
            </div>
          </section>
          {softSkills && softSkills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold italic serif opacity-50 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="text-[8px] opacity-100 font-sans">02b</span> Soft_Attribs
              </h2>
              <div className="flex flex-wrap gap-2 text-[9px] opacity-60 italic">
                {softSkills.map((s, i) => <span key={i}>/{s}</span>)}
              </div>
            </section>
          )}
          <section className="bg-slate-900 text-white p-4">
             <h2 className="text-xs font-bold italic serif opacity-50 uppercase tracking-widest mb-4">
              03 Summary
            </h2>
            <p className="text-[10px] leading-relaxed italic">{personalInfo.summary}</p>
          </section>
        </div>
      </div>
    </div>
  );
});

const BoldTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-white mx-auto text-[11pt] font-sans shadow-2xl overflow-hidden print:w-[210mm] print:min-h-[297mm]">
      <div className="flex flex-col md:flex-row h-full min-h-screen md:min-h-[297mm]">
        <aside className="w-full md:w-16 bg-[#00FF00] border-b md:border-b-0 md:border-r border-black flex items-center justify-center p-4 md:p-0">
          <div className="md:writing-mode-vertical-rl md:rotate-180 text-[10px] md:text-xs font-black uppercase tracking-[0.5em] md:tracking-[1em] text-black">
            RESUME_EXTRACT_2026
          </div>
        </aside>
        <div className="flex-1 p-8 md:p-16">
          <header className="mb-10 md:mb-12 border-b-4 md:border-b-8 border-black pb-8">
            <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter mb-4 break-words">{personalInfo.fullName || "NAME_REQUIRED"}</h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0">
              <p className="text-base md:text-xl font-black bg-white outline outline-4 outline-black px-4 py-1">
                {experiences[0]?.jobTitle}
              </p>
              <div className="text-[10px] font-black uppercase tracking-widest text-left md:text-right">
                {personalInfo.email}<br/>
                {personalInfo.location}
              </div>
            </div>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <section className="space-y-8">
              <h2 className="text-lg md:text-xl font-black italic border-b-4 border-black inline-block px-2 mb-4 bg-[#00FF00]">EXPERIENCE</h2>
              <div className="space-y-8 md:space-y-12">
                {experiences.map(exp => (
                  <div key={exp.id}>
                    <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-0 mb-2">
                       <h3 className="text-xl md:text-2xl font-black tracking-tight leading-none">{exp.jobTitle}</h3>
                       <span className="text-[10px] font-bold bg-black text-white px-2 self-start">{exp.startDate}</span>
                    </div>
                    <p className="font-bold text-xs mb-4 uppercase tracking-widest underline decoration-wavy decoration-[#00FF00]">{exp.company}</p>
                    <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="space-y-8">
              <div className="space-y-10 md:space-y-12">
                <div>
                  <h2 className="text-lg md:text-xl font-black italic border-b-4 border-black inline-block px-2 mb-6 bg-[#00FF00]">STACK</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s, i) => <div key={i} className="px-3 py-1 bg-black text-white text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-[#00FF00] hover:text-black transition-colors">{s}</div>)}
                  </div>
                </div>
                {softSkills && softSkills.length > 0 && (
                  <div>
                    <h2 className="text-xl font-black italic border-b-4 border-black inline-block px-2 mb-6 bg-[#00FF00]">CORE</h2>
                    <div className="space-y-1">
                      {softSkills.map((s, i) => <div key={i} className="text-sm font-black border-2 border-black px-2 py-0.5 inline-block mr-2 mb-2">{s}</div>)}
                    </div>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-black italic border-b-4 border-black inline-block px-2 mb-6 bg-[#00FF00]">PROFILE</h2>
                  <p className="text-lg font-bold leading-tight italic">{personalInfo.summary}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
});

const MedicalTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-white mx-auto text-[10pt] font-sans shadow-2xl border-t-[8px] border-[#2A6B9B] flex flex-col p-6 md:p-12 print:w-[210mm] print:min-h-[297mm] print:p-12">
      <header className="mb-8 md:mb-10 text-[#2A6B9B]">
        <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2 border-b-2 border-slate-100 pb-4 leading-none">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 text-[10px] md:text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {personalInfo.email}</span>
          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {personalInfo.phone}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {personalInfo.location}</span>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        <div className="md:col-span-8 space-y-8 order-1 md:order-1">
          <section>
            <h2 className="text-sm font-bold uppercase text-[#2A6B9B] border-l-4 border-[#2A6B9B] pl-3 mb-4">Professional Summary</h2>
            <p className="text-xs md:text-sm leading-relaxed text-slate-700 whitespace-pre-line">{personalInfo.summary}</p>
          </section>
          <section>
            <h2 className="text-sm font-bold uppercase text-[#2A6B9B] border-l-4 border-[#2A6B9B] pl-3 mb-6">Work Experience</h2>
            <div className="space-y-6">
              {experiences.map(exp => (
                <div key={exp.id}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 md:gap-0 mb-1">
                    <h3 className="font-bold text-slate-900">{exp.jobTitle}</h3>
                    <span className="text-[10px] uppercase font-bold text-[#2A6B9B]">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 mb-2">{exp.company}</p>
                  <p className="text-[11px] md:text-xs leading-relaxed text-slate-600 whitespace-pre-line pl-4 border-l border-slate-100">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="md:col-span-4 space-y-8 order-2 md:order-2">
          <section>
            <h2 className="text-sm font-bold uppercase text-[#2A6B9B] border-b border-slate-200 pb-2 mb-4">Core Competencies</h2>
            <div className="flex flex-wrap md:flex-col gap-2">
              {skills.map((s, i) => <div key={i} className="text-[10px] md:text-xs font-medium text-slate-700 flex items-center gap-2 bg-slate-50 md:bg-transparent px-2 md:px-0 py-1 md:py-0 rounded"><div className="w-1.5 h-1.5 bg-[#2A6B9B] rounded-full hidden md:block" />{s}</div>)}
            </div>
          </section>
          <section>
            <h2 className="text-sm font-bold uppercase text-[#2A6B9B] border-b border-slate-200 pb-2 mb-4">Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <p className="text-xs font-bold text-slate-900 leading-tight">{edu.degree}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{edu.school}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});

const ExecutiveTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-white p-6 md:p-16 mx-auto text-[10pt] font-serif leading-relaxed text-[#1a1a1a] shadow-2xl border border-slate-200 print:w-[210mm] print:min-h-[297mm] print:p-16">
      <header className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-light tracking-wide uppercase mb-4 break-words">{personalInfo.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[8px] md:text-xs font-sans tracking-widest uppercase text-slate-500 border-t border-b border-slate-100 py-3">
          <span>{personalInfo.location}</span>
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
        </div>
      </header>
      <div className="space-y-10 md:space-y-12">
        <section className="text-center max-w-2xl mx-auto italic text-slate-600 text-sm">
          <p className="whitespace-pre-line leading-relaxed">{personalInfo.summary}</p>
        </section>
        <section>
          <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 md:mb-8 flex items-center gap-4">
             Professional Experience <div className="h-[1px] bg-slate-200 flex-1" />
          </h2>
          <div className="space-y-10 md:space-y-12">
            {experiences.map(exp => (
              <div key={exp.id} className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8 overflow-hidden">
                <div className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest pt-1 px-2 border-l-2 md:border-l-0 md:border-r border-slate-100 italic">
                  {exp.startDate} - {exp.endDate}
                </div>
                <div className="col-span-3">
                  <h3 className="text-lg font-bold mb-1">{exp.jobTitle}</h3>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#1a1a1a] mb-4 opacity-70 italic">{exp.company}</p>
                  <p className="text-[13px] leading-relaxed text-slate-700 whitespace-pre-line">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-16 border-t border-slate-100 pt-10 md:pt-12">
           <div>
              <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 italic">Academic Background</h2>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <p className="font-bold text-sm tracking-tight">{edu.degree}</p>
                    <p className="text-[9px] font-sans uppercase tracking-widest text-slate-500 mt-1">{edu.school}</p>
                  </div>
                ))}
              </div>
           </div>
           <div>
              <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 italic">Strategic Leadership</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {skills.map((s, i) => <div key={i} className="text-[9px] font-sans uppercase font-bold tracking-widest border-b border-slate-100 pb-1.5">{s}</div>)}
              </div>
              {softSkills && softSkills.length > 0 && (
                <div className="mt-8">
                   <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 italic">Core Attributes</h2>
                   <div className="flex flex-wrap gap-2 md:gap-3">
                     {softSkills.map((s, i) => <span key={i} className="text-[9px] italic text-slate-500 font-sans uppercase tracking-[0.1em] bg-slate-50 px-2 py-0.5 rounded-sm">{s}</span>)}
                   </div>
                </div>
              )}
           </div>
        </section>
      </div>
    </div>
  );
});

const AccountingTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-white p-6 md:p-12 mx-auto text-[9.5pt] font-sans leading-tight text-slate-800 shadow-2xl border border-slate-300 print:w-[210mm] print:min-h-[297mm] print:p-12">
      <header className="flex flex-col md:flex-row md:justify-between md:items-start border-b-2 border-slate-800 pb-6 mb-8 gap-4 md:gap-0 font-sans">
        <div>
          <h1 className="text-2xl md:text-3xl font-black uppercase text-slate-900 mb-1 leading-none">{personalInfo.fullName}</h1>
          <p className="text-xs font-bold uppercase text-slate-500 italic mt-1">{experiences[0]?.jobTitle || "Finance Professional"}</p>
        </div>
        <div className="text-left md:text-right text-[10px] space-y-1 font-medium border-l md:border-l-0 pl-4 md:pl-0 border-slate-100">
          <p>{personalInfo.location}</p>
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
        </div>
      </header>
      <div className="space-y-8">
        <section className="bg-slate-50 p-4 border border-slate-200">
          <h2 className="text-xs font-black uppercase mb-2 text-slate-900">Professional Profile</h2>
          <p className="text-[11px] md:text-xs leading-relaxed text-slate-700 whitespace-pre-line">{personalInfo.summary}</p>
        </section>
        <section>
          <h2 className="text-xs font-black uppercase border-b border-slate-800 pb-1 mb-4 flex items-center justify-between">
            Experience <span className="hidden md:inline text-[8px] font-normal text-slate-400">Quantitative Results Oriented</span>
          </h2>
          <div className="space-y-6">
            {experiences.map(exp => (
              <div key={exp.id}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1 gap-1 md:gap-0">
                  <h3 className="font-black text-slate-900 uppercase italic text-sm">{exp.company}</h3>
                  <span className="text-[9px] font-bold text-slate-500">[{exp.startDate} - {exp.endDate}]</span>
                </div>
                <p className="text-[10px] font-bold text-slate-700 mb-2 uppercase tracking-tight">{exp.jobTitle}</p>
                <div className="text-[11px] md:text-[10px] text-slate-600 whitespace-pre-line pl-4 border-l border-slate-100">{exp.description}</div>
              </div>
            ))}
          </div>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <section>
              <h2 className="text-xs font-black uppercase border-b border-slate-800 pb-1 mb-4">Core Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => <div key={i} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-[9px] font-bold uppercase">{s}</div>)}
              </div>
           </section>
           <section>
              <h2 className="text-xs font-black uppercase border-b border-slate-800 pb-1 mb-4">Education</h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id}>
                    <p className="text-[10px] font-black leading-tight">{edu.degree}</p>
                    <p className="text-[9px] text-slate-500 mt-1">{edu.school}</p>
                  </div>
                ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
});

const StudentTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills, projects } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-white p-6 md:p-16 mx-auto text-[10pt] font-sans leading-relaxed text-slate-700 shadow-2xl border-x border-slate-100 flex flex-col print:w-[210mm] print:min-h-[297mm] print:p-16">
       <header className="mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">{personalInfo.fullName}</h1>
          <div className="flex flex-wrap gap-3 md:gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-indigo-600">
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
          </div>
       </header>
       <div className="space-y-10 md:space-y-12 flex-1">
          <section>
             <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6">Education Focus</h2>
             <div className="space-y-6">
               {education.map(edu => (
                 <div key={edu.id} className="border-l-4 border-indigo-500 pl-4">
                   <h3 className="font-black text-slate-900 text-base md:text-lg leading-none mb-1">{edu.degree}</h3>
                   <p className="text-[10px] md:text-xs font-bold text-slate-500">{edu.school} • {edu.startDate} - {edu.endDate}</p>
                 </div>
               ))}
             </div>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
             <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 font-sans">Skill Stack</h2>
                <div className="flex flex-wrap gap-2">
                   {skills.map((s, i) => <div key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black rounded-lg">{s}</div>)}
                </div>
                {softSkills && softSkills.length > 0 && (
                   <div className="mt-4 flex flex-wrap gap-1.5 leading-none">
                      {softSkills.map((s, i) => <span key={i} className="text-[9px] font-bold text-indigo-300 uppercase tracking-tight">{s}{i < softSkills.length - 1 ? ' /' : ''}</span>)}
                   </div>
                )}
             </section>
             <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 font-sans">Project Lab</h2>
                <div className="space-y-4">
                  {projects && projects.map(p => (
                    <div key={p.id}>
                       <p className="font-black text-slate-900 text-sm tracking-tight">{p.title}</p>
                       <p className="text-[10px] leading-tight text-slate-500 mt-1">{p.description}</p>
                    </div>
                  ))}
                </div>
             </section>
          </div>
          <section>
             <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 font-sans">Practical Experience</h2>
             <div className="space-y-8">
                {experiences.map(exp => (
                  <div key={exp.id}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1 gap-1 md:gap-0">
                       <h3 className="font-black text-slate-900">{exp.jobTitle}</h3>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-[11px] md:text-xs font-bold text-indigo-600 mb-3">{exp.company}</p>
                    <p className="text-[11px] md:text-xs leading-relaxed opacity-80 whitespace-pre-line tracking-tight">{exp.description}</p>
                  </div>
                ))}
             </div>
          </section>
       </div>
    </div>
  );
});

const CulinaryTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-[#fafafa] p-6 md:p-12 mx-auto text-[10pt] font-sans text-slate-800 shadow-2xl relative print:w-[210mm] print:min-h-[297mm] print:p-12">
       <div className="absolute top-0 left-0 w-full h-2 bg-slate-900" />
       <header className="mb-10 md:mb-12 border-b-4 border-slate-900 pb-8 text-center italic serif">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 leading-none">{personalInfo.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 not-italic">
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
          </div>
       </header>
       <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-8 space-y-10 md:order-1">
             <section>
                <h2 className="text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white inline-block px-3 py-1 mb-6 font-sans">Kitchen Experience</h2>
                <div className="space-y-8 italic serif">
                   {experiences.map(exp => (
                     <div key={exp.id}>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1 gap-1 md:gap-0">
                           <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight">{exp.jobTitle}</h3>
                           <span className="text-[9px] md:text-[10px] font-sans font-bold text-slate-400 not-italic tracking-tighter">[{exp.startDate} - {exp.endDate}]</span>
                        </div>
                        <p className="text-[10px] md:text-sm font-sans font-black text-slate-900 mb-3 not-italic uppercase tracking-widest">{exp.company}</p>
                        <p className="text-[13px] md:text-sm leading-relaxed border-l-2 border-slate-200 pl-4 whitespace-pre-line tracking-tight">{exp.description}</p>
                     </div>
                   ))}
                </div>
             </section>
          </div>
          <div className="md:col-span-4 space-y-8 md:order-2">
             <section className="bg-white p-6 border border-slate-200">
                <h2 className="text-[10px] font-black uppercase tracking-widest border-b border-slate-900 pb-2 mb-4 font-sans">Culinary Skills</h2>
                <div className="flex flex-wrap md:flex-col gap-2 mb-6">
                   {skills.map((s, i) => <div key={i} className="text-[11px] font-bold bg-slate-50 md:bg-transparent px-2 md:px-0 py-0.5 rounded md:rounded-none tracking-tight">- {s}</div>)}
                </div>
                {softSkills && softSkills.length > 0 && (
                   <div>
                      <h3 className="text-[8px] font-black uppercase tracking-widest mb-2 opacity-40 italic font-sans tracking-tight">Interpersonal</h3>
                      <div className="flex flex-wrap gap-2 leading-none">
                         {softSkills.map((s, i) => <span key={i} className="text-[10px] font-serif italic text-slate-500">{s}{i < softSkills.length - 1 ? ',' : ''}</span>)}
                      </div>
                   </div>
                )}
             </section>
             <section className="p-6">
                <h2 className="text-[10px] font-black uppercase tracking-widest border-b border-slate-900 pb-2 mb-4 font-sans">Education</h2>
                <div className="space-y-4">
                  {education.map(edu => (
                    <div key={edu.id}>
                       <p className="text-sm font-bold leading-tight font-serif italic tracking-tight">{edu.degree}</p>
                       <p className="text-[9px] text-slate-500 uppercase font-black mt-2 tracking-widest font-sans">{edu.school}</p>
                    </div>
                  ))}
                </div>
             </section>
          </div>
       </div>
    </div>
  );
});

const EngineeringTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-white p-6 md:p-12 mx-auto text-[9.5pt] font-sans leading-snug text-slate-800 shadow-2xl border border-slate-100 flex flex-col print:w-[210mm] print:min-h-[297mm] print:p-12">
       <header className="flex flex-col md:flex-row border-b-4 border-slate-900 pb-6 mb-10 gap-6 md:gap-0">
          <div className="flex-1">
             <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-1 text-slate-900 leading-none">{personalInfo.fullName}</h1>
             <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest italic">{experiences[0]?.jobTitle}</p>
          </div>
          <div className="text-left md:text-right text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 flex flex-col justify-end space-y-1">
             <p>{personalInfo.email}</p>
             <p>{personalInfo.phone}</p>
             <p>{personalInfo.location}</p>
          </div>
       </header>
       <div className="flex-1 space-y-10">
          <section className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8">
             <div className="md:col-span-1 text-[10px] font-black uppercase tracking-widest text-slate-300">Technical Profile</div>
             <div className="md:col-span-3 text-[13px] md:text-sm leading-relaxed italic border-l md:border-l border-slate-100 pl-4 md:pl-6 whitespace-pre-line">{personalInfo.summary}</div>
          </section>
          <section className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8">
             <div className="md:col-span-1 text-[10px] font-black uppercase tracking-widest text-slate-300">Technical Expertise</div>
             <div className="md:col-span-3 flex flex-wrap gap-1.5 md:gap-2 md:border-l border-slate-100 md:pl-6">
                {skills.map((s, i) => <div key={i} className="px-2 md:px-3 py-1 bg-slate-900 text-white text-[8px] md:text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">{s}</div>)}
             </div>
          </section>
          <section className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8">
             <div className="md:col-span-1 text-[10px] font-black uppercase tracking-widest text-slate-300">Project History</div>
             <div className="md:col-span-3 space-y-8 md:space-y-10 md:border-l border-slate-100 md:pl-6">
                {experiences.map(exp => (
                  <div key={exp.id}>
                     <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1 md:gap-0">
                        <h3 className="text-base md:text-lg font-black uppercase tracking-tight leading-none">{exp.jobTitle}</h3>
                        <span className="text-[9px] md:text-[10px] font-bold text-slate-400">[{exp.startDate} - {exp.endDate}]</span>
                     </div>
                     <p className="text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-[0.2em]">{exp.company}</p>
                     <div className="text-[12px] md:text-xs text-slate-600 whitespace-pre-line leading-relaxed tracking-tight">{exp.description}</div>
                  </div>
                ))}
             </div>
          </section>
          <section className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8">
             <div className="md:col-span-1 text-[10px] font-black uppercase tracking-widest text-slate-300">Academic Background</div>
             <div className="md:col-span-3 md:border-l border-slate-100 md:pl-6 space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                     <p className="text-[12px] md:text-sm font-bold uppercase tracking-tight">{edu.degree}</p>
                     <p className="text-[10px] text-slate-500 mt-1">{edu.school} • {edu.location}</p>
                  </div>
                ))}
             </div>
          </section>
       </div>
    </div>
  );
});

const SalesTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  const { personalInfo, experiences, education, skills, softSkills } = data;
  return (
    <div ref={ref} className="w-full md:w-[210mm] min-h-screen md:min-h-[297mm] bg-white p-6 md:p-12 mx-auto text-[10.5pt] font-sans leading-relaxed text-slate-800 shadow-2xl border border-slate-200 print:w-[210mm] print:min-h-[297mm] print:p-12">
       <header className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left font-sans">
          <div className="md:col-span-2">
             <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2 text-indigo-600 leading-none">{personalInfo.fullName}</h1>
             <p className="text-base md:text-lg font-bold text-slate-400 italic lowercase tracking-tight opacity-75">{personalInfo.summary.substring(0, 50)}...</p>
          </div>
          <div className="text-left md:text-right flex flex-col justify-end text-[10px] font-bold uppercase tracking-widest text-slate-400">
             <p>{personalInfo.location}</p>
             <p>{personalInfo.email}</p>
             <p>{personalInfo.phone}</p>
          </div>
       </header>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <div className="md:col-span-2 space-y-10 md:space-y-12 order-2 md:order-1">
             <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 mb-6 font-sans">Success Portfolio</h2>
                <div className="space-y-8 md:space-y-10">
                   {experiences.map(exp => (
                     <div key={exp.id}>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1 md:gap-0">
                           <h3 className="text-lg md:text-xl font-black uppercase text-indigo-600 leading-none tracking-tight">{exp.jobTitle}</h3>
                           <span className="text-[10px] font-bold text-slate-400 absolute md:relative right-6 md:right-0 opacity-40 md:opacity-100">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-900 mb-4">{exp.company}</p>
                        <div className="text-[13px] md:text-sm text-slate-600 whitespace-pre-line border-l-4 border-slate-100 pl-4 italic serif leading-snug tracking-tight">{exp.description}</div>
                     </div>
                   ))}
                </div>
             </section>
          </div>
          <div className="space-y-10 md:space-y-12 order-1 md:order-2">
             <section>
                 <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 mb-6 font-sans">Expertise Highlights</h2>
                 <div className="space-y-4">
                    <div className="flex flex-wrap md:flex-col gap-2">
                       {skills.map((s, i) => <div key={i} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 md:gap-3 bg-slate-50 md:bg-transparent px-2 md:px-0 py-1 md:py-0 rounded"><div className="w-1.5 h-1.5 bg-indigo-600 rounded-full hidden md:block" /> {s}</div>)}
                    </div>
                 </div>
             </section>
             <section>
                 <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 mb-6 font-sans">Education</h2>
                 <div className="space-y-6">
                    {education.map(edu => (
                      <div key={edu.id}>
                         <p className="text-sm font-black uppercase leading-tight tracking-tight">{edu.degree}</p>
                         <p className="text-[10px] text-slate-500 mt-2 font-bold">{edu.school}</p>
                      </div>
                    ))}
                 </div>
             </section>
          </div>
       </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
CreativeTemplate.displayName = 'CreativeTemplate';
EditorialTemplate.displayName = 'EditorialTemplate';
ProfessionalTemplate.displayName = 'ProfessionalTemplate';
MinimalTemplate.displayName = 'MinimalTemplate';
TechnicalTemplate.displayName = 'TechnicalTemplate';
BoldTemplate.displayName = 'BoldTemplate';
MedicalTemplate.displayName = 'MedicalTemplate';
ExecutiveTemplate.displayName = 'ExecutiveTemplate';
AccountingTemplate.displayName = 'AccountingTemplate';
StudentTemplate.displayName = 'StudentTemplate';
CulinaryTemplate.displayName = 'CulinaryTemplate';
EngineeringTemplate.displayName = 'EngineeringTemplate';
SalesTemplate.displayName = 'SalesTemplate';
