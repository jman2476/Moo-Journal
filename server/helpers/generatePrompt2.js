const dotenv = require('dotenv');
const OpenAI = require("openai");

// Load environment variables
dotenv.config();


// Initialize OpenAI client
const openai = new OpenAI({ apiKey: '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' });

/**
 * Generates a journaling prompt based on the type of reflection and the user's mood.
 * @param {string} type - The type of journaling prompt ('Heavy' or 'Light').
 * @param {number} moodValue - The user's current mood, on a scale from 1 (horrible) to 10 (euphoric).
 * @returns {Promise<string>} The generated journaling prompt.
 */
async function generatePrompt(type, moodValue) {
  // Map moodValue to mood descriptions
  const moodDescriptions = [
    "feeling really down", "having a rough day", "feeling a bit low",
    "in a somber mood", "feeling okay", "in a decent mood",
    "feeling pretty good", "in a cheerful mood", "feeling great",
    "in an excellent mood"
  ];

  // Define the complexity and focus based on 'type'
  const complexity = type === 'Heavy' ? "explore deep emotional themes" : "reflect in a light-hearted manner";
  const focus = type === 'Heavy' ? "profound, introspective" : "casual, breezy";

  // Customize system message based on type and moodValue
  const systemMessage = `You are a helpful assistant trained to help users ${complexity} based on their mood. Today, the user is ${moodDescriptions[moodValue - 1]}. Generate a ${focus} journaling prompt that matches their mood.`;

  // Customize user message to reflect mood and desired depth
  const userMessage = `Given that I'm ${moodDescriptions[moodValue - 1]}, give me a ${type.toLowerCase()} journaling prompt that suits my mood.`;

  // Generate the prompt using OpenAI's chat completions
  const completion = await openai.chat.completions.create({
    messages: [
      { "role": "system", "content": systemMessage },
      { "role": "user", "content": userMessage },
    ],
    model: "gpt-3.5-turbo",
    max_tokens:80, 
  });

  // Log and return the generated prompt
  console.log(completion.choices[0].message.content);
  return(completion.choices[0].message.content);
}

module.exports = generatePrompt;
