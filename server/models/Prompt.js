const { model, Schema } = require('mongoose')

const promptSchema = new Schema({
    text: {
        type: String,
        required: true,
        minLength: [5, 'Your journal entry must be at least 5 characters long']
    },
    // category: {
    //     type: String,
    //     enum: ['Light', 'Whole', 'Half-Half'],
    //     default: 'Whole'
    //   }
    journal: {
        type: Schema.Types.ObjectId,
        ref: 'Journal'
    }
})

const Prompt = model('Prompt', promptSchema)

module.exports= Prompt