import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  try{
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const data = await request.json()
    const prompt = data.prompt

    const result = await model.generateContent(prompt);
    const response = result.response
    const tagline = response.text();

    return NextResponse.json({ response: tagline })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate content." })
  }
}