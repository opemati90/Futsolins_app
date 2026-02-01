import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

// Initialize safely. If no key is present, we will handle it in the UI.
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateStudyPlan = async (
  examType: string,
  weakSubjects: string,
  availableHours: number
): Promise<string> => {
  if (!ai) {
    // Return a mock response if API key is missing for demo purposes
    return `**Mock Plan (API Key Missing)**
    
    Here is a suggested plan for ${examType}:
    1. **Monday**: Focus on ${weakSubjects.split(',')[0] || 'General Revision'} for 2 hours.
    2. **Tuesday**: Practice Past Questions.
    3. **Wednesday**: Review ${weakSubjects.split(',')[1] || 'Mathematics'}.
    
    *Please configure process.env.API_KEY to get real AI generation.*`;
  }

  try {
    const prompt = `
      Create a concise, 3-day study timetable for a Nigerian student preparing for ${examType}.
      The student struggles with: ${weakSubjects}.
      They have ${availableHours} hours available per day.
      Format the response with Markdown using bold headers for days. Keep it encouraging and strictly focused on the Nigerian syllabus.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Could not generate plan. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, we encountered an error generating your plan. Please check your connection.";
  }
};