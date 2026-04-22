export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  id: string;
  title: string;
  link: string;
  description: string;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  // Additional fields for traditional/regional templates
  dateOfBirth?: string;
  stateOfOrigin?: string;
  lga?: string;
  maritalStatus?: string;
  nationality?: string;
  gender?: string;
  religion?: string;
  hobbies?: string;
  languages?: string[];
  reference?: string;
}

export interface CoverLetterData {
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  date: string;
  content: string;
}

export interface ResumeData {
  templateId: 'professional' | 'creative' | 'editorial' | 'minimal' | 'technical' | 'bold' | 'medical' | 'executive' | 'accounting' | 'student' | 'culinary' | 'engineering' | 'sales' | 'traditional';
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  softSkills: string[];
  projects: Project[];
  coverLetter?: CoverLetterData;
}
