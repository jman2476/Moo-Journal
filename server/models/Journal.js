const { model, Schema } = require('mongoose')

const journalSchema = new Schema({
    prompt: {
        type: Schema.Types.ObjectId,
        ref: 'Prompt'
    },
    text: {
        type: String,
        required: true,
        minLength: [5, 'Your journal entry must be at least 5 characters long']
    },
    moodRanking: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Journal = model('Journal', journalSchema)
module.exports = Journal