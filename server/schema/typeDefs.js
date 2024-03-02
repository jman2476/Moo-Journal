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
        prompt: Prompt
        moodRanking: Int
        cream: String
        user: User
        createdAt: String
        updatedAt: String
    }

    type Prompt {
        _id: ID
        text:String
        cream:String
        usageCount:Int
        createdAt: String
        updatedAt: String
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
        test: Success
        newEntry(prompt_id: String!, text: String!, moodRanking: Int!): Journal
        updateEntry(text: String!): Success
        deleteEntry: Success
    }
`;


module.exports = typeDefs