import { useState, useEffect } from 'react';
import { ResumeData } from '../types';

const STORAGE_KEY = 'resume4me_data';

const INITIAL_DATA: ResumeData = {
  templateId: 'professional',
  personalInfo: {
    fullName: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 0123",
    website: "alexrivera.dev",
    location: "New York, NY",
    linkedin: "linkedin.com/in/alexrivera",
    github: "github.com/alexrivera",
    summary: "Senior Software Engineer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and Cloud Infrastructure. Passionate about creating performant, user-centric experiences and leading high-performing engineering teams."
  },
  experiences: [
    {
      id: "1",
      jobTitle: "Senior Software Engineer",
      company: "TechFlow Systems",
      location: "San Francisco, CA",
      startDate: "2020-03",
      endDate: "Present",
      description: "• Led the frontend migration from a legacy monolith to a micro-frontend architecture using React and Module Federation.\n• Mentored 5 junior engineers and established best practices for code reviews and testing.\n• Improved core web vitals by 40% through aggressive caching and code optimization."
    },
    {
      id: "2",
      jobTitle: "Full Stack Developer",
      company: "InnoVate Corp",
      location: "Boston, MA",
      startDate: "2017-06",
      endDate: "2020-02",
      description: "• Developed and maintained multiple customer-facing dashboards using React and Express.\n• Designed and implemented a real-time notification system using WebSockets.\n• Collaborated with UX designers to implement a design system adopted across the entire company."
    }
  ],
  education: [
    {
      id: "1",
      degree: "B.S. in Computer Science",
      school: "State University of Technology",
      location: "Austin, TX",
      startDate: "2013-09",
      endDate: "2017-05"
    }
  ],
  skills: [
    "TypeScript", "React", "Node.js", "GraphQL", "AWS", "Docker", "Kubernetes", "Tailwind CSS", "PostgreSQL", "CI/CD"
  ],
  softSkills: [
    "Leadership", "Team Collaboration", "Problem Solving", "Strategic Thinking", "Adaptability"
  ],
  projects: [
    {
      id: "1",
      title: "OpenSource Analytics Library",
      link: "github.com/alexr/analytics",
      description: "A lightweight, privacy-focused analytics library used by over 5,000 developers."
    }
  ],
  coverLetter: {
    recipientName: "Hiring Manager",
    recipientTitle: "Head of Engineering",
    companyName: "Innovative Tech Solutions",
    companyAddress: "123 Innovation Drive, San Francisco, CA",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    content: "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Software Engineer position at Innovative Tech Solutions. With over 8 years of experience in full-stack development and a proven track record of leading high-impact projects, I am confident that my skills and passion for excellence make me an ideal candidate for your team.\n\nThroughout my career, I have focused on building scalable, user-centric web applications using modern technologies like React, Node.js, and cloud infrastructure. At TechFlow Systems, I led a major frontend migration that improved core web vitals by 40% and established a robust micro-frontend architecture. I am particularly drawn to your company's commitment to innovation and its reputation for solving complex engineering challenges.\n\nI am eager to bring my expertise in React and system design to your team and contribute to the continued success of your products. Thank you for considering my application. I look forward to the possibility of discussing how my background and skills align with your needs.\n\nSincerely,\n\nAlex Rivera"
  }
};

export function useResume() {
  const [data, setData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { id: crypto.randomUUID(), jobTitle: "", company: "", location: "", startDate: "", endDate: "", description: "" }
      ]
    }));
  };

  const updateExperience = (id: string, info: Partial<ResumeData['experiences'][0]>) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, ...info } : exp)
    }));
  };

  const removeExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: crypto.randomUUID(), degree: "", school: "", location: "", startDate: "", endDate: "" }
      ]
    }));
  };

  const updateEducation = (id: string, info: Partial<ResumeData['education'][0]>) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, ...info } : edu)
    }));
  };

  const removeEducation = (id: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addProject = () => {
    setData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: crypto.randomUUID(), title: "", link: "", description: "" }
      ]
    }));
  };

  const updateProject = (id: string, info: Partial<ResumeData['projects'][0]>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...info } : p)
    }));
  };

  const removeProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const updateSkills = (skills: string[]) => {
    setData(prev => ({ ...prev, skills }));
  };

  const updateSoftSkills = (softSkills: string[]) => {
    setData(prev => ({ ...prev, softSkills }));
  };

  const updateTemplate = (templateId: ResumeData['templateId']) => {
    setData(prev => ({ ...prev, templateId }));
  };

  const updateCoverLetter = (info: Partial<ResumeData['coverLetter']>) => {
    setData(prev => ({
      ...prev,
      coverLetter: prev.coverLetter 
        ? { ...prev.coverLetter, ...info } 
        : { 
            recipientName: "Hiring Manager",
            recipientTitle: "Head of Talent",
            companyName: "Example Corp",
            companyAddress: "123 Business Way",
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            content: "",
            ...info 
          }
    }));
  };

  return {
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
    updateCoverLetter
  };
}
