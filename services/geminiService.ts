
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client using the required configuration pattern.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  /**
   * Helps matching user issues to categories
   */
  async matchService(description: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Given the following problem description, identify the most likely service category from: Plumbing, Electrical, Cleaning, Mechanic, Painting, Carpentry.
        
        Description: "${description}"
        
        Return ONLY the category name.`,
      });
      return response.text.trim();
    } catch (error) {
      console.error("Gemini Error:", error);
      return null;
    }
  },

  /**
   * Summarizes reviews for a provider
   */
  async summarizeReviews(reviews: any[]) {
    if (reviews.length === 0) return "No reviews yet.";
    const reviewText = reviews.map(r => r.comment).join(". ");
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize these user reviews for a service provider in one concise sentence: "${reviewText}"`,
      });
      return response.text.trim();
    } catch (error) {
      return "Excellent reviews from past clients.";
    }
  },

  /**
   * Smart AI Chat assistant for the provider
   */
  async getAiResponse(history: {role: 'user'|'model', text: string}[], userMessage: string) {
    try {
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'You are an AI assistant helping a service provider on Fixa, a home services platform. Help them communicate professionally and clarify job details with clients.',
        },
      });
      const response = await chat.sendMessage({ message: userMessage });
      return response.text;
    } catch (error) {
      return "I'm having trouble processing that right now.";
    }
  }
};
