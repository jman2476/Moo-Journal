const { model, Schema } = require('mongoose')

const promptSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    cream: {
        type: String,
        enum: ['Light', 'Heavy'],
        default: 'Heavy'
    },
    journal: {
        type: Schema.Types.ObjectId,
        ref: 'Journal'
    },
    counter: {
        type: Number,
        required: true
    }
})

const Prompt = model('Prompt', promptSchema)

module.exports = Prompt