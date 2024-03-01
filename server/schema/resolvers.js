// TODO: import resolers
const user_resolver = require('./lib/userResolver')

const resolvers = {
    Query: {
        ...user_resolver.queries
    },
    Mutation: {
        ...user_resolver.mutations
    }
}

module.exports = resolvers