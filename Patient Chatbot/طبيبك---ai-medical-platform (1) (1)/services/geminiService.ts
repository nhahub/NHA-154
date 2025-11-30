
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Function to analyze medical images
export const analyzeMedicalImage = async (base64Data: string, prompt: string): Promise<string> => {
  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Data,
      },
    };

    const textPart = {
      text: prompt,
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error in analyzeMedicalImage:", error);
    return "Failed to analyze the image. Please try again.";
  }
};

// Function for chatbot responses
export const getChatbotResponse = async (chatHistory: ChatMessage[], userType: 'doctor' | 'patient'): Promise<string> => {
  try {
    const model = userType === 'doctor' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    
    const systemInstruction = userType === 'doctor' 
      ? "You are a highly intelligent AI medical assistant for expert doctors. Provide concise, accurate analysis of test results, generate medical report summaries, and explain complex medical concepts clearly. Use professional medical terminology."
      : "You are a friendly and empathetic AI health assistant for patients. Explain medical reports and health concepts in simple, easy-to-understand language. Avoid jargon. Be reassuring and clear.";

    const contents = chatHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            systemInstruction,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error in getChatbotResponse:", error);
    return "I'm sorry, I encountered an issue. Please rephrase your question or try again later.";
  }
};
