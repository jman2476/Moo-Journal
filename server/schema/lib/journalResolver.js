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
                const prompt = await Prompt.findById(args.prompt_id)

                const entry = await Journal.create({
                    prompt: prompt._id,
                    cream: prompt.cream,
                    text: args.text,
                    moodRanking: 5,
                    user: user_id
                })

                // add the journal entry to the user's journal
                user.journal.push(entry._id)
                user.save()

                // increment the prompt's uses by 1
                prompt.usageCount += 1
                prompt.save() 


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
                await Journal.findByIdAndUpdate(args.journal_id, {
                    text: args.text
                })

                return { message: 'Note updated successfully' }
            } catch (err) {
                console.log(err)
                let errors = []

                for (let prop in err.errors) {
                    errors.push(err.errors[prop].message)
                }

                throw new GraphQLError(errors)
            }
        }),

        deleteEntry: proteck(async (_, args, { req, res, user_id }) => {
            try {
                await Journal.findByIdAndDelete(args.journal_id)
                await User.findByIdAndUpdate(user_id, {
                    $pull: {
                        journal: args.journal_id
                    }
                })
            } catch (err) {
                console.log(err)
                let errors = []

                for (let prop in err.errors) {
                    errors.push(err.errors[prop].message)
                }

                throw new GraphQLError(errors)
            }
        }),

    }
}