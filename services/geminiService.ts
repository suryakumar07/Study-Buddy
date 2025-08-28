import { GoogleGenAI } from "@google/genai";
import type { Language } from '../types';

// The user's prompt mentions that the Gemini Pro API key is stored in .env.
// The instructions say to assume `process.env.API_KEY` is pre-configured.
if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const generateContent = async (prompt: string, lang: Language): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating content:", error);
        if (lang === 'ta') {
            return "AI உடன் தொடர்பு கொள்ளும்போது ஒரு பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.";
        }
        return "An error occurred while communicating with the AI. Please try again later.";
    }
};

export const geminiService = {
  getSummary: (topic: string, lang: Language): Promise<string> => {
    const language = lang === 'ta' ? 'Tamil' : 'English';
    const prompt = `Provide a concise, easy-to-understand summary for a student on the topic: "${topic}". Please respond in ${language}.`;
    console.log(`Fetching summary for "${topic}" in ${lang}`);
    return generateContent(prompt, lang);
  },
  getQA: (topic: string, lang: Language): Promise<string> => {
    const language = lang === 'ta' ? 'Tamil' : 'English';
    const prompt = `Generate 3 simple question and answer pairs for a student about the topic: "${topic}". Respond in ${language}. Format each pair clearly like this:\nQ: [Question]\nA: [Answer]`;
    console.log(`Fetching Q&A for "${topic}" in ${lang}`);
    return generateContent(prompt, lang);
  },
  summarizeNotes: (notes: string, lang: Language): Promise<string> => {
    const language = lang === 'ta' ? 'Tamil' : 'English';
    const prompt = `Summarize the key points from the following notes for a student. Respond in ${language}.\n\nNotes:\n---\n${notes}`;
    console.log(`Summarizing notes in ${lang}`);
    return generateContent(prompt, lang);
  }
};