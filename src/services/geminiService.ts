import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateCustomText(topic: string, lang: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a single cohesive paragraph for a typing test about the topic: "${topic}". 
      Language: ${lang}. 
      The text should be around 300 to 500 characters long. 
      Only return the plain text of the paragraph, nothing else.`,
    });

    return response.text?.trim() || "Error generating text. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The system failed to generate text for your custom topic. Tactical error detected.";
  }
}
