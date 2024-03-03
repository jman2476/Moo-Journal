const { model, Schema } = require('mongoose')

const journalSchema = new Schema({
    prompt: {
        type: Schema.Types.ObjectId,
        ref: 'Prompt'
    },
    cream: {
        type: String,
        enum: ['Light', 'Heavy'],
        default: 'Heavy',
        required: true,
    },
    text: {
        type: String,
        required: true,
        minLength: [5, 'Your journal entry must be at least 5 characters long']
    },
    moodRanking: {
        type: Number,
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