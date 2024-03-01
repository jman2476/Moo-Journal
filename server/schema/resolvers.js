// TODO: import resolver
const user_resolver = require('./lib/userResolver')
const prompt_resolver = require('./lib/promptResolver')
const journal_resolver = require('./lib/journalResolver')


const resolvers = {
    Query: {
        ...user_resolver.queries,
        ...prompt_resolver.queries,
        ...journal_resolver.queries
    },

    Mutation: {
        ...user_resolver.mutations,
        ...prompt_resolver.mutations,
        ...journal_resolver.mutations,
    }
}

module.exports = resolvers