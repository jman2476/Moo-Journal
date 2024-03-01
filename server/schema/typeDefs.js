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

    type Prompt {
        prompt:String
    }

    type Success {
        message: String
    }

    type mooData {
        date: Int
        moodRanking: Int
        user: User
    }

    type Query {
        authenticate: User
        getUserNotes: [Journal]
        graphMood: [mooData]
    }

    type Mutation {
        registerUser(username: String!, email: String!, password: String!): User
        loginUser(email: String!, password: String!): User
        logoutUser: Success
        generatePrompt(type: String!): Prompt
        newEntry(prompt: String!, text: String!, moodRanking: Int!, user_id: String!): Success
        updateEntry(text: String!, user_id: String!): Success
        deleteEntry: Success
    }

`


module.exports = typeDefs