import { GoogleGenAI } from "@google/genai"
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const geminiResponse = async (summaryType, content, retries = 3, delay = 1000) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `You are a summarization assistant. Please summarize the following content using 
            the summarization type: "${summaryType}".Content to summarize:"""${content}"""`,
        });
        return response.text
    } catch (error) {
        console.log("Error generating gemini ai content", error);
    }
}

export default geminiResponse;