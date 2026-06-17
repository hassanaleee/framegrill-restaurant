import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

const ai = new GoogleGenAI({ apiKey });

export async function askChatbot(
  messages: { role: string; content: string }[],
  menuData: any
): Promise<string> {
  if (!apiKey) {
    throw new Error(
      "Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in .env.local"
    );
  }

  const systemPrompt = `You are a helpful assistant for Frame Grill restaurant.
You help customers with menu questions, recommendations, hours, and reservations.

Menu:
${JSON.stringify(menuData)}

Hours: Monday-Sunday 12pm-11pm
Location: Islamabad

Be friendly, concise and helpful.`;

  const conversation = messages
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${systemPrompt}\n\n${conversation}`,
  });

  return response.text || "Sorry, I couldn't generate a response.";
}

export async function getMenuRecommendation(
  preference: string,
  menuData: any
): Promise<string> {
  if (!apiKey) {
    throw new Error(
      "Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in .env.local"
    );
  }

  const prompt = `
You are a menu recommendation expert for Frame Grill restaurant.

Menu:
${JSON.stringify(menuData)}

Customer preference:
${preference}

Recommend 2-3 menu items and briefly explain why.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text || "No recommendation available.";
}