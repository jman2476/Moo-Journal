const { model, Schema } = require('mongoose')
const { hash, compare } = requrie('bcrypt')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'You must enter a username'],
            minLength: [5, 'Your username must be at least 5 characters in length']
        },
        email: {
            type: String,
            required: [true, 'You must enter a password'],
            unique: true,
            validate: {
                validator(val) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig.test(val);
                },
                message: 'Your email address is not formatted correctly'
            }
        },
        password: {
            type: String,
            required: [true, 'You must enter a password'],
            minLength: [6, 'Your password must be at least 6 characters in length']
        },
        entries: [{
            type: Schema.Types.ObjectId,
            ref: 'Entry'
        }]
    }
)

