import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API client
// Note: API Key must be set in process.env.API_KEY
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a creative description for an artwork based on its title and basic params.
 * This can be used to dynamically populate artwork descriptions.
 */
export const generateArtDescription = async (title: string, medium: string): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Returning mock data.");
    return "A profound exploration of form and void, challenging the viewer's perception of reality through monochromatic textures.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Write a short, abstract, and artistic description (max 30 words) for an artwork titled "${title}" made with "${medium}". The tone should be mysterious, minimalist, and sophisticated.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text?.trim() || "Description unavailable.";
  } catch (error) {
    console.error("Error generating art description:", error);
    return "An enigmatic piece inviting introspection.";
  }
};