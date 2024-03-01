const generatePrompt = require('../../helpers/generatePrompt2')

module.exports = {
    // queries: {

    // },
    
    mutations: {
        async generatePrompt(_, args, { res }) {

            const prompt = await generatePrompt(args.type)
            return {
                prompt: prompt
            }
            // return(prompt)
        }
    }
}