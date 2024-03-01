import dotenv from 'dotenv'
import OpenAI from "openai";
dotenv.config()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function generatePrompt() {
  const completion = await openai.chat.completions.create({
    messages: [
      { "role": "system", "content": "You are a helpful assistant that generates reflective journal prompts." },
      { "role": "user", "content": "I want a light journaling prompt" },
    ],
    model: "gpt-3.5-turbo",
  });

  return(completion.choices[0]);
}
