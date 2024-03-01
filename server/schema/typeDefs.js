const gql = String.raw
// const Prompt = require('../models/Prompt')

// typeDefs explain the resolver
const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
    }

    type Journal {
        _id: ID
        prompt: String
        moodRanking: Int
        user: User
        createdAt: String
        updatedAt: String
    }

    type Success {
        message: String
    }

    type Query {
        authenticate: User
        getUserNotes: [Journal]
    }

    type Mutation {
        registerUser(username: String!, email: String!, password: String!): User
        loginUser(email: String!, password: String!): User
        logoutUser: Success
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