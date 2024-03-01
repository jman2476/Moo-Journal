const gql = String.raw
// const Prompt = require('../models/Prompt')

// typeDefs explain the resolver
const typeDefs = gql`
  type Query {
    hello: String
  }

  type Journal {
    text:String
  }

  type Success {
    message: String
  }

  type Prompt {
    prompt:String
  }

  type Mutation {
    generatePrompt(type: String!): Prompt

  }

`;


module.exports = typeDefs