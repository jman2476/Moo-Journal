const generatePrompt = require('../../helpers/generatePrompt2')
const { GraphQLError } = require('graphql')
const {Prompt} = require('../../models')

module.exports = {
    // queries: {

    // },

    mutations: {
        async generatePrompt(_, args, { res }) {
            try {
                const prompt = await generatePrompt(args.type)

                const savedPrompt = await Prompt.create({
                    text:prompt,
                    cream:args.type
                })
                
                console.log(typeof savedPrompt, savedPrompt)
                return {
                    prompt: prompt
                }
            } catch (err) {
                console.log(err)
                throw new GraphQLError(err)
            }
        }
    }
}