// TODO: import models
const { sign, verify } = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
// const generatePrompt = require('../helpers/generatePrompt2')

// async function getPrompt(){
//   const msg = await generatePrompt()

//   console.log(msg)
// }

// getPrompt()
const resolvers = {
    Query: {
        hello: () => 'Hello, world!',
      },
    Mutation:{
      async generatePrompt(_, args, { res }) {
        // const prompt = await generatePrompt();
        
        console.log(res)
        return 'this is supposed to be a light or heavy prompt'
        // return(prompt)
      }
    }
}

module.exports = resolvers