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
        moodRanking: Number
        user: User
        createdAt: String
        updatedAt: String
    }

    type Success {
        message: String
    }

    type Query {
        hello: String
    }

    type Mutation {
        
    }
`;


module.exports = typeDefs