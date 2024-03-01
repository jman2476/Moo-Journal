const { model, Schema } = require('mongoose');
const { hash, compare } = require('bcrypt')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Please enter a valid username'],
            minLength: [5, 'Your username must be at least 5 characters long.']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Please enter a valid email address'],
            validate: {
                validator(val) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ig.test(val);
                },
                message: 'Your email address is invalid.'
            }
        },
        password: {
            type: String,
            required: true,
            minLength: [5, 'Your password must be at least 5 characters long.']
        },
        journal: [{
            type: Schema.Types.ObjectId,
            ref: 'Journal'
        }]

    }
)

userSchema.methods,validatePass = async function (formPass) {
    const validPass = await compare(formPass, this.password);

    return validPass
}

userSchema.pre('save', async function (next) {
    if(this.isNew){
        this.password= await hash(this.password, 10);
    }
    next();
});

const User = model('User', userSchema)

module.exports = User;