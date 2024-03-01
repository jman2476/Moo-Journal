const gql = String.raw

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
`;


module.exports = typeDefs