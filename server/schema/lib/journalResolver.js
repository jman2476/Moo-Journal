const { GraphQLError } = require('graphql')
const { Journal, User, Prompt } = require('../../models')
const dayjs = require('dayjs')
const { proteck, verToken } = require('../../config/auth')

module.exports = {
    queries: {
        graphMood: proteck(async (_, args, { req, res, user_id }) => {
            try {
                // get array of journal entries for user
                const userEntries = await User.findById(user_id).populate('journal')
                const userName = userEntries.username
                console.log(userEntries)
                // make an array of the dates of each entry
                let dates = []
                // make an array of the moodRanking
                let moodRankings = []
                // output data
                let data = []
                // return in the form {[dates], [moodRanking]}
                for (let entry in userEntries.journal) {
                    dates.push(dayjs(userEntries.journal[entry].createdAt).format())
                    moodRankings.push(userEntries.journal[entry].moodRanking)
                }

                // console.log(dates)
                // console.log(moodRankings)

                return {
                    date: dates,
                    moodRanking: moodRankings,
                    user: userName
                }
            } catch (err) {
                console.log(err)
                let errors = []

                for (let prop in err.errors) {
                    errors.push(err.errors[prop].message)
                }

                throw new GraphQLError(errors)
            }
        }),
        getEntryById: proteck(async (_, args, {req, res, user_id}) => {
            try {
                const entry = await Journal.findById(args.journal_id)

                return entry
            } catch (err) {
                console.log(err)
                let errors = []

                for (let prop in err.errors) {
                    errors.push(err.errors[prop].message)
                }

                throw new GraphQLError(errors)
            }
        })
    },

    mutations: {
        newEntry: proteck(async (_, args, { user_id }) => {
            try {
                const user = await User.findById(user_id) 
                const prompt = await Prompt.findById(args.prompt_id)

                if (!prompt) {
                    const entry = await Journal.create({
                        prompt:args.promptId,
                        text: args.text,
                        moodRanking: args.moodRanking,
                        editorState:args.editorState,
                        user: user_id
                    })
    
                    // add the journal entry to the user's journal
                    user.journal.push(entry._id)
                    user.save()
    
                    return entry
                }

                const entry = await Journal.create({
                    prompt: prompt._id,
                    text: args.text,
                    moodRanking: args.moodRanking,
                    user: user_id,
                    editorState:args.editorState,

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
        updateEntry: proteck(async (_, args, {}) => {
            
            try {
                const currentTime = dayjs()
                const entry = await Journal.findById(args.journal_id)
                const entryTime = dayjs(entry.createdAt)
                
                // check if it has been 24hrs or more, and if true, return an error
                if (currentTime.diff(entryTime) > 86400000) {
                    throw new GraphQLError('This entry is too old to edit')
                }

                // update the entry with the new text
                entry.text = args.text
                entry.save()


                return { message: 'Journal entry updated successfully' }
            } catch (err) {
                console.log(err)
                let errors = []

                for (let prop in err.errors) {
                    errors.push(err.errors[prop].message)
                }

                throw new GraphQLError(errors)
            }
        }),

        deleteEntry: proteck(async (_, args, { user_id }) => {
            try {
                await Journal.findByIdAndDelete(args.journal_id) // ARGS
                await User.findByIdAndUpdate(user_id, {
                    $pull: {
                        journal: args.journal_id
                    }
                })

                return { message: 'Journal Entry deleted successfully' }

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