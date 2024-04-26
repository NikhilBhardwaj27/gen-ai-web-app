import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

export const runTextPrompt = async (keyword:string):Promise<string> =>{
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = keyword
  
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      return text
    }catch(error:any){
      return error.message;
    }
}

interface Part {
  inlineData: { data: string; mimeType: string };
}

// Converts a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file:any): Promise<Part> {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise as string, mimeType: file.type },
  };
}

export async function runTextAndImagePrompt(keyword:string,files:[]) {
  // For text-and-images input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = keyword;
  const imageParts = await Promise.all(
    files.map(fileToGenerativePart)
  );

  try {
    const result = await model.generateContent([prompt, ...imageParts]);
    const response =  result.response;
    const text = response.text();
  
    return text
  }catch(error:any){
    return error.message
  }
  
}

import GoogleProvider from "next-auth/providers/google";



export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
};
    

