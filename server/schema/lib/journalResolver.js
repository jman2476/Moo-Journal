const { GraphQLError } = require('graphql')
const { Journal, User, Prompt } = require('../../models')
const dayjs = require('dayjs')
const { proteck } = require('../../config/auth')

module.exports = {
    queries: {
        graphMood: proteck(async (_, args, { req, res }) => {

        })
    },

    mutations: {
        newEntry: proteck(async (_, args, { req, res, user_id }) => {
            try {
                const user = await User.findById(user_id) 
                console.log(user)
                const prompt = await Prompt.findById(args.prompt_id)
                console.log(prompt)

                const entry = await Journal.create({
                    prompt: prompt._id,
                    cream: prompt.cream,
                    text: args.text,
                    moodRanking: 5,
                    user: user_id
                })

                // add the journal entry to the user's journal

                // increment the prompt's uses by 1


                return entry
            } catch (err) {
                console.log(err)
                let errors = []

                for (let prop in err.errors) {
                    errors.push(err.errors[prop].message)
                }

                throw new GraphQLError(errors)
            }
        }),

        // allow user to update a journal entry if it has been less than 24 hrs since the entry was created
        updateEntry: proteck(async (_, args, { req, res }) => {
            try {

            } catch (err) {
                console.log(err)
            }
        }),

        deleteEntry: proteck(async (_, args, { req, res }) => {
            try {

            } catch (err) {
                console.log(err)
            }
        }),

    }
}