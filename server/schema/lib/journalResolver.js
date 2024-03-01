const { GraphQLError } = require('graphql')
const { Journal } = ('../../models')
const dayjs = require('dayjs')
const { proteck } = require('../../config/auth')

module.exports = {
    queries: {
        graphMood: proteck(async (_, args, {req, res}) => {
            
        })
    },

    mutations: {
        newEntry: proteck(async (_, args, {req, res}) => {
            try {

            } catch (err) {
                console.log(err)
            }
        }),

        // allow user to update a journal entry if it has been less than 24 hrs since the entry was created
        updateEntry: proteck(async (_, args, {req, res}) => {
            try {

            } catch (err) {
                console.log(err)
            }
        }),

        deleteEntry: proteck(async (_, args, {req, res}) => {
            try {

            } catch (err) {
                console.log(err)
            }
        }),

    }
}