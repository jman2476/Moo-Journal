const { GraphQLError } = require('graphql')
const { genToken, verToken, proteck } = require('../../config/auth')
const { User } = require('../../models')

module.exports = {
    queries: {
        async authenticate(_, __, { req }) {
            const token = req.cookies.token

            if (!token) return null

            try { 
                const user_id = verToken(token)

                const user = await User.findById(user_id)

                return user
            } catch (err) {
                console.log(err)

                return null
            }
        },

        getUserNotes: proteck(async (_, __, {user_id}) => {
            const user = await User.findById(user_id).populate('journals')

            return user.journals
        }) 
    },

    mutations: {
        async registerUser(_, {username, email, password}, { res }) {
            
            try {
                const user = await User.create({username, email, password})

                const token = genToken(user._id)

                res.cookie('token', token, {httpOnly: true})
                console.log(user)

                return user
            } catch (err) {
                console.log(err)

                if (err.code === 11000) {
                    throw new GraphQLError('A user with these credentials already exists')
                }

                if (err.errors) {
                    let errors = []

                    for (let prop in err.errors) {
                        errors.push(err.errors[prop].message)
                    }

                    throw new GraphQLError(errors)
                }
            }
        },

        async loginUser(_, args, { res }) {
            try {
                const user = await User.findOne({ email: args.email })
                
                // return error if user is not found
                if (!user) {
                    throw new GraphQLError('No users with that email found')
                }
    
                const pass_check = await user.validatePass(args.password)
    
                // return error if password is wrong
                if(!pass_check) {
                    throw new GraphQLError('Incorrect password')
                }
    
                const token = genToken(user._id)
    
                res.cookies('token', token, {httpOnly: true})
    
                return user
            } catch (err) {
                console.log(err)
            }
        },

        logoutUser(_, __, { res }) {
            try {
                res.clearCookies('token')

                return {message: 'Log out successful'}
            } catch (err) {
                console.log(err)
            }
        }
    }
}