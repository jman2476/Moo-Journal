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
    usageCount:{
        type:Number,
        default:0
    }
}, {
    timestamps: true
})

const Prompt = model('Prompt', promptSchema)

module.exports = Prompt