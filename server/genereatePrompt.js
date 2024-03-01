const { OpenAI } = require('openai')

const apiKey = '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'

const openai = new OpenAI({apiKey:'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' })

async function generateJournalPrompt(){
    try {
        const response = await openai.createCompletion({
            model:'text-davinci-003',
            prompt:'generate a creative journal entry for reflection',
            temperature:0.7,
            max_tokens:100
        })

        console.log(response)
        console.log(response.data.choices[0].text.trim())
        
    } catch (err) {
        console.log(err)
    }
}

generateJournalPrompt()