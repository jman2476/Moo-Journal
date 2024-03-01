const dotenv = require('dotenv')
const OpenAI = require("openai");
dotenv.config()
const openai = new OpenAI({ apiKey: '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' });


async function generatePrompt(type) {
  console.log(type)
  const completion = await openai.chat.completions.create({
    messages: [
      { "role": "system", "content": "You are a helpful assistant that generates reflective journal prompts." },
      { "role": "user", "content": `I want a ${type} journaling prompt` },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content)

  return(completion.choices[0].message.content);
  // return type
}

module.exports = generatePrompt