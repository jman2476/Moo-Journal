// TODO: import models
const { sign, verify } = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const generatePrompt = require('../helpers/generatePrompt2')

const resolvers = {
  Mutation: {
    async generatePrompt(_, args, { res }) {

      const prompt = await generatePrompt(args.type);
      return {
        prompt: prompt
      }
      // return(prompt)
    }
  }
}

module.exports = resolvers