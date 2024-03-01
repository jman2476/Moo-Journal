// TODO: import models
const { sign, verify } = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
import generatePrompt from '../helpers/generatePrompt'
console.log('generate prompt:', generatePrompt)
// import Prompt = 

const resolvers = {
    Query: {
        hello: () => 'Hello, world!',
      },
  Mutations:{
    async generatePrompt(){

    }
  }
}

module.exports = resolvers