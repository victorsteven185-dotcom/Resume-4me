import { ResumeData } from "../types";

export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  recommendedTemplate: ResumeData['templateId'];
  tags: string[];
}

export const JOB_CATEGORIES: JobCategory[] = [
  {
    id: "accounting",
    name: "Accounting & Finance",
    icon: "Calculator",
    recommendedTemplate: "accounting",
    tags: ["Accountant", "Auditor", "CPA", "Controller", "Bookkeeper", "Payroll Specialist"]
  },
  {
    id: "admin",
    name: "Administrative",
    icon: "FileText",
    recommendedTemplate: "minimal",
    tags: ["Administrative Assistant", "Secretary", "Office Manager", "Receptionist", "Data Entry"]
  },
  {
    id: "tech",
    name: "Computer Software & IT",
    icon: "Code",
    recommendedTemplate: "technical",
    tags: ["Software Engineer", "DevOps", "Cloud Architect", "Frontend Developer", "SysAdmin", "Data Scientist"]
  },
  {
    id: "medical",
    name: "Medical & Nursing",
    icon: "Stethoscope",
    recommendedTemplate: "medical",
    tags: ["Registered Nurse", "Doctor", "Physician", "Medical Assistant", "Surgeon", "Dentist"]
  },
  {
    id: "culinary",
    name: "Culinary & Food Service",
    icon: "Utensils",
    recommendedTemplate: "culinary",
    tags: ["Chef", "Cook", "Baker", "Restaurant Manager", "Waiter", "Waitress", "Barista"]
  },
  {
    id: "engineering",
    name: "Engineering",
    icon: "Settings",
    recommendedTemplate: "engineering",
    tags: ["Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Structural Engineer"]
  },
  {
    id: "sales",
    name: "Sales & Marketing",
    icon: "TrendingUp",
    recommendedTemplate: "sales",
    tags: ["Sales Representative", "Account Executive", "Marketing Manager", "SEO Specialist"]
  },
  {
    id: "executive",
    name: "Executive & Management",
    icon: "Briefcase",
    recommendedTemplate: "executive",
    tags: ["CEO", "Director", "Operations Manager", "VP", "General Manager"]
  },
  {
    id: "student",
    name: "Student & Entry Level",
    icon: "GraduationCap",
    recommendedTemplate: "student",
    tags: ["Student", "Intern", "Fresh Graduate", "High School Student", "Trainee"]
  },
  {
    id: "creative",
    name: "Creative & Design",
    icon: "Palette",
    recommendedTemplate: "creative",
    tags: ["Graphic Designer", "UI/UX Designer", "Art Director", "Photographer", "Video Editor"]
  }
];

export const ALL_JOBS = JOB_CATEGORIES.flatMap(cat => 
  cat.tags.map(tag => ({
    title: tag,
    category: cat.name,
    categoryId: cat.id,
    recommendedTemplate: cat.recommendedTemplate
  }))
);
