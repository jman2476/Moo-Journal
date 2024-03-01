const generatePrompt = require('../../helpers/generatePrompt2')
const { GraphQLError } = require('graphql')

module.exports = {
    // queries: {

    // },

    mutations: {
        async generatePrompt(_, args, { res }) {
            try {

                const prompt = await generatePrompt(args.type)
                return {
                    prompt: prompt
                }
            } catch (err) {
                console.log(err)
                throw new GraphQLError(err)
            }

            // return(prompt)
        },
        async test(_, args, {res}){
            try {

                const prompt = await generatePrompt()
                
                return {
                    message: prompt
                }
            } catch (err) {
                console.log(err)
                throw new GraphQLError(err)
            }
        }
    }
}