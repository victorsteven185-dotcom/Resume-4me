import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function polishResumeContent(text: string, type: 'summary' | 'experience' | 'project') {
  if (!text.trim()) return text;
  
  const prompts = {
    summary: "Rewrite this professional summary to be more impactful and concise for a resume. Use strong action verbs.",
    experience: "Improve these job responsibilities. Use bullet points, start each with an action verb, and focus on quantifiable achievements and impact.",
    project: "Rewrite this project description to highlight technical skills, impact, and results. Be concise."
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${prompts[type]}: \n\n${text}`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini optimization failed:", error);
    return text;
  }
}

export async function generateCoverLetter(resumeData: any) {
  const { personalInfo, experiences, education, skills } = resumeData;
  
  const prompt = `
    Generate a professional cover letter based on the following candidate profile:
    
    Candidate: ${personalInfo.fullName}
    Location: ${personalInfo.location}
    Summary: ${personalInfo.summary}
    Experience: ${experiences.map((e: any) => `${e.jobTitle} at ${e.company}`).join(', ')}
    Education: ${education.map((e: any) => e.degree).join(', ')}
    Skills: ${skills.slice(0, 10).join(', ')}
    
    The letter should be professional, compelling, and approximately 300-400 words. 
    Focus on impact and cultural fit.
    Use "Dear Hiring Manager," as the salutation.
    Write ONLY the body paragraphs of the letter. Do not include sender/recipient info or signatures.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
      }
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Gemini cover letter generation failed:", error);
    return "";
  }
}
