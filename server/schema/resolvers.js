// TODO: import models
const { sign, verify } = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const resolvers = {
    Query: {
        hello: () => 'Hello, world!',
      },
}

module.exports = resolvers