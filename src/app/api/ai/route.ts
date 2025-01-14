import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { NextResponse } from "next/server";

interface RequestData {
  prompt: string;
}

interface ResponseData {
  response?: string;
  success: boolean;
  error?: string;
}

export const runtime = 'edge';

export const POST = async (request: Request): Promise<NextResponse> => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  try {
    const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const data: RequestData = await request.json();
    const prompt: string = data.prompt;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const tagline: string = response.text();

    const responseData: ResponseData = { response: tagline, success: true };
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error generating content: ", error);
    const responseData: ResponseData = { error: "Failed to generate content.", success: false };
    return NextResponse.json(responseData);
  }
};