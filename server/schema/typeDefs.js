const gql = String.raw

// typeDefs explain the resolver
const typeDefs = gql`
  type Query {
    hello: String
  }
`;


module.exports = typeDefs